import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Badge
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';

const Subscription = () => {
    const plans = [
        {
            title: 'Beginner Plan',
            subtitle: 'Best for Small Organizations starting out',
            price: 'Rs. 0',
            features: ['Manual Rough Receipt', 'Receipt History', 'Limited Access'],
        },
        {
            title: 'Explorer Plan (Lite)',
            subtitle: 'Best for Organizations growing rapidly',
            price: 'Rs. 9',
            features: ['All Free Features', 'GST Receipt', 'Limited Storage', 'Email Support'],
        },
        {
            title: 'Expert Plan (Pro)',
            subtitle: 'Best for Medium & Large Scale Organizations',
            price: 'Rs. 49',
            features: ['All Lite Features & Dashboard Access', 'Inventory Management', 'Unlimited Storage', 'Priority Email Support'],
        },
    ];

    const navigate = useNavigate();

    return (
        <Container
            maxWidth="lg"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 4,
                mb: 4,
            }}
        >
            <Typography variant="h4" fontWeight="bold" gutterBottom color='#1e1e2f'>
                Choose Your Subscription Plan
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
                Select a plan that suits your needs and enjoy exclusive features.
            </Typography>
            <Grid container spacing={4} sx={{ mt: 3 }}>
                {plans.map((plan, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                boxShadow: 3,
                                borderRadius: 2,
                                textAlign: 'center',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                padding: 2,
                                position: 'relative',
                            }}
                        >
                            {plan.title === 'Expert Plan (Pro)' && (
                                <Badge
                                    badgeContent="Recommended"
                                    color="primary"
                                    sx={{
                                        position: 'absolute',
                                        top: 20,
                                        right: 70,
                                        '& .MuiBadge-badge': {
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold',
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: '12px',
                                            backgroundColor: '#FF5722',
                                            color: 'white',
                                        },
                                    }}
                                />
                            )}
                            <CardContent>
                                <Typography variant="h5" fontWeight="bold" color="#2C3E50" sx={{ mt: 1 }}>
                                    {plan.title}
                                </Typography>
                                <Typography variant="subtitle2" color="grey">
                                    {plan.subtitle}
                                </Typography>
                                <Typography variant="h4" fontWeight="bold" fontFamily="cursive" sx={{ mt: 2, display: 'flex', flexdirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    {plan.price}
                                    <Typography
                                        component="span"
                                        variant="subtitle1"
                                        sx={{ fontWeight: 'regular', color: 'textSecondary', fontSize: '1rem', marginLeft: 1 }}
                                    >
                                        per month
                                    </Typography>
                                </Typography>
                                <Box
                                    sx={{
                                        mt: 4,
                                        mb: 2,
                                        textAlign: 'left',
                                    }}
                                >
                                    {plan.features.map((feature, i) => (
                                        <Typography
                                            key={i}
                                            variant="body2"
                                            sx={{ mt: 1, color: 'textSecondary' }}
                                        >
                                            <VerifiedIcon fontSize='inherit' /> {feature}
                                        </Typography>
                                    ))}
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        borderRadius: 2,
                                        backgroundColor: '#2C3E50',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#1A2536', // Darker shade for hover effect
                                        }
                                    }}
                                    onClick={plan.title === 'Beginner Plan' ? () => navigate('/dashboard/user-profile') : () => navigate('/dashboard/subscription')}
                                >
                                    {plan.title === 'Beginner Plan' ? 'Get Started' : 'Upgrade'}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Subscription;
