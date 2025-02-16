import { createBrowserRouter } from "react-router-dom";
import SignInPage from "./components/SignInPage";
import HomePage from "./components/Homepage";
import MappingPage from "./components/Mapping/MappingPage";
import { WorkOrderForm } from "./components/WorkOrders/WorkOrderForm";
import SettingsPage from "./components/Settings/SettingsPage";
import TopNav from "./components/TopNav";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />, // Public home page
  },
  {
    path: "/signin",
    element: <SignInPage />, // Sign-in page handles auth check
  },
  {
    path: "/app",
    element: <TopNav />, // TopNav handles authentication
    children: [
      { path: "mapping", element: <MappingPage /> },
      { path: "work_orders", element: <WorkOrderForm /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);


export default router;
