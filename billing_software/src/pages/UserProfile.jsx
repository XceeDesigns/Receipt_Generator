import React, { useEffect, useState } from 'react';
import {
    Container,
    Box,
    Typography,
    Grid,
    Avatar,
    Paper,
    Button,
    Divider,
    Modal,
    TextField,
    InputAdornment,
    IconButton,
    CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Send, Visibility, VisibilityOff } from '@mui/icons-material';

const UserProfile = () => {
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState({});
    const [subscriptionData, setSubscriptionData] = useState({});
    const [openPasswordModal, setOpenPasswordModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        _id: '',
        user: '',
    });
    const [request, setRequest] = useState({
        user: '',
        _id: '',
        currentPassword: '',
        newPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const navigate = useNavigate();

    const handleOpen = () => setOpen(true);
    const handleOpenPasswordModal = () => setOpenPasswordModal(true);
    const handleClosePasswordModal = () => setOpenPasswordModal(false);
    const handleClose = () => {
        setOpen(false)
    };


    const backend_url = process.env.REACT_APP_BACKEND_URL;

    const handleChangePassword = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        // Update user data to API
        const response = await fetch(`${backend_url}/api/user/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (response.ok) {
            toast.success(data.message || 'Profile updated successfully!');
            handleClose();
        }
        else {
            toast.error(data.message || 'Failed to update profile.');
        }
        setLoading(false);
    }


    const fetchUserData = async () => {

        const token = localStorage.getItem('token');
        // Fetch user data from API
        const response = await fetch(`${backend_url}/api/user/fetch`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        setUserData(data);
        console.log(data);
    }

    const fetchSubscriptionData = async () => {
        const token = localStorage.getItem('token');
        // Fetch subscription data from API
        const response = await fetch(`${backend_url}/api/subscription/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setSubscriptionData(data);
        console.log(data);
    }

    const handlePasswordUpdate = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        // Update password to API
        console.log(userData._id);
        console.log(password);
        request.user = token.sub;
        request._id = userData._id;
        request.currentPassword = password.currentPassword;
        request.newPassword = password.newPassword;
        if (password.newPassword !== password.confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        console.log(request);
        const response = await fetch(`${backend_url}/api/user/update-password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(request),
        });
        const data = await response.json();

        if (response.ok) {
            toast.success(data.message || 'Password updated successfully!');
            handleClosePasswordModal();
            request.currentPassword = '';
            request.newPassword = '';
            request._id = '';
            request.user = '';
        }
        else {
            toast.error(data.message || 'Failed to update password.');
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchUserData();
        fetchSubscriptionData();
    }, []);


    return (
        <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
            <Box>
                {/* Profile Header */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        gap: 3,
                        mb: 4,
                    }}
                >
                    <Avatar
                        sx={{
                            width: 120,
                            height: 120,
                            border: '3px solid #1e1e2f',
                            backgroundColor: '#f5f5f5',
                            color: '#1e1e2f',
                            fontSize: 48,
                        }}
                    >
                        <PermIdentityOutlinedIcon sx={{ fontSize: 'inherit' }} />
                    </Avatar>
                    <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 'bold',
                                mb: 1,
                                color: 'text.primary',
                            }}
                        >
                            {userData.companyName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {`${userData.state}, ${userData.country}`}
                        </Typography>
                        <Button
                            variant="outlined"
                            startIcon={<EditIcon />}
                            onClick={handleOpen}
                            sx={{
                                mt: 2,
                                size: 'small',
                                borderColor: '#1e1e2f',
                                color: '#1e1e2f',
                                '&:hover': {
                                    borderColor: '#1e1e2f',
                                    backgroundColor: '#1e1e2f',
                                    color: '#ffffff',
                                },
                            }}
                        >
                            Edit Profile
                        </Button>
                    </Box>
                </Box>

                <Divider sx={{ mb: 4 }} />

                {/* Modal for Editing Profile */}
                <Modal open={open} onClose={handleClose}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 2 }} fontWeight="bold">
                            Edit Profile
                        </Typography>
                        <TextField
                            fullWidth
                            label="Name"
                            type='text'
                            sx={{ mb: 2 }}
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Company Name"
                            type='text'
                            sx={{ mb: 2 }}
                            value={userData.companyName}
                            onChange={(e) => setUserData({ ...userData, companyName: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Mobile Number"
                            type='tel'
                            sx={{ mb: 2 }}
                            value={userData.mobileNumber}
                            onChange={(e) => setUserData({ ...userData, mobileNumber: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="State"
                            type='text'
                            sx={{ mb: 2 }}
                            value={userData.state}
                            onChange={(e) => setUserData({ ...userData, state: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Country"
                            type='text'
                            sx={{ mb: 2 }}
                            value={userData.country}
                            onChange={(e) => setUserData({ ...userData, country: e.target.value })}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={handleClose}
                                sx={{
                                    borderColor: '#1e1e2f',
                                    color: '#1e1e2f',
                                    '&:hover': {
                                        borderColor: '#1e1e2f',
                                        backgroundColor: '#1e1e2f',
                                        color: '#ffffff',
                                    },
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                endIcon={loading ? <CircularProgress size={20} /> : <Send />}
                                disabled={loading}
                                sx={{
                                    backgroundColor: '#1e1e2f',
                                    '&:hover': {
                                        backgroundColor: '#3a3a4f',
                                    },
                                }}
                                onClick={handleUpdateProfile}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    </Box>
                </Modal>

                <Modal open={openPasswordModal} onClose={handleClosePasswordModal}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 2 }} fontWeight="bold">
                            Update Password
                        </Typography>
                        <TextField
                            fullWidth
                            label="Current Password"
                            type={showPassword ? 'text' : 'password'}
                            sx={{ mb: 2 }}
                            value={password.currentPassword}
                            onChange={(e) => setPassword({ ...password, currentPassword: e.target.value })}
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
                        <TextField
                            fullWidth
                            label="New Password"
                            type={showNewPassword ? 'text' : 'password'}
                            sx={{ mb: 2 }}
                            value={password.newPassword}
                            onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            edge="end"
                                            aria-label="toggle password visibility"
                                        >
                                            {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Confirm New Password"
                            type='password'
                            sx={{ mb: 2 }}
                            value={password.confirmPassword}
                            onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={handleClosePasswordModal}
                                sx={{
                                    borderColor: '#1e1e2f',
                                    color: '#1e1e2f',
                                    '&:hover': {
                                        borderColor: '#1e1e2f',
                                        backgroundColor: '#1e1e2f',
                                        color: '#ffffff',
                                    },
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                endIcon={loading ? <CircularProgress size={20} /> : <Send />}
                                disabled={loading}
                                sx={{
                                    backgroundColor: '#1e1e2f',
                                    '&:hover': {
                                        backgroundColor: '#3a3a4f',
                                    },
                                }}
                                onClick={handlePasswordUpdate}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    </Box>
                </Modal>

                {/* Profile Details */}
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} sx={{ textAlign: { sm: 'left', xs: 'center' } }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'medium',
                                mb: 2,
                                color: 'text.primary',
                            }}
                        >
                            Contact Information
                        </Typography>
                        <Box>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Email:</strong> {userData.email}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Phone:</strong> {userData.mobileNumber}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Location:</strong> {`${userData.state}, ${userData.country}`}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ textAlign: { sm: 'left', xs: 'center' } }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'medium',
                                mb: 2,
                                color: 'text.primary',
                            }}
                        >
                            Account Details
                        </Typography>
                        <Box>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Name:</strong> {userData.name}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Subscription Expiry:</strong> {subscriptionData.endDate == null ? 'N/A' : subscriptionData.endDate.slice(0, 10)}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Subscription & Status:</strong> {subscriptionData.subscriptionType == null ? `Freemium (${subscriptionData.subscriptionStatus})` : `${subscriptionData.subscriptionType} (${subscriptionData.subscriptionStatus})`}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                {/* Settings Section */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'medium',
                        mb: 2,
                        color: 'text.primary',
                        textAlign: { xs: 'center', sm: 'left' },
                    }}
                >
                    Settings
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Paper
                            elevation={2}
                            sx={{
                                p: 3,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                borderRadius: 2,
                            }}
                        >
                            <LockIcon sx={{ color: '#1e1e2f' }} />
                            <Box>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    Change Password
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Update your account password.
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                size="small"
                                sx={{
                                    backgroundColor: '#1e1e2f',
                                    '&:hover': {
                                        backgroundColor: '#3a3a4f',
                                    },
                                }}
                                onClick={handleOpenPasswordModal}
                            >
                                Update
                            </Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper
                            elevation={2}
                            sx={{
                                p: 3,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                borderRadius: 2,
                            }}
                        >
                            <SecurityIcon sx={{ color: '#1e1e2f' }} />
                            <Box>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    Subscription
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Manage your Subscription Plan.
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                size="small"
                                sx={{
                                    backgroundColor: '#1e1e2f',
                                    '&:hover': {
                                        backgroundColor: '#3a3a4f',
                                    },
                                }}
                                onClick={() => navigate('/dashboard/subscription')}
                            >
                                Renew
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default UserProfile;
