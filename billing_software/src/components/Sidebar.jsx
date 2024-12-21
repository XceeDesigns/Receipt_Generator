import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableChartIcon from '@mui/icons-material/TableChart';
import PaymentIcon from '@mui/icons-material/Payment';

function Sidebar({ mobileOpen, handleDrawerToggle }) {
  const drawerWidth = 240;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Check if screen size is mobile

  const drawerContent = (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" align="center" sx={{ color: '#ecf0f1' }}>OrnaCloud</Typography>
      <List>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon sx={{ color: '#ecf0f1' }} /> 
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ color: '#ecf0f1' }} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <TableChartIcon sx={{ color: '#ecf0f1' }} />
          </ListItemIcon>
          <ListItemText primary="Tables" sx={{ color: '#ecf0f1' }} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PaymentIcon sx={{ color: '#ecf0f1' }} />
          </ListItemIcon>
          <ListItemText primary="Billing" sx={{ color: '#ecf0f1' }} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {/* Render Temporary Drawer for Mobile Screens */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better performance on mobile
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              background: '#1e1e2f', // Dark background
              backdropFilter: 'blur(15px)', // Glass effect
              color: '#ecf0f1', // Light text color for readability
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        // Render Permanent Drawer for Larger Screens
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              background: '#1e1e2f', // Dark background to match Header
              backdropFilter: 'blur(15px)', // Glass effect
              color: '#ecf0f1', // Light text color for readability
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', // Soft shadow for depth
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}

export default Sidebar;
