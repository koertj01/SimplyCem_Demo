// components/NavBar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/clerk-react';
import { Link as RouterLink } from 'react-router-dom';

const NavBar = () => (
  <AppBar position="static" color="primary" elevation={4}>
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <Button component={RouterLink} to="/dashboard" color="inherit">
          Dashboard
        </Button>
        <Button component={RouterLink} to="/form" color="inherit">
          Form
        </Button>
      </Typography>

      <Box>
        <SignedIn>
          <SignOutButton>
            <Button color="inherit">Sign Out</Button>
          </SignOutButton>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <Button color="inherit">Sign In</Button>
          </SignInButton>
        </SignedOut>
      </Box>
    </Toolbar>
  </AppBar>
);

export default NavBar;
