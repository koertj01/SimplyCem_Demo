// router.tsx
// import App from './App';
// import NotFound from './components/NotFound';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Dashboard from './components/Dashboard';
import SignInPage from './components/SignInPage';
import Form from './components/ReactHookForm';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { ActivityLogComponent } from './components/EventViewer/ActivityMoniter';



const App = () => {
  return (
    <div>
      <header>Header (optional)</header>
      <Outlet />
      <footer>Footer (optional)</footer>
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <SignInPage /> },
      {
        path: "dashboard",
        element: (
          <SignedIn>
            <Dashboard />
          </SignedIn>
        ),
        errorElement: <RedirectToSignIn />,
      },
      {
        path: "signin",
        element: (
          <SignedOut>
            <SignInPage />
          </SignedOut>
        ),
      },
      {
        path: "form",
        element: (
          <SignedIn>
            <Form />
          </SignedIn>
        ),
        errorElement: <RedirectToSignIn />,
      },
      {
        path: "activity",
        element: (
          <SignedIn>
            <ActivityLogComponent />
          </SignedIn>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

