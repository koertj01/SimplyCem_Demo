import { Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { SignOutButton } from "@clerk/clerk-react";

export default function DashboardLayout() {

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">My App</Typography>
          <SignOutButton />
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Outlet />
      </Box>
      <Box sx={{ mt: 3 }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis dignissimos non ad, in nam nulla cupiditate delectus aut sunt? Quas placeat perspiciatis itaque modi voluptatum officia eaque iste sapiente magnam?
      </Box>
    </Box>
  );
}
