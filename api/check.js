'use server';
import { Buffer } from 'node:buffer';

export async function GET(request) {
  try{
    // console.log("\n\n\nVERCEL SERVERLESS FUNCTION TEST");
    const url = new URL(request.url);
    let target = url.searchParams.get('url');
    // console.log('URL TO CHECK: ' + url.searchParams.get('url'));

    if(target){

      // Place to save results
      const info = {
        title: null,
        fav: null,
        fav_icon: null,
        rel: null,
        rel_icon: null,
        og: null,
        og_img: null,
        tw: null,
        tw_img: null
      };

      if(!target.startsWith('http') && !target.startsWith('https')) {
        target = 'https://' + target;
      }
      const turl = new URL(target);

      const res = await fetch(turl, {
        redirect: "follow",
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0'
        }
      });
      const body = await res.text();

      const titleMatch = body.match(/<title>(?<title>.*?)<\/title>/);
      info.title = titleMatch?.groups.title ?? turl.hostname;

      const ogimgMatch = body.match(/<meta property="og:image" content="(?<ogimg>.*?)".*?>/);
      info.og = ogimgMatch?.groups.ogimg ?? null;
      if(info.og){
        if(info.og.startsWith('/')){
          info.og = turl.origin + info.og;
        }
        // console.log('fetching og:image');
        info.og_img = await fetchImageAsBase64(info.og);
        // console.log('fetched og:image');
      }

      const twimgMatch = body.match(/<meta property="twitter:image" content="(?<twimg>.*?)".*?>/);
      info.tw = twimgMatch?.groups.twimg ?? null;
      if(info.tw){
        if(info.tw.startsWith('/')){
          info.tw = turl.origin + info.tw;
        }
        // console.log('fetching twitter:image');
        info.tw_img = await fetchImageAsBase64(info.tw);
        // console.log('fetched twitter:image');
      }

      // sometimes more than 1, 
      const allRel = Array.from(body.matchAll(/<link.*?rel=".*?icon".*?href="(?<relicon>.*?)".*?>/g));
      info.rel = allRel.length > 0 ? allRel.pop().groups.relicon : null;
      if(info.rel){
        if(info.rel.startsWith('/')){
          info.rel = turl.origin + info.rel;
        }
        // console.log('fetching rel=icon');
        info.rel_icon = await fetchImageAsBase64(info.rel);
        // console.log('fetched rel=icon');
      }

      // console.log('fetching favicon');
      info.fav_icon = await fetchImageAsBase64(turl.origin + '/favicon.ico');
      // console.log('fetched favicon');

      const result = new Response(JSON.stringify(info));
      result.headers['content-type'] = 'application/json; charset=UTF-8';
      // console.log("\n\n\n");
      return result;
    }
  }catch (err) {
    return Response.json({error: 'something went wrong:\n'+err})
  }
  return Response.json({error: 'provide url to check for title and favicon/rel icon/ogp image/twitter image'});
}

// image fetcher
async function fetchImageAsBase64(url){
  const res = await fetch(url, {
    redirect: "follow",
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0'
    }
  });
  // console.log(`status (${url}): ` + res.status);
  if(res.status < 400){
    const blob = await res.blob();
    // console.log(`blob type (${url}): ` + blob.type);
    if(blob.type.startsWith('image/')) {
      return `data:${blob.type};base64,` + new Buffer(await blob.arrayBuffer(), 'base64').toString('base64');
    }else{
      return null;
    }
  }
  return null;
}