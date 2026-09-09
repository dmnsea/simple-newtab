import { switchTo } from "@/redux/currentFolderSlice";
import { NewTabFolder } from "@/types/NewTabEntries";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DeleteForever,
  Edit,
  Folder,
  Language,
  MoreVert,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState, MouseEvent } from "react";
import { removeEntry } from "@/redux/tabSlice";
import EditEntryDialog from "./EditEntryDialog";

export default function FolderCard(props: NewTabFolder) {
  const childrenCount = useSelector(
    (state: RootState) => state.tabEntries
  ).filter((e) => e.parent == props.id);
  const fullDrop = useSelector((state: RootState) => state.prefs.dropFolderContent);
  const dispatch = useDispatch();

  const [editDialogShown, setEditDialogShown] = useState(false);
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

  return (
    <div
      onClick={(e) => {
        const editButton = (e.target as HTMLElement).closest(".btnEditEntry");
        if (!editButton && !open && !editDialogShown) {
          dispatch(switchTo({ id: props.id, title: props.title! }));
        }
      }}
    >
      <Paper
        sx={{
          width: "100%",
          height: 128,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch",
          padding: 1,
          gap: 1,
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
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ height: 72, padding: 2, flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Folder fontSize="medium" />{" "}
          <Typography sx={{fontSize: '1rem'}}>
            {childrenCount.filter((c) => c.type == "folder").length}
          </Typography>
          <Language fontSize="medium" />{" "}
          <Typography sx={{fontSize: '1rem'}}>
            {childrenCount.filter((c) => c.type == "website").length}
          </Typography>
        </Stack>

        <Stack direction={"row"} sx={{justifyContent: 'space-between'}} spacing={2}>
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
                dispatch(removeEntry({id: props.id, fullDrop}));
              }}
            >
              <ListItemIcon>
                <DeleteForever />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </Menu>
        </Stack>
      </Paper>
      <EditEntryDialog {...props} shown={editDialogShown} close={closeDialog} />
    </div>
  );
}
