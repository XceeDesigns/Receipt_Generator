import React, { useState } from 'react';
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
  LinearProgress,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingScreen from './LoadingScreen';

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

  const handleOtpModalClose = () => setIsOtpModalOpen(false);

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
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again later.');
      setLoading(false);
    }
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

      if (!response.ok) {
        setError('Invalid OTP. Please try again.');
        toast.error('Invalid OTP.');
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
                p: 4,
              }}
            >
              <Typography variant="h5" fontWeight="bold" mb={2} color="primary">
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
              <Button variant="contained" color="primary" fullWidth onClick={handleValidate}>
                Verify OTP
              </Button>
            </Box>
          </Modal>

          {/* Sign-Up Form */}
          <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, maxWidth: 500, width: '100%' }}>
            <Typography variant="h4" textAlign="center" fontWeight="bold" color="#2C3E50" mb={1}>
              Create an Account
            </Typography>
            <Typography variant="body2" color="#5A6A85" textAlign="center">
              Join the family of OrnaCloud
            </Typography>
            <Divider sx={{ my: 2 }} />
            {error && <Alert severity="error">{error}</Alert>}

            <Box component="form" onSubmit={handleOtpModalOpen} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}><TextField label="Full Name" name="name" fullWidth required onChange={handleInputChange} /></Grid>
                <Grid item xs={12}><TextField label="Company Name" name="companyName" fullWidth onChange={handleInputChange} /></Grid>
                <Grid item xs={12}><TextField label="Email" name="email" fullWidth required onChange={handleInputChange} /></Grid>
                <Grid item xs={6}><TextField label="Password" name="password" type="password" fullWidth required onChange={handleInputChange} /></Grid>
                <Grid item xs={6}><TextField label="Confirm Password" name="confirmPassword" type="password" fullWidth required onChange={handleInputChange} /></Grid>
                <Grid item xs={12}><TextField label="Mobile Number" name="mobileNumber" fullWidth required onChange={handleInputChange} /></Grid>
                <Grid item xs={6}><TextField select label="Country" name="country" fullWidth onChange={handleInputChange}>{countries.map((c) => (<MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>))}</TextField></Grid>
                <Grid item xs={6}><TextField select label="State" name="state" fullWidth onChange={handleInputChange}>{states.map((s) => (<MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>))}</TextField></Grid>
              </Grid>

              <Button variant="contained" color="primary" fullWidth type="submit" sx={{
                mt: 3, mb: 2,
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
