import React, { useState } from 'react';
import {
  Container, TextField, Button, Box, Typography, Alert, Paper, Divider, MenuItem, Grid
} from '@mui/material';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    country: '',
    state: ''
  });
  const [error, setError] = useState('');

  const countries = [
    { label: 'United States', value: 'US' },
    { label: 'Canada', value: 'CA' },
    { label: 'India', value: 'IN' },
  ];

  const states = [
    { label: 'California', value: 'CA' },
    { label: 'Texas', value: 'TX' },
    { label: 'Ontario', value: 'ON' },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    alert(`Signing up with the following information:\n${JSON.stringify(formData, null, 2)}`);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f7f9fc',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          maxWidth: 500,
          width: '100%',
        }}
      >
        <Box textAlign="center" mb={2}>
          <Typography variant="h4" component="h1" color="primary" gutterBottom>
            Create an Account
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Please fill in the details to sign up
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSignUp} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="companyName"
                label="Company Name"
                name="companyName"
                autoComplete="organization"
                value={formData.companyName}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          <TextField
            margin="normal"
            fullWidth
            id="mobile"
            label="Mobile Number"
            name="mobile"
            type="tel"
            autoComplete="tel"
            value={formData.mobile}
            onChange={handleInputChange}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="country"
                select
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
              >
                {countries.map((country) => (
                  <MenuItem key={country.value} value={country.value}>
                    {country.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="state"
                select
                label="State/Province"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              >
                {states.map((state) => (
                  <MenuItem key={state.value} value={state.value}>
                    {state.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, padding: 1.5 }}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
