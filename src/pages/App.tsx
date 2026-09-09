import { Grid, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AddEntryCard from "@/components/AddEntryCard";
import WebsiteCard from "@/components/WebisteCard";
import FolderCard from "@/components/FolderCard";
import SearchBar from "@/components/SearchBar";

function App() {
  const currentFolder = useSelector((state: RootState) => state.currentFolder).slice(-1)[0];
  const entries = useSelector((state: RootState) => state.tabEntries).filter(entry => entry.parent == currentFolder.id);
  const sizes = { xs: 6, sm: 4, md: 3, lg: 2, xl: 2 };

  return (
    <Stack sx={{padding: 2}} spacing={2} direction={'column'}>
      <SearchBar/>
      <Grid container sx={{justifyContent: 'center', alignItems: 'center'}} spacing={2}>
        {entries.length > 0 &&
          entries.map((entry) => (
            <Grid size={sizes} key={`entry_${entry.id}`}>
              {entry.type === "website" ? (
                <WebsiteCard {...entry}/>
              ) : (
                <FolderCard {...entry}/>
              )}
            </Grid>
          ))}
        <Grid size={sizes}>
          <AddEntryCard />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default App;
