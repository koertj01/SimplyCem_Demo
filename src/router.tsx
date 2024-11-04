// router.tsx
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import NotFound from './components/NotFound';
import Dashboard from './components/Dashboard';
import SignInPage from './components/SignInPage';
import Form from './components/ReactHookForm';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

const router = createBrowserRouter([
  {
    element: <App />,  // App as the layout component, no path specified
    children: [
      {
        path: "/",       // Root path renders without NavBar
        element: <SignInPage />,
      },
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
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
