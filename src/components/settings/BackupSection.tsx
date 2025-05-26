import { Add, CloudDownload, CloudUpload } from "@mui/icons-material";
import { Button, CircularProgress, Dialog, Paper, Stack, Typography } from "@mui/material";
import { saveBackup, restoreBackup, restoreFromFile } from "@/utils/backups";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { entriesFromFile } from "@/redux/tabSlice";
import { prefsFromFile } from "@/redux/preferenceSlice";

export default function BackupSection() {
  const entries = useSelector((state: RootState) => state.tabEntries);
  const prefs = useSelector((state: RootState) => state.prefs);
  const [showImport, setShowImport] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <Typography variant="h6">Backup</Typography>
      <Stack direction="row" gap={1}>
        <Button
          startIcon={<CloudUpload />}
          fullWidth
          variant="contained"
          onClick={() => {
            saveBackup({entries, prefs});
          }}
        >
          Save
        </Button>
        <Button
          startIcon={<CloudDownload />}
          fullWidth
          variant="contained"
          onClick={() => {
            setShowImport(true);
          }}
        >
          Restore
        </Button>
        <Dialog
          id="import-backup-drop"
          open={showImport}
          onClose={() => setShowImport(false)}
        >
          <Paper
            elevation={5}
            sx={{
              padding: 3,
              width: 360,
              height: 360,
            }}
            onDragEnter={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDragOver={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={async (e) => {
              setLoading(true);
              e.preventDefault();
              e.stopPropagation();

              const dt = e.dataTransfer;
              const files = dt.files;

              const bkp = await restoreFromFile(files[0]);

              dispatch(entriesFromFile(bkp.entries));
                dispatch(prefsFromFile(bkp.prefs));

                setLoading(false);
                setShowImport(false);
            }}
          >
            <Button
              variant={"outlined"}
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                padding: 2,
              }}
              onClick={async () => {
                setLoading(true);
                
                const data = await restoreBackup();
                dispatch(entriesFromFile(data.entries));
                dispatch(prefsFromFile(data.prefs));

                setLoading(false);
                setShowImport(false);
              }}
            >
              {loading ? <CircularProgress/> : <Add color={"disabled"} fontSize="large" />}
              <Typography>{loading ? 'Reading backup' : 'Click or drop your backup here' }</Typography>
            </Button>
          </Paper>
        </Dialog>
      </Stack>
    </>
  );
}

// TODO: https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications#selecting_files_using_drag_and_drop