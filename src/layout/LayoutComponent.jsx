import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HeaderComponent from "./header/HeaderComponent";
import MainComponent from "./main/MainComponent";
import FooterComponent from "./footer/FooterComponent";
import tmc from "twin-moon-color";
import { useDispatch, useSelector } from "react-redux";
import { darkThemeActions } from "../store/darkThemeSlice";
import { blueGrey, amber, teal } from "@mui/material/colors";

const LayoutComponent = ({ children }) => {
  const isDarkTheme = useSelector((bigPie) => bigPie.darkThemeSlice.darkTheme);
  const dispatch = useDispatch();

  const themes = tmc({
    "text.headerColor": "!#b219e6",
    "text.headerActive": "#9e165c",
    primary: "*#7a2a26",
  });
  localStorage.getItem(themes);

  const darkTheme = createTheme(themes.dark);
  const lightTheme = createTheme(themes.light);


  const handleThemeChange = (checked) => {
    dispatch(darkThemeActions.changeTheme());
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
          <HeaderComponent
            isDarkTheme={isDarkTheme}
            onThemeChange={handleThemeChange}
          />
          <MainComponent>{children}</MainComponent>
          <FooterComponent />
        </ThemeProvider>
  );
};

export default LayoutComponent;
