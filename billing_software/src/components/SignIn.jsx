import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Alert, Paper, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous error message

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    const response = await fetch('http://localhost:8080/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      alert('Failed login');
      return;
    }

    const data = await response.json();
    console.log(data);

    localStorage.setItem('token', data.authToken);

    navigate('/dashboard');
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '97vh',
        backgroundColor: '#f7f9fc',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          borderRadius: 2,
          maxWidth: 400,
          width: '100%',
        }}
      >
        <Box textAlign="center" mb={2}>
          <Typography variant="h4" component="h1" color="primary" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Please sign in to continue
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Display error if validation fails */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSignIn} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Don't have an account?{' '}
            <Button color="primary" onClick={() => navigate('/signup')} >
              Sign Up
            </Button>
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, padding: 1.5 }}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
