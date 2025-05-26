import { WebsiteInfo } from "@/types/NewTabEntries";
import axios from "axios";
// TODO: fetch with Vercel Function or directly depending on runtime.
// this seems to be a way to detect that inside chromium extension
// if(window?.chrome?.runtime?.id){}
// TODO: find a way to detect firefox extension
// same seems to work for firefox as well, also exist location.protocol == 'moz-extension:' // 'chrome-extension:' for chrome

interface RawInfo {
  title: string|null;
  fav: string|null;
  fav_icon: string|null;
  rel: string|null;
  rel_icon: string|null;
  og: string|null;
  og_img: string|null;
  tw: string|null;
  tw_img: string|null;
}

// interface ChromeRuntimeId {
//   chrome: {
//     runtime?: {
//       id: string;
//     }
//   }
// }

export async function fetchData(target: string) {
  // const isExtension = (window as unknown as ChromeRuntimeId).chrome.runtime?.id ?? false;
  const isExtension = location.protocol.endsWith('-extension:');
  if (isExtension) {
    // console.log("Browser Extension runtime detected");

    // Place to save results
    const info: RawInfo = {
      title: null,
      fav: null,
      fav_icon: null,
      rel: null,
      rel_icon: null,
      og: null,
      og_img: null,
      tw: null,
      tw_img: null,
    };

    if (!target.startsWith("http") && !target.startsWith("https")) {
      target = "https://" + target;
    }

    const turl = new URL(target);

    const res = await axios.get(target.toString(), {
      maxRedirects: 5,
    });
    const body = res.data;

    const titleMatch = body.match(/<title>(?<title>.*?)<\/title>/);
    info.title = titleMatch?.groups.title ?? turl.hostname;

    const ogimgMatch = body.match(
      /<meta property="og:image" content="(?<ogimg>.*?)".*?>/
    );
    info.og = ogimgMatch?.groups.ogimg ?? null;
    if (info.og) {
      if (info.og.startsWith("/")) {
        info.og = turl.origin + info.og;
      }
      // console.log('fetching og:image');
      info.og_img = await fetchImageAsBase64(info.og);
      // console.log('fetched og:image');
    }

    const twimgMatch = body.match(
      /<meta property="twitter:image" content="(?<twimg>.*?)".*?>/
    );
    info.tw = twimgMatch?.groups.twimg ?? null;
    if (info.tw) {
      if (info.tw.startsWith("/")) {
        info.tw = turl.origin + info.tw;
      }
      // console.log('fetching twitter:image');
      info.tw_img = await fetchImageAsBase64(info.tw);
      // console.log('fetched twitter:image');
    }

    // sometimes more than 1,
    const allRel: RegExpExecArray[] = Array.from(
      body.matchAll(/<link.*?rel=".*?icon".*?href="(?<relicon>.*?)".*?>/g)
    );
    info.rel = allRel.length > 0 ? (allRel?.pop()?.groups?.relicon ?? null) : null;
    if (info.rel) {
      if (info.rel.startsWith("/")) {
        info.rel = turl.origin + info.rel;
      }
      // console.log('fetching rel=icon');
      info.rel_icon = await fetchImageAsBase64(info.rel);
      // console.log('fetched rel=icon');
    }

    // console.log('fetching favicon');
    info.fav_icon = await fetchImageAsBase64(turl.origin + "/favicon.ico");
    // console.log('fetched favicon');
    return info as WebsiteInfo;
  } else {
    // console.log("Seems to be a regular page");
    const url = new URL(location.origin + "/api/check");
    url.searchParams.set("url", target);
    const res = await axios.get(url.toString());
    return res.data as WebsiteInfo;
  }
}


// image fetcher
async function fetchImageAsBase64(url: string){
  const res = await axios.get(url, {
    maxRedirects: 1,
    responseType: 'blob'
  });
  if(res.status == 200){
    const data = res.data as Blob;
    // console.log(`result type (${url}): ${data.type}`);
    if(data.type.startsWith('image/')) {
      const arbuf = await data.arrayBuffer();
      const ui8arr = new Uint8Array(arbuf);
      const chars = [];
      for(const byte of ui8arr){
        chars.push(String.fromCharCode(byte));
      }
      const bin = chars.join("");
      return `data:${data.type};base64,` + btoa(bin);
    }else{
      return null;
    }
  }
  return null;
}