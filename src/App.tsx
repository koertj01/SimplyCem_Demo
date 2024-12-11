import { useEffect, useState } from "react"; 
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Popover,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./components/Sidebar";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import Connector from "./components/SupabaseConnector";

export default function App() {
  const [menuClicked, setMenuClicked] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuClicked(!menuClicked); // Toggle visibility
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuClicked(false);
  };

  const open = Boolean(anchorEl);

  //TODO we can configure this later to read the configuration for the locaiton so that we can hide/show menu options
  // Should we use a master Icon list and then query for the Icon type based on that Id?
  // we could create another table that just tracks the icons incast we want to customize per location
  const sidebarItems = [
    { id: "1", label: "Home", icon: <HomeIcon /> },
    { id: "2", label: "Settings", icon: <SettingsIcon /> },
    { id: "3", label: "Profile", icon: <AccountCircleIcon />, disabled: false },
    { id: "4", label: "Options", icon: <div></div> },
  ];

  // const sup = Connector();

  return (
    <Box>
      <AppBar color="primary" elevation={0}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "64px",
          }}
        >
          {/* Left Section: Menu Icon and Title */}
          <Box display="flex" alignItems="center" sx={{ gap: 2 }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>

            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {/* sx={{ width: 250, p: 2 }}> */}
              <Box>
                <Sidebar items={sidebarItems} />
              </Box>
            </Popover>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                color: "inherit",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "1.25rem", // Force consistent size
              }}
            >
              SimplyCem
            </Typography>
          </Box>

          {/* Right Section: Sign-In or User Button */}
          <Box>
            <SignedOut>
              <SignInButton mode="modal">
                <Typography
                  variant="button"
                  color="inherit"
                  component="span"
                  sx={{ fontSize: "1rem" }}
                >
                  Sign In
                </Typography>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton showName={false} />
            </SignedIn>
          </Box>
        </Toolbar>
      </AppBar>
      <Box>
        {/* <Typography varia   nt="h1" component="h2">{sup.schema.name}</Typography> */}
      </Box>
      <Box>
        Some Text...
      </Box>
    </Box>
  );
}
                 