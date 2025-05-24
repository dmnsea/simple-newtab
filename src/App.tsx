import { Grid, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import AddEntryCard from "./components/AddEntryCard";
import WebsiteCard from "./components/WebisteCard";
import FolderCard from "./components/FolderCard";

function App() {
  const entries = useSelector((state: RootState) => state.tabEntries);
  const sizes = { xs: 6, sm: 4, md: 3, lg: 2, xl: 1 };

  return (
    <Stack padding={2} direction={'column'}>
      <Grid container spacing={2} width={'100%'} justifyContent={'center'} alignItems={'center'}>
        {entries.length > 0 &&
          entries.map((entry) => (
            <Grid size={sizes} key={`entry_${entry.id}`}>
              {entry.type === "website" ? (
                <WebsiteCard
                  id={entry.id}
                  title={entry.title}
                  url={entry.url}
                  type={entry.type}
                />
              ) : (
                <FolderCard
                  id={entry.id}
                  title={entry.title}
                  children={entry.children}
                  type={entry.type}
                />
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
