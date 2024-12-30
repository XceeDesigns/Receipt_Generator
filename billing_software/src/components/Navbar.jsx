import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // console.log("Logged out");
    localStorage.removeItem('token');
    navigate('/');
    setAnchorEl(null);
  };

  const handleReceiptHistory = () => {
    navigate('/receipt-history');
    setAnchorEl(null);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#333',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              letterSpacing: 1.2,
              fontSize: '1.25rem',
              color: '#fff',
            }}
          >
            Receipt Generator
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                sx={{ color: '#fff', marginLeft: '8px' }}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                  '& .MuiPaper-root': {
                    borderRadius: '8px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    padding: '8px 0',
                    minWidth: '220px',
                    marginTop: '50px',
                  },
                  '& .MuiMenuItem-root': {
                    fontSize: '0.9rem',
                    padding: '10px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  },
                }}
              >
                <MenuItem onClick={handleClose}>
                  <PersonIcon /> Profile
                </MenuItem>
                <MenuItem onClick={handleReceiptHistory}>
                  <ReceiptIcon /> Receipt History
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ color: '#d32f2f' }}>
                  <LogoutIcon /> Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

