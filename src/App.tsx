import React, { useState } from "react";
import { createTheme, ThemeProvider, CssBaseline, Switch, FormControlLabel } from "@mui/material";
import { darkThemeOptions, lightThemeOptions } from "./components/ThemeProvider"; 
import { Router, RouterProvider } from "react-router-dom";
import router from "./router";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = createTheme(isDarkMode ? darkThemeOptions : lightThemeOptions);

  const handleThemeChange = () => {
    console.log("Changing theme...");
    setIsDarkMode((prev) => !prev);
  };

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FormControlLabel
          control={<Switch checked={isDarkMode} onChange={handleThemeChange} />}
          label="Dark Mode"
          sx={{ position: "fixed", top: 10, right: 10 }}
        />
         <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  );
}