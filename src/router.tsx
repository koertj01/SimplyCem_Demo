import { createBrowserRouter } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import SignInPage from "./components/SignInPage";

import HomePage from "./components/Homepage";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import ProtectedLogin from "./components/ProtectedLogin";
import { Box } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />, // Separate component for the root
  },
  {
    path: "/app",
    element: (
      <>
        <SignedIn>
          <Dashboard />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </>
    ),
    children: [
      {
        path: "signin",
        element: (
          <SignedOut>
            <SignInPage /> {/* Sign-in page */}
          </SignedOut>
        ),
      },
      // Add more child routes here
    ],
  },
]);
export default router;
