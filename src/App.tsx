import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ClerkProvider } from "@clerk/clerk-react";
import { ThemeProviderWrapper } from "./components/Theme/ThemeProvider";

export default function App() {

  const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!clerkPublishableKey) {
    throw new Error("Missing Clerk Publishable Key");
  }

  return (
    <React.StrictMode>
      <ClerkProvider publishableKey={clerkPublishableKey} afterSignOutUrl="/">
        <ThemeProviderWrapper>
          <RouterProvider router={router} />
        </ThemeProviderWrapper>
      </ClerkProvider>
    </React.StrictMode>
  );
}
