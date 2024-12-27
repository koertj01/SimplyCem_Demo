import { Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

export default function DashboardLayout() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My App</Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
