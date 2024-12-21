import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Header({ handleDrawerToggle }) {
  return (
    <AppBar
      position="static"
      sx={{
        background: '#1e1e2f', // Dark background for the header
        backdropFilter: 'blur(10px)', // Frosted glass effect
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
      }}
    >
      <Toolbar>
        {/* Hamburger Icon on Mobile */}
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { md: 'none' } }}
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>

        {/* Dashboard Title */}
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#ffffff' }}>
          Dashboard
        </Typography>

        {/* Profile Icon */}
        <IconButton color="inherit" sx={{ ml: 2 }}>
          <Avatar
            sx={{
              bgcolor: '#3f51b5', // Professional color for profile icon background
              color: '#fff', // White color for the avatar icon (default profile icon color)
            }}
            alt="Profile"
            src="/static/images/avatar/1.jpg" // You can add a path to an image if needed
          >
            <AccountCircleIcon />
          </Avatar>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
