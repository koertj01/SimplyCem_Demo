import { Box, Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

const Layout: React.FC<{ requireAuth?: boolean }> = ({ requireAuth = false }) => {
  return (
    <>
      {requireAuth ? (
        <>
          <SignedIn>
            <Box
              component="div"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                width: '100%',
              }}
            >
              <TopNav />
              <Box
                component="main"
                sx={{
                  flex: 1,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'background.default',
                  pt: '64px', // Height of AppBar
                }}
              >
                <Container
                  maxWidth="xl"
                  sx={{
                    flex: 1,
                    py: 3,
                    px: { xs: 2, sm: 3 },
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Outlet />
                </Container>
              </Box>
            </Box>
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      ) : (
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            width: '100%',
          }}
        >
          <Box
            component="main"
            sx={{
              flex: 1,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'background.default',
            }}
          >
            <Outlet />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Layout;
