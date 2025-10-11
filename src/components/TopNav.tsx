import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { SignOutButton, useUser } from "@clerk/clerk-react";
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
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Left Section */}
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => navigate('/app')}
        >
          <MapIcon 
            sx={{ marginRight: 1 }} 
            aria-hidden="true"
          />
          <Typography 
            variant="h6" 
            component="h1"
            sx={{
              display: { xs: 'none', sm: 'block' },
            }}
          >
            SimplyCem
          </Typography>
        </Box>

        {/* Right Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title={user?.fullName || 'User profile'}>
            <Avatar 
              src={user?.imageUrl} 
              alt={user?.fullName || 'User avatar'}
              sx={{
                width: 40,
                height: 40,
                cursor: 'pointer',
              }}
              onClick={handleMenuOpen}
            />
          </Tooltip>
          
          <IconButton
            aria-label="more options"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            <MoreVertIcon />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => { handleMenuClose(); navigate('/app/mapping'); }}>
              Mapping
            </MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); navigate('/app/work_orders'); }}>
              Work Orders
            </MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); navigate('/app/settings'); }}>
              Settings
            </MenuItem>
            <MenuItem>
              <SignOutButton />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
