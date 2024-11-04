import React, { useEffect, ReactNode } from "react";
import { useTheme, Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { CSSProperties } from "react";
import { Link } from "react-router-dom";

// Route interface to handle path, label, and optional icon
interface Route {
  path: string;
  label: string;
  icon?: ReactNode;  // Optional icon, using ReactNode to allow any valid icon component
}

interface QuickBarProps {
  styles?: CSSProperties;
  links: Route[];  // Using the Route interface for links prop
}

// Default styles for the component
const defaultStyles: CSSProperties = {
  backgroundColor: 'white',
  padding: '5px',
  borderRadius: '5px',
  textAlign: 'center',
};


const QuickBar: React.FC<QuickBarProps> = ({ styles = defaultStyles, links }) => {
  const theme = useTheme(); //todo migrate this out of the component so we can isolate the styles

  useEffect(() => {
    console.log("Component has loaded");
  }, []);

  return (
    <Box sx={{ ...styles, padding: theme.spacing(2) }}>
      <List>
        {links.map((link, index) => (
          <ListItem key={index} divider={true} component={Link} to={link.path}>
            {link.icon && (
              <ListItemIcon>
                {link.icon}
              </ListItemIcon>
            )}
            <ListItemText primary={link.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default QuickBar;
