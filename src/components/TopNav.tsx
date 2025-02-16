import { Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { SignOutButton, useUser, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import MapIcon from "@mui/icons-material/Map";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

export default function TopNav() {
  const { user } = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Signed-Out Users Redirect to Sign In */}
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      {/* Signed-In Users See Navbar */}
      <SignedIn>
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <AppBar position="fixed">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {/* Left Section */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <MapIcon sx={{ marginRight: 1 }} />
                <Typography variant="h6">SimplyCem</Typography>
              </Box>

              {/* Right Section */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar src={user?.imageUrl} alt={user?.fullName} />
                <IconButton onClick={handleMenuOpen}>
                  <MoreVertIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                  <MenuItem onClick={() => navigate("/app/settings")}>Settings</MenuItem>
                  <MenuItem onClick={() => navigate("/app/mapping")}>Mapping</MenuItem>
                  <MenuItem onClick={() => navigate("/app/work_orders")}>Work Orders</MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <SignOutButton />
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>

          {/* Main Content */}
          <Box component="main" sx={{ flexGrow: 1, pt: { xs: 8, sm: 10 }, px: 3 }}>
            <Outlet /> {/* This renders child routes */}
          </Box>

          {/* Footer */}
          <Box sx={{ mt: "auto", p: 3, textAlign: "center" }}>
            SimplyCem &copy; {new Date().getFullYear()}
          </Box>
        </Box>
      </SignedIn>
    </>
  );
}
