import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  Divider,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFolder, addWebsite } from "@/redux/tabSlice";

export default function AddEntryCard() {
  const [shown, setShown] = useState(false);
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [entryName, setEntryName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const closeDialog = () => {
    setShown(false);
    setEntryName("");
    setWebsiteUrl("");
  };
  const dispatch = useDispatch();

  return (
    <>
      <Button
        variant={"outlined"}
        sx={{
          width: "100%",
          height: "140px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          padding: 2,
        }}
        onClick={() => setShown(true)}
      >
        <Add color={"disabled"} />
        <Typography>Add new</Typography>
      </Button>

      <Dialog open={shown} onClose={closeDialog}>
        <Card>
          <CardContent>
            <Stack
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={1}
            >
              <ToggleButtonGroup
                exclusive
                color={"primary"}
                value={creatingFolder}
                onChange={(e, v) => {
                  setCreatingFolder(v);
                }}
              >
                <ToggleButton value={false}>Website</ToggleButton>
                <ToggleButton value={true}>Folder</ToggleButton>
              </ToggleButtonGroup>
              <Divider />
              <TextField
                variant={"outlined"}
                label={"Name"}
                value={entryName}
                onChange={(e) => setEntryName(e.target.value)}
              />
              {!creatingFolder && (
                <TextField
                  variant={"outlined"}
                  label={"URL"}
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                />
              )}
            </Stack>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end", gap: 1 }}>
            <Button
              onClick={() => {
                closeDialog();
              }}
              color={"error"}
              variant={"outlined"}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (!creatingFolder) {
                  dispatch(
                    addWebsite({
                      id: 0,
                      parent: 0,
                      title: entryName,
                      url: websiteUrl,
                    })
                  );
                  closeDialog();
                }else{
                  dispatch(
                    addFolder({
                      id: 0,
                      parent: 0,
                      title: entryName
                    })
                  );
                  closeDialog();
                }
              }}
              color={"success"}
              variant={"contained"}
            >
              Create
            </Button>
          </CardActions>
        </Card>
      </Dialog>
    </>
  );
}
