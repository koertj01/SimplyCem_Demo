import { Box, Typography, useTheme } from "@mui/material";

function Footer() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: (theme) => theme.palette.background.default,
        textAlign: "center", 
        padding: "16px 0",
      }}
    >
      <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
        &copy; 2024 SimplyCem. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
