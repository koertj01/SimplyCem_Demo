import React, { useState } from "react";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  darkThemeOptions,
  lightThemeOptions,
} from "./components/ThemeProvider";
import { Router, RouterProvider } from "react-router-dom";
import router from "./router";
import { ClerkProvider } from "@clerk/clerk-react";
import { useToggleState } from "./utils/UseToggleState";

export default function App() {
  const [isDarkMode, toggleDarkMode] = useToggleState(false); //Use custom hook to setup a toggle state

  const theme = createTheme(isDarkMode ? darkThemeOptions : lightThemeOptions);

  const handleThemeChange = () => {
    console.log("Changing theme...");
    toggleDarkMode();
  };

  const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!clerkPublishableKey) {
    throw new Error("Missing Clerk Publishable Key");
  }

  return (
    <React.StrictMode>
      <ClerkProvider publishableKey={clerkPublishableKey} afterSignOutUrl="/">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <FormControlLabel
            control={
              <Switch checked={isDarkMode} onChange={handleThemeChange} />
            }
            label="Dark Mode"
            sx={{ position: "fixed", top: 10, right: 10 }}
          />
          <RouterProvider router={router} />
        </ThemeProvider>
      </ClerkProvider>
    </React.StrictMode>
  );
}
