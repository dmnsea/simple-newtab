import { NewTabWebsite, WebsiteInfo } from "@/types/NewTabEntries";
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { removeEntry, updateWebsite } from "@/redux/tabSlice.ts";
import { fixImageSize } from "@/utils/images";
import { DeleteForever, Edit, MoreVert, OpenInNew } from "@mui/icons-material";
import EditEntryDialog from "./EditEntryDialog";
import { fetchData } from "@/utils/dataFetcher";

export default function WebsiteCard(props: NewTabWebsite) {
  const url = props.url.includes("://") ? props.url : "http://" + props.url;
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [editDialogShown, setEditDialogShown] = useState(false);
  const dispatch = useDispatch();
  const imageRef = useRef<HTMLImageElement>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const closeDialog = () => {
    setEditDialogShown(false);
  };

  useEffect(() => {
    if (!props.img_cached) {
      const url = new URL(location.origin + "/api/check");
      url.searchParams.set("url", props.url);
      // axios.get(url.toString()).then((res) => {
        // const info = res.data as WebsiteInfo;
      fetchData(props.url).then((res) => {
        const info = res as WebsiteInfo;
        if (!props.img_cached) {
          dispatch(
            updateWebsite({
              id: props.id,
              title: props.title_unset ? info.title : props.title,
              url: props.url,
              parent: props.parent,
              image:
                info.og_img ?? info.tw_img ?? info.rel_icon ?? info.fav_icon,
            })
          );
        }
      });
      setLoaded(true);
      setFailed(false);
    } else {
      setLoaded(true);
    }
  }, []);

  return (
    <>
      <Paper
        sx={{
          height: 128,
          padding: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          justifyContent: "space-between",
          alignItems: "stretch",
          backgroundColor: "action.selectedHover",
          "&:hover": {
            backgroundColor: "action.selected",
          },
          "&:active": {
            scale: 0.98,
          },
          transition: ".3s all",
          userSelect: "none",
        }}
        elevation={5}
        onClick={(e) => {
          const editButton = (e.target as HTMLElement).closest(".btnEditEntry");
          if (!editButton && !open && !editDialogShown) {
            window.open(url, e.ctrlKey ? "_blank" : "_self")?.focus();
          }
        }}
      >
        <div
          style={{
            width: "100%",
            height: "72px",
            padding: "4px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!loaded && <CircularProgress size={64} color={"primary"} />}
          {loaded && !failed && props.img != "" && (
            <img
              src={props.img}
              alt={props.title}
              ref={imageRef}
              onLoad={() => {
                fixImageSize(imageRef.current);
              }}
            />
          )}
          {loaded && (failed || props.img == "") && (
            <Avatar sx={{ width: 64, height: 64 }}>
              {props.title.charAt(0)}
            </Avatar>
          )}
        </div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            justifyContent: "space-between",
          }}
        >
          <Typography
            noWrap
            variant={"h6"}
            sx={{ width: "100%", marginLeft: 1 }}
          >
            {props.title}
          </Typography>
          <Tooltip title="Options" className="btnEditEntry">
            <IconButton
              size={"small"}
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClickMenu}
            >
              <MoreVert />
            </IconButton>
          </Tooltip>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
          >
            <MenuItem
              onClick={() => {
                handleCloseMenu();
                window.open(url, "_blank")?.focus();
              }}
            >
              <ListItemIcon>
                <OpenInNew />
              </ListItemIcon>
              <ListItemText>Open in new tab</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseMenu();
                setEditDialogShown(true);
              }}
            >
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseMenu();
                dispatch(removeEntry({id: props.id}));
              }}
            >
              <ListItemIcon>
                <DeleteForever />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Paper>
      <EditEntryDialog {...props} shown={editDialogShown} close={closeDialog} />
    </>
  );
}
