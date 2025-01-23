import { Box, Button, Grid, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box textAlign="center" mt={8} mb={10}>
        <Typography variant="h2" gutterBottom>
          Welcome to SimplyCem
        </Typography>
        <Typography variant="h6" color="textSecondary" mb={4}>
          Transform the way you manage your business with our all-in-one SaaS solution.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={ () => {} } //todo route
        >
          Sign Up
        </Button>
      </Box>

      {/* Features Section */}
      <Box mb={10}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Why Choose Us?
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: "Efficient",
              description: "Streamline your workflow with powerful tools.",
            },
            {
              title: "Secure",
              description: "Your data is protected with top-notch security.",
            },
            {
              title: "Scalable",
              description: "Grow your business with a scalable platform.",
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box textAlign="center" p={2} border={1} borderColor="grey.300" borderRadius={2}>
                <Typography variant="h6">{feature.title}</Typography>
                <Typography variant="body2" color="textSecondary" mt={1}>
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box textAlign="center">
        <Typography variant="h5" gutterBottom>
          Ready to get started?
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          onClick={() => navigate("/app/signin")}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}
