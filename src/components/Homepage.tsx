import { Box, Button, Typography, Container, Grid, Grid2, Card, CardContent, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import MapIcon from '@mui/icons-material/Map';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SecurityIcon from '@mui/icons-material/Security';

export default function HomePage() {
  const navigate = useNavigate();
  const { isSignedIn, userId } = useAuth();

  if (isSignedIn) {
    return (
      <Box>
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom>
            Welcome back, {userId || "User"}!
          </Typography>
          <Typography variant="body1" mb={4}>
            Continue to your dashboard to manage your business.
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            onClick={() => navigate("/app/mapping")}
          >
            Go to Dashboard
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 2 }}>
      <Container maxWidth="lg">
        
        {/* Hero Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            mt: 8,
            mb: 10,
          }}
        >
          <Typography variant="h2" gutterBottom component="h1" sx={{ fontWeight: 600 }}>
            Welcome to SimplyCem
          </Typography>
          <Typography variant="h5" color="textSecondary" mb={4} sx={{ maxWidth: 800 }}>
            Modern cemetery management and mapping software that simplifies record-keeping, 
            plot management, and visitor assistance.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button 
              variant="contained" 
              size="large" 
              onClick={() => navigate("/signin")}
              startIcon={<MapIcon />}
              sx={{ px: 4, py: 1.5 }}
            >
              Start Mapping
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              onClick={() => {}} 
              sx={{ px: 4, py: 1.5 }}
            >
              Learn More
            </Button>
          </Box>
        </Box>

        {/* Main Features Section */}
        <Box mb={10}>
          <Typography variant="h4" textAlign="center" gutterBottom mb={6} fontWeight={500}>
            Cemetery Management Simplified
          </Typography>
          
          <Grid2 container spacing={4} justifyContent="center">
            {[
              {
                icon: <MapIcon fontSize="large" color="primary" />,
                title: "Interactive Mapping",
                description: "Create detailed, interactive maps of your cemetery grounds with plot locations and information.",
              },
              {
                icon: <SearchIcon fontSize="large" color="primary" />,
                title: "Record Search",
                description: "Help visitors quickly locate graves with our powerful search functionality.",
              },
              {
                icon: <CalendarTodayIcon fontSize="large" color="primary" />,
                title: "Service Scheduling",
                description: "Coordinate burials, maintenance, and memorial services with our scheduling tools.",
              },
              {
                icon: <PeopleIcon fontSize="large" color="primary" />,
                title: "Family Records",
                description: "Maintain comprehensive records of plot ownership and family connections.",
              },
              {
                icon: <AnalyticsIcon fontSize="large" color="primary" />,
                title: "Space Management",
                description: "Efficiently track available plots and optimize space utilization.",
              },
              {
                icon: <SecurityIcon fontSize="large" color="primary" />,
                title: "Secure Data",
                description: "Keep sensitive records protected with enterprise-grade security.",
              },
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  elevation={1}
                  sx={{ 
                    height: "100%", 
                    display: "flex", 
                    flexDirection: "column",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4,
                    }
                  }}
                >
                  <CardContent sx={{ 
                    textAlign: "center", 
                    p: 4, 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    flexGrow: 1 
                  }}>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h6" gutterBottom fontWeight={500}>{feature.title}</Typography>
                    <Typography variant="body1" color="textSecondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid2>
        </Box>

        {/* Testimonial Section */}
        <Box 
          mb={10} 
          sx={{ 
            backgroundColor: 'grey.100', 
            borderRadius: 4, 
            p: 6, 
            textAlign: 'center' 
          }}
        >
          <Typography variant="h5" gutterBottom fontStyle="italic">
            "SimplyCem has transformed how we manage our memorial gardens. The mapping feature 
            alone has saved us countless hours and improved visitor satisfaction."
          </Typography>
          <Typography variant="subtitle1" color="primary" fontWeight={500} mt={2}>
            — James Wilson, Cedar Hill Memorial Park
          </Typography>
        </Box>

        {/* Call to Action */}
        <Box 
          textAlign="center" 
          mb={10} 
          sx={{ 
            p: 8, 
            borderRadius: 4, 
            backgroundColor: 'primary.light',
            color: 'primary.contrastText',
            boxShadow: 2
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight={500}>
            Ready to modernize your cemetery management?
          </Typography>
          <Typography variant="h6" mb={4} sx={{ maxWidth: 700, mx: 'auto' }}>
            Join the growing number of cemeteries using SimplyCem to streamline operations and improve service.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/signin")}
            color="secondary"
            sx={{ px: 4, py: 1.5, mt: 2 }}
          >
            Get Started Today
          </Button>
        </Box>

        {/* Footer */}
        <Divider sx={{ mb: 4 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, flexWrap: 'wrap' }}>
          <Typography variant="body2" color="textSecondary">
            © 2025 SimplyCem. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Typography variant="body2" color="textSecondary" sx={{ cursor: 'pointer' }}>
              Privacy Policy
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ cursor: 'pointer' }}>
              Terms of Service
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ cursor: 'pointer' }}>
              Contact Us
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
