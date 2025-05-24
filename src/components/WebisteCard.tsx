import axios from 'axios';
import {NewTabWebsite, WebsiteImages} from "@/types/NewTabEntries";
import {
  Avatar,
  Card,
  CardContent,
  CardMedia, CircularProgress,
  Divider, Paper,
  Typography,
} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {updateWebsite} from "@/redux/tabSlice.ts";

export default function WebsiteCard(props: NewTabWebsite) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!props.img_cached){
      const url = new URL(location.origin+'/api/check');
      url.searchParams.set('url', props.url);
      axios.get(url.toString()).then(res => {
        const images = res.data as WebsiteImages;
        dispatch(
          updateWebsite({
            id: props.id,
            title: props.title,
            url: props.url,
            parent: props.parent,
            image: images.og_img ?? images.tw_img ?? images.rel_icon ?? images.fav_icon,
          })
        )
      });
      setLoaded(true);
      setFailed(false);
    }else{
      setLoaded(true);
    }
  });

  return (
    <a href={props.url} target={'_blank'} style={{textDecoration: 'none'}}>
      <Card
        sx={{
          width: "100%",
          height: "200px",
          textAlign: "center",
          backgroundColor: "action.selectedHover",
          "&:hover": {
            backgroundColor: "action.selected",
          },
          "&:active": {
            scale: 0.98,
          },
          transition: ".3s all",
        }}
        elevation={5}
      >
        <CardMedia
          sx={{
            height: "96px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 1,
            flexGrow: 1
          }}
        >
          {!loaded && <CircularProgress size={64} color={'primary'}/>}
          {loaded && !failed && props.img != '' && <img src={props.img} alt={props.title} style={{height: '100%'}}/>}
          {loaded && (failed || props.img == '') && <Avatar sx={{height: '100%'}}>{props.title.charAt(0)}</Avatar>}
        </CardMedia>
        <CardContent sx={{
          height: 96,
          boxSizing: 'border-box',
          display: "flex",
          flexDirection: 'column',
          justifyContent: "center",
          alignItems: "center",
          padding: 1,
        }}>
          <Typography>{props.title}</Typography>
          <Divider />
          <Typography variant={'subtitle2'} sx={{width: '100%', height: '1.5em', overflow: 'hidden', textOverflow: 'ellipsis'}}>{props.url}</Typography>
        </CardContent>
      </Card>
    </a>
  );
}
