import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkTheme: false,
};

const darkTheme = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //collection of functions to setState
    changeTheme(state) {
      state.darkTheme = !state.darkTheme;
      // Save the updated theme preference to localStorage
      localStorage.setItem("theme", state.darkTheme ? "dark" : "light");
    },
  },
});

export const darkThemeActions = darkTheme.actions;

export default darkTheme.reducer;
