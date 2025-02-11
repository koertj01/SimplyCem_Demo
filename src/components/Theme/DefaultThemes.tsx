import { createTheme, ThemeOptions } from "@mui/material";

// Light Theme
export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
  },
};

// Dark Theme
export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
};

// Function to create theme dynamically
export const getTheme = (isDarkMode: boolean) =>
  createTheme(isDarkMode ? darkThemeOptions : lightThemeOptions);

