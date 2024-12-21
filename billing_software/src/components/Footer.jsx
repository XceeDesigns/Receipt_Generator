import React from 'react';
import { Box, Container, Typography, Link, Divider, Stack } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#121212', // Dark background for a sleek appearance
        color: '#FFFFFF', // White text for high contrast
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Branding */}
          <Box textAlign={{ xs: 'center', sm: 'left' }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                fontSize: '1.2rem',
                color: '#90CAF9', // Highlighted brand color
              }}
            >
              XceeDesigns
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.9rem',
                color: '#B0BEC5', // Light gray for subtlety
              }}
            >
              Creating intuitive and modern web experiences.
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Stack
            direction="row"
            spacing={3}
            justifyContent="center"
            sx={{ mt: { xs: 2, sm: 0 } }}
          >
            <Link
              href="/privacy-policy"
              underline="hover"
              sx={{
                color: '#B0BEC5',
                fontSize: '0.9rem',
                '&:hover': { color: '#90CAF9' },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              underline="hover"
              sx={{
                color: '#B0BEC5',
                fontSize: '0.9rem',
                '&:hover': { color: '#90CAF9' },
              }}
            >
              Terms of Service
            </Link>
            <Link
              href="mailto:support@xceedesigns.com"
              underline="hover"
              sx={{
                color: '#B0BEC5',
                fontSize: '0.9rem',
                '&:hover': { color: '#90CAF9' },
              }}
            >
              Contact Us
            </Link>
          </Stack>
        </Stack>

        {/* Divider */}
        <Divider sx={{ my: 3, borderColor: '#333333' }} />

        {/* Footer Bottom */}
        <Typography
          variant="caption"
          display="block"
          textAlign="center"
          sx={{
            fontSize: '0.8rem',
            color: '#777777',
            letterSpacing: '0.5px',
          }}
        >
          © {new Date().getFullYear()} XceeDesigns. All Rights Reserved. | Built with React & Material UI
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
