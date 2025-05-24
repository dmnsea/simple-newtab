import { NewTabWebsite } from "@/types/NewTabEntries";
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { Language } from "@mui/icons-material";
import { SyntheticEvent, useState } from "react";

export default function WebsiteCard(props: NewTabWebsite) {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [failed, setFailed] = useState(false);
  const handleLoad = (e: SyntheticEvent) => {
    console.log(e);
    console.log(e.target);
    console.log(e.type);
    setLoaded(e.type === "load" ? true : false);
    setFailed(e.type === "error" ? true : false);
  };

  return (
    <a href={props.url} target={'_blank'} style={{textDecoration: 'none'}}>
      <Card
        sx={{
          width: "100%",
          height: "140px",
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 1,
          }}
        >
          {(!loaded || failed) && <Language sx={{width: 32, height: 32}}/>}
          {!failed && (
            <img
              src={new URL(props.url).origin + "/favicon.ico"}
              alt={props.title + " favicon"}
              onLoad={handleLoad}
              onError={handleLoad}
              width={32}
              height={32}
            />
          )}
        </CardMedia>
        <CardContent>
          <Typography>{props.title}</Typography>
          <Divider />
          <Typography variant={'subtitle2'} sx={{width: '100%', height: '1.5em', overflow: 'hidden', textOverflow: 'ellipsis'}}>{props.url}</Typography>
        </CardContent>
      </Card>
    </a>
  );
}
