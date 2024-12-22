import React, { useState, useContext } from 'react';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Paper,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { ReceiptHistoryContext } from '../context/ReceiptHistoryContext';
import toast from 'react-hot-toast';
import LoadingScreen from './LoadingScreen';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      localStorage.setItem('token', data1.authToken);
      toast.success('Logged in successfully');
      navigate('/main-dashboard');
      setUser(email);
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return loading ? (
    <LoadingScreen />
  ) : (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 3,
          width: '100%',
          maxWidth: 480,
          background: '#FFFFFF',
          border: '1px solid #E0E4EA',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box textAlign="center" mb={3}>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            color="#2C3E50"
            gutterBottom
          >
            Welcome Back 👋
          </Typography>
          <Typography variant="body2" color="#5A6A85">
            Sign in to your account to continue.
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
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#D1D9E6' },
                '&:hover fieldset': { borderColor: '#1976D2' },
                '&.Mui-focused fieldset': { borderColor: '#1976D2' },
              },
            }}
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
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#D1D9E6' },
                '&:hover fieldset': { borderColor: '#1976D2' },
                '&.Mui-focused fieldset': { borderColor: '#1976D2' },
              },
            }}
          />

          <Typography
            variant="body2"
            sx={{ mt: 2, textAlign: 'center', color: '#5A6A85' }}
          >
            Don't have an account?{' '}
            <Button
              color="primary"
              onClick={() => navigate('/signup')}
              sx={{ textTransform: 'none', p: 0 }}
            >
              Register
            </Button>
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 'bold',
              backgroundColor: '#1976D2',
              color: '#fff',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#145DA0',
              },
            }}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
