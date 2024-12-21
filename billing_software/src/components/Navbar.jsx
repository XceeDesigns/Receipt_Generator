import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Menu, MenuItem, Divider, Stack } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    console.log('Logged out');
    localStorage.removeItem('token');
    navigate('/');
    handleClose();
  };

  const handleReceiptHistory = () => {
    navigate('/receipt-history');
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#1E1E1E', // Sleek dark background
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Toolbar>
          {/* Brand Title */}
          <Typography
  variant="h5"
  component="div"
  sx={{
    flexGrow: 1,
    fontWeight: 600,
    letterSpacing: '1.5px',
    fontSize: '1.5rem',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: '-4px',
      left: 0,
      height: '2px',
      width: '50px',
      backgroundColor: '#90CAF9',
    },
  }}
>
  Receipt Generator
</Typography>



          {/* User Icon */}
          <IconButton
            size="large"
            edge="end"
            aria-label="account menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{
              color: '#FFFFFF',
              transition: 'color 0.3s',
              '&:hover': { color: '#2196F3' },
            }}
          >
            <AccountCircle sx={{ fontSize: '2rem' }} />
          </IconButton>

          {/* Dropdown Menu */}
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{
              '& .MuiPaper-root': {
                borderRadius: '10px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                padding: '8px 0',
                minWidth: '220px',
                mt: 1.5,
              },
            }}
          >
            <MenuItem onClick={handleClose} sx={menuItemStyles}>
              <PersonIcon sx={iconStyles} /> Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleReceiptHistory} sx={menuItemStyles}>
              <ReceiptIcon sx={iconStyles} /> Receipt History
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ ...menuItemStyles, color: '#D32F2F' }}>
              <LogoutIcon sx={iconStyles} /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

// Styles for consistency
const menuItemStyles = {
  fontSize: '0.95rem',
  padding: '10px 20px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  '&:hover': {
    backgroundColor: '#F5F5F5',
    color: '#2196F3',
  },
};

const iconStyles = {
  color: '#555',
  transition: 'color 0.3s',
  '&:hover': {
    color: '#2196F3',
  },
};
