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
} from '@mui/material';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import LoadingScreen from './LoadingScreen';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    password: '',
    mobileNumber: '',
    country: '',
    state: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [otp, setOtp] = useState('');
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState('');

  const backend_url = process.env.REACT_APP_BACKEND_URL;

  const navigate = useNavigate();

  const countries = [
    { label: 'India', value: 'IN' },
    { label: 'United States', value: 'US' },
    { label: 'Australia', value: 'AU' },
  ];

  const states = [
    { label: 'Uttar Pradesh', value: 'UP' },
    { label: 'Uttarakhand', value: 'UK' },
    { label: 'Karnataka', value: 'KA' },
  ];

  const handleOtpModalClose = () => {
    setIsOtpModalOpen(false);
  };

  const handleOtpModalOpen = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!formData.name || !formData.email || !formData.password || !confirmPassword) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    if (formData.password !== confirmPassword) {
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
      setEmailForOtp(formData.email);
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
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
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

      const otpData = await response.json();
      console.log(otpData);

      if(otpData.status === 408){
        setError('OTP expired. Please try again.');
        toast.error('OTP expired.');
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
      console.log(data);

      toast.success(data.message || data.msg);

      navigate('/');

      setIsOtpModalOpen(false);
      setLoading(false);

    } catch (err) {
      console.error(err);
      setLoading(false);
      setError('An error occurred while verifying OTP.');
    }
  }

  return (
    <>
      {(
        <Container
          maxWidth="false"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#f7f9fc',
            px: { xs: 2, sm: 4 },
            background: 'linear-gradient(to bottom right, #1976d2, #ffffff)',
          }}
          disableGutters
        >
          {/* OTP Input Modal */}
          {loading ? <LoadingScreen /> : (
            <Modal open={isOtpModalOpen} onClose={() => setIsOtpModalOpen(false)}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '90%',
                  maxWidth: 400,
                  bgcolor: 'background.paper',
                  borderRadius: '8px',
                  boxShadow: 24,
                  p: 4,
                  textAlign: 'center',
                }}
              >
                {/* Modal Title */}
                <Typography variant="h5" fontWeight="bold" mb={2} color="primary">
                  Verify Your OTP
                </Typography>

                {/* Instructions */}
                <Typography variant="body2" color="textSecondary" mb={3}>
                  Enter the 6-digit OTP sent to your email.
                </Typography>

                {/* Single Input Field for OTP */}
                <TextField
                  label="Enter OTP"
                  variant="outlined"
                  fullWidth
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} // Allow only 6 digits
                  inputProps={{
                    maxLength: 6,
                    style: { textAlign: 'center', letterSpacing: '2px', fontSize: '1.2rem' },
                  }}
                />

                {/* Verify Button */}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3 }}
                  onClick={handleValidate}
                >
                  Verify OTP
                </Button>
              </Box>
            </Modal>
          )};
          {loading ? <LoadingScreen /> :<Paper
            elevation={3}
            sx={{
              padding: { xs: 2, sm: 4 },
              borderRadius: 2,
              maxWidth: { xs: 340, sm: 500 },
              width: '100%',
              my: { xs: 3, sm: 5 },
            }}
          >
            <Box textAlign="center" mb={2}>
              <Typography
                variant="h4"
                component="h1"
                color="primary"
                gutterBottom
                sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
              >
                Create an Account
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
              >
                Please fill in the details to sign up
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {<Box component="form" onSubmit={handleOtpModalOpen} noValidate>
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
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </Grid>
              </Grid>

              <TextField
                required
                margin="normal"
                fullWidth
                id="mobileNumber"
                label="Mobile Number"
                name="mobileNumber"
                type="tel"
                autoComplete="tel"
                value={formData.mobileNumber}
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

              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mt: 2, textAlign: 'center' }}
              >
                Have an account?{' '}
                <Button color="primary" onClick={() => navigate('/')} sx={{ textTransform: 'capitalize' }}>
                  Login
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
                  padding: { xs: 1, sm: 1.5 },
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                }}
              >
                Sign Up
              </Button>
            </Box>}
          </Paper>}
        </Container>
      )}
    </>
  );
}
