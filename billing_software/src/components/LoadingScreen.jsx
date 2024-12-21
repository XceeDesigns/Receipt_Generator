import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

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
        zIndex: 9999,  // Keeps the spinner on top of other elements
        flexDirection: 'column',  // Align the spinner and text vertically
      }}
    >
      <CircularProgress size={50} color="primary" sx={{ mb: 2 }} />
      <Typography 
        variant="body1" 
        color="textSecondary"
        sx={{
          fontWeight: 500,  // Slightly bolder text
          textAlign: 'center',
        }}
      >
        Please wait, processing your request...
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
