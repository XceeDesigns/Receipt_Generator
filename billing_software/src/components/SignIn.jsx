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
  InputAdornment,
  IconButton,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { ReceiptHistoryContext } from '../context/ReceiptHistoryContext';
import { SubscriptionContext } from '../context/SubscriptionContext';
import toast from 'react-hot-toast';
import LoadingScreen from './LoadingScreen';
import { Send, Visibility, VisibilityOff } from '@mui/icons-material';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { subscription, setSubscription } = useContext(SubscriptionContext);
  const { user, setUser } = useContext(UserContext);
  const { ReceiptHistory, setReceiptHistory } = useContext(ReceiptHistoryContext);

  const backend_url = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  const checkDate = (date1, date2) => {
    console.log('Checking date:', date1, date2);
    const date1Array = date1.split('-');
    const date2Array = date2.split('-');
    console.log('Date 1:', date1Array);
    console.log('Date 2:', date2Array);

    if (date1Array[0] < date2Array[0]) {
      return false;
    } else if (date1Array[0] === date2Array[0]) {
      if (date1Array[1] < date2Array[1]) {
        return false;
      } else if (date1Array[1] === date2Array[1]) {
        if (date1Array[2] < date2Array[2]) {
          return false;
        }
      }
    }
    return true;
  };


  const handleSignIn = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    // Ensure both email and password are provided
    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      // Step 1: Attempt to log in with provided credentials
      const loginResponse = await fetch(`${backend_url}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!loginResponse.ok) {
        setError('Failed to log in. Please check your credentials.');
        setLoading(false);
        return;
      }

      const loginData = await loginResponse.json();
      localStorage.setItem('token', loginData.authToken);

      // Step 2: Attempt to fetch the user's subscription status, but don't block login
      let subscriptionData = null;
      try {
        const subscriptionResponse = await fetch(`${backend_url}/api/subscription/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (subscriptionResponse.ok) {
          subscriptionData = await subscriptionResponse.json();
          console.log('Subscription Data:', subscriptionData);
        } else {
          console.error('Failed to fetch subscription data');
        }
      } catch (subscriptionError) {
        console.error('Error fetching subscription data:', subscriptionError);
      }

      // Step 3: Check if the subscription has expired and update if needed
      if (subscriptionData !== null && subscriptionData.endData !== null && subscriptionData.subscriptionStatus !== 'Canceled') {
        console.log('Checking subscription status...');
        const today = new Date().toISOString().split('T')[0];
        console.log('chal')
        console.log(checkDate(subscriptionData.endDate.slice(0, 10), today));
        if (!checkDate(subscriptionData.endDate.slice(0, 10), today)) {
          // Step 4: If expired, update the subscription status
          console.log(subscriptionData);
          try {
            const updateSubscriptionResponse = await fetch(`${backend_url}/api/subscription/update`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
              body: JSON.stringify({
                subscriptionStatus: 'Canceled',
                user: subscriptionData.user,
                _id: subscriptionData._id,
                subscriptionType: subscriptionData.subscriptionType,
                startDate: subscriptionData.startDate,
                endDate: subscriptionData.endDate,
              }),
            });

            if (updateSubscriptionResponse.ok) {
              const updateSubscriptionData = await updateSubscriptionResponse.json();
              console.log('Subscription Updated:', updateSubscriptionData);
            } else {
              console.error('Failed to update subscription status');
            }
          } catch (updateError) {
            console.error('Error updating subscription:', updateError);
          }
        }
      }

      // Step 5: On successful login, navigate to the dashboard
      toast.success('Logged in successfully');
      setLoading(false);
      navigate('/dashboard');
      setUser(email);

    } catch (err) {
      // Handle any errors during the login process
      setLoading(false);
      setError('An error occurred. Please try again later.');
    }
  };



  return (
    <Container
      maxWidth="false"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        px: 2,
        background: 'linear-gradient(to bottom right, #1E3A8A, #ffffff)',
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
          >
            Welcome Back 👋
          </Typography>
          <Typography variant="body2" color="#5A6A85">
            Sign in to your account to continue
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
            type="email"
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
            type={showPassword ? 'text' : 'password'}
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
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
              sx={{ textTransform: 'none', p: 0, color: '#1e1e2f' }}
            >
              Register
            </Button>
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            endIcon={loading ? <CircularProgress size={20} /> : <Send />}
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 'bold',
              backgroundColor: '#1e1e2f',
              color: '#fff',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#3a3a4c',
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
