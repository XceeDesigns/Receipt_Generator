import React, { useContext, useEffect, useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
  Button,
  Card,
  CardContent,
  Badge
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StarIcon from '@mui/icons-material/Star';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LogoutIcon from '@mui/icons-material/Logout';
import InventoryIcon from '@mui/icons-material/Inventory';
import HistoryIcon from '@mui/icons-material/History';
import DescriptionIcon from '@mui/icons-material/Description';
import { useNavigate } from 'react-router-dom';
import ContactPageIcon from '@mui/icons-material/ContactPage';

function Sidebar({ mobileOpen, handleDrawerToggle }) {
  const drawerWidth = 260;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Check if screen size is mobile

  const backend_url = process.env.REACT_APP_BACKEND_URL;

  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  }

  const handleLogout = () => {
    // Clear the local storage and redirect to login page
    localStorage.clear();
    navigate('/');
  }

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo */}
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: '#ecf0f1', fontWeight: 'bold' }}>OrnaCloud</Typography>
      </Box>

      <Divider sx={{ bgcolor: '#444' }} />

      {/* Menu List */}
      <List>
        <ListItem button onClick={() => navigateTo('/dashboard')} sx={{ cursor: 'pointer' }}>
          <ListItemIcon>
            <DashboardIcon sx={{ color: '#ecf0f1' }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                Dashboard
                <Badge
                  badgeContent="Pro"
                  color="error"
                  sx={{
                    marginLeft: 1,
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    backgroundColor: '#FFD700',
                    color: '#2C3E50',
                    borderRadius: 1,
                    padding: '2px 6px',
                  }}
                />
              </Box>
            }
            sx={{ color: '#ecf0f1' }}
          />
        </ListItem>
        <ListItem button onClick={() => navigateTo('/dashboard/rough-receipt')} sx={{ cursor: 'pointer' }}>
          <ListItemIcon>
            <DescriptionIcon sx={{ color: '#ecf0f1' }} />
          </ListItemIcon>
          <ListItemText primary="Receipt" sx={{ color: '#ecf0f1' }} />
        </ListItem>
        <ListItem button
          onClick={async () => {
            const subscriptionResponse = await fetch(`${backend_url}/api/subscription/`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
            });
            if (subscriptionResponse.ok) {
              const data = await subscriptionResponse.json();
              console.log(data);
              if (data.subscriptionType == 'Premium' && data.subscriptionStatus == 'Active') {
                navigateTo('/dashboard/inventory')
              }
            } else {
              console.log('Error fetching subscription data');
            }
          }}
          sx={{ cursor: 'pointer' }}>
          <ListItemIcon>
            <InventoryIcon sx={{ color: '#ecf0f1' }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                Inventory
                <Badge
                  badgeContent="Pro"
                  color="error"
                  sx={{
                    marginLeft: 1,
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    backgroundColor: '#FFD700',
                    color: '#2C3E50',
                    borderRadius: 1,
                    padding: '2px 6px',
                  }}
                />
              </Box>
            }
            sx={{ color: '#ecf0f1' }}
          />
        </ListItem>
        <ListItem button onClick={() => navigateTo('/dashboard/receipt-history')} sx={{ cursor: 'pointer' }}>
          <ListItemIcon>
            <HistoryIcon sx={{ color: '#ecf0f1' }} />
          </ListItemIcon>
          <ListItemText primary="History" sx={{ color: '#ecf0f1' }} />
        </ListItem>
      </List>

      <ListItem button
        sx={{cursor: 'pointer'}}
        onClick={async () => {
          const subscriptionResponse = await fetch(`${backend_url}/api/subscription/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
          if (subscriptionResponse.ok) {
            const data = await subscriptionResponse.json();
            console.log(data);
            if ((data.subscriptionType == 'Lite' || data.subscriptionType == 'Premium') && data.subscriptionStatus == 'Active') {
              navigateTo('/dashboard/contact-us')
            }
          } else {
            console.log('Error fetching subscription data');
          }
        }}>
        <ListItemIcon>
          <ContactPageIcon sx={{ color: '#ecf0f1' }} />
        </ListItemIcon>
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              Contact Us
              <Badge
                badgeContent="Lite"
                color="secondary"
                sx={{
                  marginLeft: 1,
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  backgroundColor: '#FFD700',
                  color: '#2C3E50',
                  borderRadius: 1,
                  padding: '2px 6px',
                }}
              />
            </Box>
          }
          sx={{ color: '#ecf0f1' }}
        />
      </ListItem>

      {/* Subscription Plan Section */}
      <Box sx={{ mt: 'auto', mb: 2, px: 2 }}>
        <Card
          sx={{
            background: '#F4F6F9',
            color: '#2C3E50',
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            textAlign: 'center',
            border: '1px solid #E0E4EA',
          }}
        >
          {/* Plan Details */}
          <CardContent sx={{ py: 3 }}>
            <StarIcon sx={{ fontSize: 36, color: '#FFD700', mb: 1 }} />
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
              Premium Plan
            </Typography>
            <Typography variant="body2" sx={{ color: '#5A6A85', mb: 1 }}>
              Unlock all premium features and priority support
            </Typography>
            <Button
              variant="contained"
              size="small"
              sx={{
                mt: 1,
                px: 3,
                py: 0.8,
                bgcolor: '#2C3E50',
                color: '#fff',
                fontWeight: 'bold',
                textTransform: 'none',
                borderRadius: '6px',
                '&:hover': {
                  bgcolor: '#1A2536',
                },
              }}
              onClick={() => navigateTo('/dashboard/subscription')}
            >
              Upgrade Plan
            </Button>
          </CardContent>
        </Card>
      </Box>




      {/* Settings Button */}
      <Box sx={{ px: 2, pb: 2 }}>
        <Divider sx={{ bgcolor: '#444', mb: 1 }} />
        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          sx={{
            color: '#ecf0f1',
            borderColor: '#ecf0f1',
            width: '100%',
            '&:hover': {
              backgroundColor: '#444',
              borderColor: '#fff',
            },
          }}
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Temporary Drawer for Mobile */}
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
              background: '#1e1e2f',
              color: '#ecf0f1',
              backdropFilter: 'blur(15px)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        // Permanent Drawer for Larger Screens
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              background: '#1e1e2f',
              color: '#ecf0f1',
              backdropFilter: 'blur(15px)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
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
