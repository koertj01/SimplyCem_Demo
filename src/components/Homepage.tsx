import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h2">Welcome to My App</Typography>
      <Button variant="contained" onClick={() => navigate("/app/signin")}>
        Login
      </Button>
    </Box>
  );
}
