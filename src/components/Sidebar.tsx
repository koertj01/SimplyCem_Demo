import React from 'react';
import { useTheme, Box, Typography, IconButton } from '@mui/material';
import { SignedIn } from '@clerk/clerk-react';

// Define the MenuItem interface
export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  subMenuItems?: MenuItem[];
  href?: string;
}

// SidebarItem: Component for rendering individual menu items
function SidebarItem({ item }: { item: MenuItem }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 16px',
        color: item.disabled ? theme.palette.grey[500] : theme.palette.text.primary,
        cursor: item.disabled ? 'not-allowed' : 'pointer',
        '&:hover': {
          backgroundColor: item.disabled ? 'transparent' : theme.palette.action.hover,
        },
      }}
      onClick={item.disabled ? undefined : item.onClick}
    >
      {item.icon && <IconButton size="small" sx={{ mr: 1 }}>{item.icon}</IconButton>}
      <Typography variant="body1" sx={{ flexGrow: 1 }}>
        {item.label}
      </Typography>
    </Box>
  );
}

// Sidebar: Component for rendering the menu with nested items
function Sidebar({ items }: { items: MenuItem[] }) {
  return (
    <SignedIn>
      <Box sx={{ width: 250, backgroundColor: 'background.paper', p: 2 }}>
        {items.map(item => (
          <Box key={item.id} sx={{ mb: 1 }}>
            <SidebarItem item={item} />
            {item.subMenuItems && (
              <Box sx={{ ml: 3 }}>
                {item.subMenuItems.map(subItem => (
                  <SidebarItem key={subItem.id} item={subItem} />
                ))}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </SignedIn>
  );
}

export default Sidebar;
