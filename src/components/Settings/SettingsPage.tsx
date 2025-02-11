import {
    Container,
    List,
    ListItem,
    ListItemText,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Divider,
    Box,
    Typography,
  } from "@mui/material";
  import { useThemeMode } from "../Theme/ThemeProvider";
  
  function SettingsPage() {
    const { isDarkMode, toggleTheme } = useThemeMode();
  
    return (
      <Container maxWidth="sm">
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Settings
          </Typography>
  
          <List>
            {/* Theme Section */}
            <Typography variant="subtitle1" sx={{ pl: 2, pb: 1, fontWeight: "bold" }}>
              Theme
            </Typography>
            <ListItem>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={isDarkMode} onChange={toggleTheme} />}
                  label="Use Dark Mode"
                />
              </FormGroup>
            </ListItem>
  
            <Divider sx={{ my: 2 }} />
  
            {/* Future settings can be added here */}
            <Typography variant="subtitle1" sx={{ pl: 2, pb: 1, fontWeight: "bold" }}>
              Other Settings
            </Typography>
            <ListItem>
              <ListItemText primary="Coming soon..." secondary="More options will be added here." />
            </ListItem>
          </List>
        </Box>
      </Container>
    );
  }
  
  export default SettingsPage;
  