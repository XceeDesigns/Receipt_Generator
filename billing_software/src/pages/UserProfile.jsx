import React from 'react';
import {
    Container,
    Box,
    Typography,
    Grid,
    Avatar,
    Paper,
    Button,
    Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

const UserProfile = () => {
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
                            XceeDesigns
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Ghaziabad, India
                        </Typography>
                        <Button
                            variant="outlined"
                            startIcon={
                                <EditIcon
                                    sx={{
                                        color: '#1e1e2f',
                                        '&:hover': {
                                            color: '#ffffff', // Changes icon color to white on hover
                                        },
                                    }}
                                />
                            }
                            sx={{
                                mt: 2,
                                size: 'small',
                                borderColor: '#1e1e2f',
                                color: '#1e1e2f',
                                '&:hover': {
                                    borderColor: '#1e1e2f',
                                    backgroundColor: '#1e1e2f',
                                    color: '#ffffff', // Changes text color to white on hover
                                    '& .MuiSvgIcon-root': {
                                        color: '#ffffff', // Applies hover effect to the icon
                                    },
                                },
                            }}
                        >
                            Edit Profile
                        </Button>
                    </Box>
                </Box>

                <Divider sx={{ mb: 4 }} />

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
                                <strong>Email:</strong> john.doe@example.com
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Phone:</strong> +1 123-456-7890
                            </Typography>
                            <Typography variant="body2">
                                <strong>Location:</strong> San Francisco, CA
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
                                <strong>Name:</strong> johndoe
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>Member Since:</strong> January 2020
                            </Typography>
                            <Typography variant="body2">
                                <strong>Subscription:</strong> Freemium
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
                            >
                                Update
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default UserProfile;
