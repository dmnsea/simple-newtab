import {
  Backdrop,
  Card,
  CardContent,
  Chip,
  Divider,
  MenuItem,
  Select,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router";
import DataDeletionAccordion from "@/components/settings/DataDeletionAccordion";
import { setDarkTheme, setDropFolderContent } from "@/redux/preferenceSlice";
import { useEffect, useState } from "react";
import BackupSection from "@/components/settings/BackupSection";

export default function SettingsPage() {
  const darkThemeEnabled = useSelector(
    (state: RootState) => state.prefs.darkTheme
  );
  const dropFolderContent = useSelector(
    (state: RootState) => state.prefs.dropFolderContent
  );
  const [theme, setTheme] = useState(darkThemeEnabled ? "dark" : "light");
  const [dropContent, setDropContent] = useState(
    dropFolderContent ? true : false
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDarkTheme(theme == "dark"));
  }, [theme, dispatch]);

  useEffect(() => {
    dispatch(setDropFolderContent(dropContent));
  }, [dropContent, dispatch]);

  return (
    <Backdrop
      open
      onClick={(e) => {
        e.preventDefault();
        const ignoreZones = [
          document.querySelector("#settings-card"),
          document.querySelector("#about-card"),
          document.querySelector("#menu-"),
          document.querySelector("#import-backup-drop")
        ];

        const target = e.target as HTMLElement;
        let current: HTMLElement | null = target;
        while (current) {
          if (ignoreZones.includes(current)) {
            return;
          }
          current = current.parentElement;
        }
        navigate("/");
      }}
    >
      <Stack
        direction={"column"}
        spacing={2}
        sx={{ width: "90%", maxWidth: 400, overflowY: "auto" }}
      >
        <Card id="settings-card">
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h5">Settings</Typography>
              <Divider />
              <Typography variant="h6">Theme</Typography>
              <Select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
              </Select>
              <Divider />
              <Typography variant="h6">Drop folder content</Typography>
              <Typography>
                When <Chip label="enabled" component={"span"} />, if you will
                delete folder, all entries inside will be deleted as well. When{" "}
                <Chip label="disabled" component={"span"} />, all entries inside
                will be moved to parent folder
              </Typography>
              <Stack
                direction={"row"}
                sx={{justifyContent: 'space-between', alignItems: 'center'}}
              >
                Status
                <Switch
                  checked={dropContent}
                  onClick={() => setDropContent((prev) => !prev)}
                />
              </Stack>
              <Divider />
              <BackupSection/>
              <Divider />
              <DataDeletionAccordion />
            </Stack>
          </CardContent>
        </Card>
        <Card id="about-card">
          <CardContent>
            <Typography>About</Typography>
          </CardContent>
        </Card>
      </Stack>
    </Backdrop>
  );
}
