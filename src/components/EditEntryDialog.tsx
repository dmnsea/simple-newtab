import { NewTabEntry, WebsiteInfo } from "@/types/NewTabEntries";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Dialog,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateFolder, updateWebsite } from "@/redux/tabSlice";
import { Refresh, Restore } from "@mui/icons-material";
import { fetchData } from "@/utils/dataFetcher";

function isDisabled(type: "folder" | "website", title: string, url: string) {
  if (type == "folder") {
    return title.trim().length == 0;
  } else {
    return url.trim().length == 0 || title.trim().length == 0;
  }
}

export default function EditEntryDialog(
  props: NewTabEntry & { shown: boolean; close: () => void }
) {
  const [parent, setParent] = useState(props.parent);
  const [title, setTitle] = useState(props.title);
  const [url, setUrl] = useState(props.type == "website" ? props.url : "");
  const [image, setImage] = useState(
    props.type == "website" ? props.img : null
  );
  const [loading, setLoading] = useState(false);

  const foldersList = useSelector((state: RootState) => state.tabEntries)
    .filter((e) => e.type == "folder").filter(e => e.id != props.id)
    .map((e) => {
      const { id, title } = e;
      return { id, title };
    });
  foldersList.unshift({ id: 0, title: "Root" });

  const dispatch = useDispatch();

  return (
    <Dialog open={props.shown} onClose={props.close}>
      <Card>
        <CardContent>
          <Stack
            direction={"column"}
            spacing={2}
            sx={{justifyContent: 'center', alignItems: 'stretch'}}
          >
            <Typography variant="h5" sx={{textAlign: 'center'}}>
              Editing {props.type == "website" ? "website" : "folder"}
            </Typography>
            {props.type == "website" && (
              <>
                {loading && <CircularProgress sx={{ alignSelf: "center" }} />}
                {!loading && image && (
                  <img
                    src={image}
                    alt={props.title}
                    style={{ maxWidth: 64, maxHeight: 64, alignSelf: "center" }}
                  />
                )}
                {!loading && !image && (
                  <Avatar sx={{ alignSelf: "center" }}>
                    {props.title.charAt(0)}
                  </Avatar>
                )}
              </>
            )}
            <Stack direction={"row"} spacing={1} sx={{alignItems: 'center'}}>
              <TextField
                variant="outlined"
                label="Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Tooltip title="Restore name">
                <IconButton size="large" onClick={() => setTitle(props.title)}>
                  <Restore />
                </IconButton>
              </Tooltip>
            </Stack>
            <InputLabel id="folder-picker">Parent folder</InputLabel>
            <Stack direction={"row"} spacing={1} sx={{alignItems: 'center'}}>
              <Select
                fullWidth
                labelId="folder-picker"
                value={parent}
                onChange={(e) => setParent(Number(e.target.value))}
              >
                {foldersList.map((e) => (
                  <MenuItem key={"folder_" + e.id} value={e.id}>
                    {e.title}
                  </MenuItem>
                ))}
              </Select>
              <Tooltip title="Restore parent folder">
                <IconButton
                  size="large"
                  onClick={() => setParent(props.parent)}
                >
                  <Restore />
                </IconButton>
              </Tooltip>
            </Stack>
            {props.type == "website" && (
              <>
                <Stack direction={"row"} spacing={1} sx={{alignItems: 'center'}}>
                  <TextField
                    variant="outlined"
                    label="URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <Tooltip title="Restore URL">
                    <IconButton size="large" onClick={() => setUrl(props.url)}>
                      <Restore />
                    </IconButton>
                  </Tooltip>
                </Stack>
                <Button
                  endIcon={<Refresh />}
                  onClick={async () => {
                    setLoading(true);
                    const url = new URL(location.origin + "/api/check");
                    url.searchParams.set("url", props.url);
                    // TODO: FIX
                    const res = await fetchData(props.url);
                    const info = res as WebsiteInfo;
                    setImage(
                      info.og_img ??
                        info.tw_img ??
                        info.rel_icon ??
                        info.fav_icon ??
                        null
                    );
                    setLoading(false);
                  }}
                >
                  Refresh image
                </Button>
              </>
            )}
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", gap: 1 }}>
          <Button variant="outlined" color="error" onClick={props.close}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (props.type == "folder") {
                dispatch(
                  updateFolder({
                    id: props.id,
                    parent,
                    title
                  })
                );
                props.close();
              } else {
                dispatch(
                  updateWebsite({
                    id: props.id,
                    parent,
                    title,
                    url,
                  })
                );
                props.close();
              }
            }}
            disabled={isDisabled(props.type, title, url)}
            color={"success"}
            variant={"contained"}
          >
            Update
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  );
}
