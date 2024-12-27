import { createBrowserRouter } from 'react-router-dom';

import Dashboard from "./components/Dashboard";
import SignInPage from "./components/SignInPage";

import HomePage from './components/Homepage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />, // Separate component for the root
  },
  {
    path: "/app",
    element: <Dashboard />, // Layout with menu bar
    children: [
      {
        path: "signin",
        element: <SignInPage />,
      },
      // Add more child routes here
    ],
  },
]);

export default router;
