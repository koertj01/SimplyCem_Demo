import { createTheme } from "@mui/material";
import { createContext, useContext, useMemo } from "react";
import { darkThemeOptions, lightThemeOptions } from "./DefaultThemes";
import {
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { useToggleState } from "../../utils/UseToggleState";

const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

export const ThemeProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDarkMode, toggleDarkMode] = useToggleState(false);

  // Memoize theme to prevent unecessary re-renders
  const theme = useMemo(
    () => createTheme(isDarkMode ? darkThemeOptions : lightThemeOptions),
    [isDarkMode]
  );

  const toggleTheme = toggleDarkMode;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
