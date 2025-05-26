import {
  AppBar,
  Box,
  createTheme,
  CssBaseline,
  IconButton,
  Stack,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Settings, ArrowBack } from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { goBack } from "@/redux/currentFolderSlice";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function BaseLayout() {
  const currentFolder = useSelector((state: RootState) => state.currentFolder).slice(-1)[0];
  const prefs = useSelector((state: RootState) => state.prefs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={prefs.darkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <Stack>
        <AppBar>
            <Toolbar>
              {currentFolder.id != 0 && (<Tooltip title='Go back'>
                <IconButton onClick={() => dispatch(goBack())}>
                  <ArrowBack/>
                </IconButton>
              </Tooltip>)}
              <Typography variant="h5">{currentFolder.title}</Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Tooltip title='Settings'>
                <IconButton color='inherit' onClick={() => navigate('/settings')}>
                  <Settings />
                </IconButton>
              </Tooltip>
            </Toolbar>
        </AppBar>
        <Box sx={{ marginTop: 8 }}>
          <Outlet />
        </Box>
      </Stack>
    </ThemeProvider>
  );
}
