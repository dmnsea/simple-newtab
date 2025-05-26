import { resetPath } from "@/redux/currentFolderSlice";
import { resetPreferences } from "@/redux/preferenceSlice";
import { RootState } from "@/redux/store";
import { resetTabEntries } from "@/redux/tabSlice";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function DataDeletionAccordion() {
  const [confirmInput, setConfirmInput] = useState("");
  const [confirmTwice, setConfirmTwice] = useState(false);
  const amountOfEntries = useSelector((state: RootState) => state.tabEntries.filter(e => e.type == 'website').length);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <Accordion variant="outlined">
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h5">Danger zone</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction={"column"} gap={2}>
          <Typography variant="h6">Folder deletion behaviour</Typography>

          <Divider />
          <Typography variant="h6">Data deletion</Typography>
          <Typography>No backup will be done before deletion!</Typography>
          <Typography>
            By clicking on "DELETE ALL DATA" you're going to delete all saved
            sites and folders.
          </Typography>
          <Typography variant="subtitle2">Right now you have <Chip label={amountOfEntries}/> websites saved. Type in this number below to enable deletion.</Typography>
          <TextField
            value={confirmInput}
            onChange={(e) => setConfirmInput(e.target.value)}
            variant="outlined"
          />
          <Button color="error" variant="contained" disabled={confirmInput.trim().length == 0 || Number(confirmInput) != amountOfEntries} onClick={() => {
            if(!confirmTwice){
              setConfirmTwice(true);
            }else{
              dispatch(resetPath());
              dispatch(resetPreferences());
              dispatch(resetTabEntries());
              localStorage.removeItem('snt-entries');
              localStorage.removeItem('snt-prefs');
              navigate('/');
            }
          }}>{confirmTwice ? 'Are you sure?' : 'Delete all data'}</Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
