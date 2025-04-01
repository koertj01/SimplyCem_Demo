import { createContext, useContext, useMemo, ReactNode, useState } from 'react';
import { ThemeProvider, createTheme, Theme, PaletteMode, ThemeOptions } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useToggleState } from '../../utils/UseToggleState';
// Define base theme options with proper typing
const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light' as PaletteMode,
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#388e3c',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
  // ... other theme options
};

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark' as PaletteMode,
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#66bb6a',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  // ... other theme options
};

// Home page specific theme options
const homeThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light' as PaletteMode,
    primary: {
      main: '#3f51b5', // A calming blue
      light: '#757de8',
      dark: '#002984',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#607d8b', // Blue grey - subtle and respectful
      light: '#8eacbb',
      dark: '#34515e',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5', // Light grey background
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#5c5c5c',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
          borderRadius: 12,
        },
      },
    },
  },
};

// Dark version of home theme
const homeDarkThemeOptions: ThemeOptions = {
  ...homeThemeOptions,
  palette: {
    ...(homeThemeOptions.palette || {}),
    mode: 'dark' as PaletteMode,
    primary: {
      main: '#757de8',
      light: '#a4aefc',
      dark: '#3f51b5',
      contrastText: '#121212',
    },
    secondary: {
      main: '#8eacbb',
      light: '#c1e0ed',
      dark: '#607d8b',
      contrastText: '#121212',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#a0a0a0',
    },
  },
};

// Define theme types for easier reference
export type ThemeType = 'home' | 'app';
// Create theme context
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setActiveThemeType: (themeType: ThemeType) => void;
  activeThemeType: ThemeType;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
  setActiveThemeType: () => {}, 
  activeThemeType: 'app',
});

export const useThemeMode = () => useContext(ThemeContext);

export const ThemeProviderWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isDarkMode, toggleDarkMode] = useToggleState(false);
  const [activeThemeType, setActiveThemeType] = useState<ThemeType>('app');

  // Create and memoize themes separately
  const appTheme = useMemo(
    () => createTheme(isDarkMode ? darkThemeOptions : lightThemeOptions),
    [isDarkMode]
  );
  
  const homePageTheme = useMemo(
    () => createTheme(isDarkMode ? homeDarkThemeOptions : homeThemeOptions),
    [isDarkMode]
  );

  // Choose which theme to use based on current route
  const currentTheme = useMemo(() => {
    return activeThemeType === 'home' ? homePageTheme : appTheme;
  }, [activeThemeType, homePageTheme, appTheme]);

  return (
    <ThemeContext.Provider 
      value={{ 
        isDarkMode, 
        toggleTheme: toggleDarkMode,
        setActiveThemeType,
        activeThemeType
      }}
    >
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};