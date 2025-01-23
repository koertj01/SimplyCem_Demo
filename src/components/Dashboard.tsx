import { Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { SignOutButton } from "@clerk/clerk-react";
import SimplyIcon from "../utils/SimplyIcon";
import MapIcon from "@mui/icons-material/Map";

export default function DashboardLayout() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left Section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <MapIcon sx={{ marginRight: 1 }} />
            <Typography variant="h6">SimplyCem</Typography>
          </Box>

          {/* Right Section */}
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <SignOutButton />
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box component="main" sx={{ p: 3 }}>
        <Outlet />
      </Box>
      <Box sx={{ mt: 3 }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis
        dignissimos non ad, in nam nulla cupiditate delectus aut sunt? Quas
        placeat perspiciatis itaque modi voluptatum officia eaque iste sapiente
        magnam?
      </Box>
    </Box>
  );
}
