import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Box, Typography, Alert, Paper, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { ReceiptHistoryContext } from '../context/ReceiptHistoryContext';
import toast from 'react-hot-toast';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { user, setUser } = useContext(UserContext);
  const { ReceiptHistory, setReceiptHistory } = useContext(ReceiptHistoryContext);

  const backend_url = process.env.REACT_APP_BACKEND_URL;

  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const response1 = await fetch(`${backend_url}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response1.ok) {
        setError('Failed to log in. Please check your credentials.');
        return;
      }

      const data1 = await response1.json();
      console.log(data1);
      localStorage.setItem('token', data1.authToken);
      toast.success('Logged in successfully');
      navigate('/choose');
      setUser(email);
      
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f7f9fc',
        background: 'linear-gradient(to bottom right, #1976d2, #ffffff)',
        px: { xs: 2, sm: 4, md: 8 },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          borderRadius: 2,
          width: '100%',
          maxWidth: { xs: '100%', sm: 400 },
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

          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Button
              color="primary"
              onClick={() => navigate('/signup')}
              sx={{ textTransform: 'capitalize', p: 0 }}
            >
              Register
            </Button>
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              fontSize: { xs: '0.875rem', sm: '1rem' },
            }}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
