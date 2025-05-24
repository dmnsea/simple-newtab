import {
  AppBar,
  Box,
  Button,
  createTheme,
  CssBaseline,
  IconButton,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { LightMode, DarkMode, Settings } from "@mui/icons-material";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { switchTheme } from "@/redux/preferenceSlice";

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
  const prefs = useSelector((state: RootState) => state.prefs);
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={prefs.darkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <Stack>
        <AppBar>
            <Toolbar>
              <Typography>Simple Tab</Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                onClick={() => dispatch(switchTheme())}
                endIcon={prefs.darkTheme ? <LightMode /> : <DarkMode />}
                variant={"text"}
                color={"inherit"}
              >
                Switch to
              </Button>
              <IconButton color={"inherit"}>
                <Settings />
              </IconButton>
            </Toolbar>
        </AppBar>
        <Box sx={{ marginTop: 8 }}>
          <Outlet />
        </Box>
      </Stack>
    </ThemeProvider>
  );
}
