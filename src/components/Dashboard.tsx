import { Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { SignOutButton } from "@clerk/clerk-react";
import SimplyIcon from "../utils/SimplyIcon";
import MapIcon from "@mui/icons-material/Map";

export default function DashboardLayout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Fixed AppBar */}
      <AppBar position="fixed">
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
          <SignOutButton />
        </Toolbar>
      </AppBar>

      {/* Main Content with padding to prevent overlap */}
      <Box component="main" sx={{ flexGrow: 1, pt: { xs: 8, sm: 10 }, px: 3 }}>
        <Outlet />
      </Box>

      {/* Footer Section */}
      <Box sx={{ mt: "auto", p: 3, textAlign: "center" }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis
        dignissimos non ad, in nam nulla cupiditate delectus aut sunt? Quas
        placeat perspiciatis itaque modi voluptatum officia eaque iste sapiente
        magnam?
      </Box>
    </Box>
  );
};

