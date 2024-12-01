import React from 'react';
import {
    Container,
    Box,
    Typography,
    Grid,
    Paper,
    Avatar,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const categories = [
    {
        title: 'General Receipt',
        description: 'Create detailed receipts for any transaction quickly and easily.',
        icon: <ReceiptLongIcon />,
        color: '#1976d2',
        link: '/dashboard/general',
    },
    {
        title: 'Rough Estimate',
        description: 'Draft an estimate for your future transactions in seconds.',
        icon: <ReceiptIcon />,
        color: '#fbc02d',
        link: '/dashboard/estimate',
    },
    // Add more categories here in the future
];

const Choice = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Navbar />
            <Box
                sx={{
                    background: 'linear-gradient(to bottom right, #1976d2, #ffffff)',
                    minHeight: '85vh',
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* Hero Section */}
                <Container
                    maxWidth="md"
                    sx={{
                        textAlign: 'center',
                        color: '#ffffff',
                        marginBottom: 4,
                    }}
                >
                    <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: 'black' }}>
                        Welcome Back!
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.8, color: 'black' }}>
                        Get started with creating receipts or drafting estimates effortlessly. Explore our tools to make your workflow seamless.
                    </Typography>
                </Container>

                {/* Category Section */}
                <Container maxWidth="lg">
                    <Grid container spacing={4} justifyContent="center">
                        {categories.map((category, index) => (
                            <Grid key={index} item xs={12} sm={6} md={4}>
                                <Paper
                                    elevation={4}
                                    sx={{
                                        padding: 3,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        borderRadius: 3,
                                        textAlign: 'center',
                                        height: '100%',
                                        backgroundColor: '#ffffff',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: 6,
                                        },
                                    }}
                                    onClick={() => navigate(category.link)}
                                >
                                    <Avatar
                                        sx={{
                                            bgcolor: category.color,
                                            marginBottom: 2,
                                            width: 64,
                                            height: 64,
                                        }}
                                    >
                                        {category.icon}
                                    </Avatar>
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        gutterBottom
                                        sx={{ color: '#424242' }}
                                    >
                                        {category.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {category.description}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default Choice;