import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";

import "./index.css";

import { ClerkProvider } from "@clerk/clerk-react";
import router from "./router";

import { RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { themeOptions } from "./components/ThemeProvider";
// import NavBar from "./components/NavBar"; //todo remove


// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// Create main theme
const theme = createTheme(themeOptions);

const Root = () => (
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ClerkProvider>
  </StrictMode>
);

export default Root;
// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
//       <ThemeProvider theme={theme}>
//         <RouterProvider router={router} />
//       </ThemeProvider>
//     </ClerkProvider>
//   </StrictMode>
// );
