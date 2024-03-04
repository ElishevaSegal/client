import { Box, LinearProgress } from "@mui/material";
import LayoutComponent from "./layout/LayoutComponent";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Routes from "./routes/Router";
import { useEffect, useState } from "react";
import useAutoLogin from "./hooks/useAutoLogin";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import tmc from "twin-moon-color";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "@mui/material/styles";

const App = () => {
  const [doneAuth, setDoneAuth] = useState(false);
  const autoLogin = useAutoLogin();
  const theme = useTheme();
  useEffect(() => {
    (async () => {
      try {
        await autoLogin(); 
      } catch (err) {
      } finally {
        setDoneAuth(true);
      }
    })();
  }, []);

  return (
    <Box>
      <LayoutComponent>
        <ToastContainer />
        {doneAuth ? <Routes /> : <LinearProgress />}
      </LayoutComponent>
    </Box>
  );
};

export default App;
