import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#333',
        color: '#fff',
        textAlign: 'center',
        padding: '16px',
        marginTop: '0px',
      }}
    >
      <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} All rights reserved by{' '}
        <Link
          href="https://www.xceedesigns.com"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          sx={{ color: '#90caf9', fontWeight: 'bold' }}
        >
          XceeDesigns
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
