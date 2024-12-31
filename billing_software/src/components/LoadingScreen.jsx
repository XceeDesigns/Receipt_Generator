import React from 'react';
import { CircularProgress, Box, Typography, Paper } from '@mui/material';

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1301, // Ensures visibility above most elements
      }}
    >
      <Paper
        elevation={2}
        sx={{
          padding: 3,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'none'
        }}
      >
        <CircularProgress 
          size={50} 
          color="#1e1e2f" 
          sx={{ mb: 2 }} 
        />
        <Typography 
          variant="h6" 
          sx={{
            fontWeight: 600,
            color: '#1e1e2f',
            textAlign: 'center',
            mb: 1,
          }}
        >
          Loading, please wait...
        </Typography>
        <Typography 
          variant="body2" 
          color="textSecondary" 
          sx={{
            textAlign: 'center',
          }}
        >
          We're processing your request.
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoadingScreen;
