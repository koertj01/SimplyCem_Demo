import { SignIn } from "@clerk/clerk-react";
import { Box, Typography } from "@mui/material";

const SignInPage = () => {
  return (
    <Box sx={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h4" gutterBottom>
        Welcome Back
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please log in to access your account.
      </Typography>
      <Box sx={{ marginTop: "20px", width: "100%", maxWidth: "400px" }}>
        <SignIn routing="path" path="/signin" />
      </Box>
    </Box>
  );
};

export default SignInPage;
