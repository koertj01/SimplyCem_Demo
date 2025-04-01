import { createBrowserRouter, Outlet } from "react-router-dom";
import SignInPage from "./components/SignInPage";
import HomePage from "./components/Homepage";
import MappingPage from "./components/Mapping/MappingPage";
import { WorkOrderForm } from "./components/WorkOrders/WorkOrderForm";
import SettingsPage from "./components/Settings/SettingsPage";
import TopNav from "./components/TopNav";
import { ThemeListener } from "./components/Theme/ThemeListener";

// Root layout with ThemeListener
const RootLayout = () => {
  return (
    <>
      <ThemeListener />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/signin",
        element: <SignInPage />,
      },
      {
        path: "/app",
        element: <TopNav />,
        children: [
          { path: "mapping", element: <MappingPage /> },
          { path: "work_orders", element: <WorkOrderForm /> },
          { path: "settings", element: <SettingsPage /> },
        ],
      },
    ],
  },
]);

export default router;
