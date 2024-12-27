import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignInPage from "./components/SignInPage";
// import MappingTools from "./components/Mapping/MappingTools";
import HomePage from "./components/Homepage";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
// import ProtectedLogin from "./components/ProtectedLogin";
// import { Box } from "@mui/material";
import MappingPage from "./components/Mapping/MappingPage";
import { WorkOrderForm } from "./components/WorkOrders/WorkOrderForm";


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
      {
        path: "mapping",
        element: (
          <SignedIn>
            <MappingPage />
          </SignedIn>
        )
      },
      {
        path: "work_orders",
        element: (
          <SignedIn>
            <WorkOrderForm />
          </SignedIn>
        )
      }
      // Add more child routes here
    ],
  },
]);
export default router;
