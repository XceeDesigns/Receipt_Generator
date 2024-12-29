import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Paper,
  Divider,
  MenuItem,
  Grid,
  InputAdornment,
  IconButton
} from '@mui/material';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingScreen from './LoadingScreen';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// Password Strength Utility
const getPasswordStrength = (password) => {
  if (password.length > 8 && /[A-Z]/.test(password) && /\d/.test(password)) return 'Strong';
  if (password.length >= 6) return 'Medium';
  return 'Weak';
};

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    country: '',
    state: '',
  });
  const [passwordStrength, setPasswordStrength] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [remainingTime, setRemainingTime] = useState(300); // 5 minutes in seconds

  const backend_url = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  const countries = [
    { label: 'India', value: 'India' },
  ];

  const states = [
    { label: 'Uttar Pradesh', value: 'Uttar Pradesh' },
    { label: 'Uttarakhand', value: 'Uttarakhand' },
    { label: 'Karnataka', value: 'Karnataka' },
  ];

  const handleOtpModalClose = () => {
    setIsOtpModalOpen(false);
    setRemainingTime(300); // Reset the timer when the modal is closed
  };

  const handleOtpModalOpen = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const otpResponse = await fetch(`${backend_url}/api/user/signup/generate-otp?email=${formData.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!otpResponse.ok) {
        setError('Failed to generate OTP.');
        setLoading(false);
        return;
      }

      toast.success('OTP has been sent to your email.');
      setIsOtpModalOpen(true);
      setLoading(false);
      setRemainingTime(300); // Reset the timer when the modal is opened
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOtpModalOpen && remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup on component unmount or modal close
    }
  }, [isOtpModalOpen, remainingTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === 'password') {
      setPasswordStrength(getPasswordStrength(value));
    }
  };

  const handleValidate = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${backend_url}/api/user/signup/validate-otp?email=${formData.email}&otp=${otp}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const otpdata = await response.json();
      if (otpdata.status === 408) {
        setError('Invalid OTP. Please try again.');
        toast.error('Invalid OTP.');
        setLoading(false);
        return;
      }

      const res = await fetch(`${backend_url}/api/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        setError('Failed to create account.');
        return;
      }

      const data = await res.json();
      toast.success(data.message || 'Account created successfully!');
      navigate('/');

      setIsOtpModalOpen(false);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError('An error occurred while verifying OTP.');
    }
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Container
          maxWidth="false"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(to bottom right, #1E3A8A, #ffffff)',
          }}
        >
          {/* OTP Modal */}
          <Modal open={isOtpModalOpen} onClose={handleOtpModalClose}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 24,
                p: 3,
              }}
            >
              <Typography variant="h5" fontWeight="bold" mb={1} color="#2C3E50" textAlign="center">
                Verify Your OTP
              </Typography>
              <TextField
                label="Enter OTP"
                variant="outlined"
                fullWidth
                value={otp}
                onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                inputProps={{ maxLength: 6 }}
                sx={{ mb: 2 }}
              />
              <Typography
                variant="body2"
                color="black"
                sx={{ mb: 1, textAlign: 'center', fontWeight: 'bold' }}
              >
                OTP will expire in {formatTime(remainingTime)}
              </Typography>
              {remainingTime === 0 && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ mt: 0,mb: 2, textAlign: 'center' }}
                >
                  OTP has expired. Please request a new one.
                </Typography>
              )}
              <Button variant="contained" color="primary" fullWidth onClick={handleValidate}>
                Verify OTP
              </Button>
            </Box>
          </Modal>

          {/* Sign-Up Form */}
          <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, maxWidth: 500, width: '100%' }}>
            <Typography variant="h4" textAlign="center" fontWeight="bold" color="#2C3E50" mb={0}>
              Create an Account
            </Typography>
            <Typography variant="body2" color="#5A6A85" textAlign="center">
              Join the family of OrnaCloud
            </Typography>
            <Divider sx={{ mt: 1, mb: 2 }} />
            {error && <Alert severity="error">{error}</Alert>}

            <Box component="form" onSubmit={handleOtpModalOpen} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}><TextField label="Full Name" name="name" type='text' fullWidth required onChange={handleInputChange} /></Grid>
                <Grid item xs={12}><TextField label="Company Name" name="companyName" type='text' fullWidth onChange={handleInputChange} /></Grid>
                <Grid item xs={12}><TextField label="Email" name="email" type='email' fullWidth required onChange={handleInputChange} /></Grid>
                <Grid item xs={6}><TextField label="Password" name="password" type={showPassword ? 'text' : 'password'} fullWidth required onChange={handleInputChange}
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
                /></Grid>
                <Grid item xs={6}><TextField label="Confirm Password" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} fullWidth required onChange={handleInputChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                /></Grid>
                <Grid item xs={12}><TextField label="Mobile Number" name="mobileNumber" type='tel' fullWidth required onChange={handleInputChange} /></Grid>
                <Grid item xs={6}><TextField select label="Country" name="country" type='text' fullWidth onChange={handleInputChange}>{countries.map((c) => (<MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>))}</TextField></Grid>
                <Grid item xs={6}><TextField select label="State" name="state" type='text' fullWidth onChange={handleInputChange}>{states.map((s) => (<MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>))}</TextField></Grid>
              </Grid>

              <Typography
                variant="body2"
                sx={{ mt: 2, textAlign: 'center', color: '#5A6A85' }}
              >
                Already have an account?{''}
                <Button
                  color="primary"
                  onClick={() => navigate('/')}
                  sx={{ textTransform: 'none', p: 0 }}
                >
                  Log In
                </Button>
              </Typography>

              <Button variant="contained" color="primary" fullWidth type="submit" sx={{
                mt: 1, mb: 1,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 'bold',
                backgroundColor: '#1976D2',
                color: '#fff',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#145DA0',
                },
              }}>
                Sign Up
              </Button>
            </Box>
          </Paper>
        </Container>
      )}
    </>
  );
}
