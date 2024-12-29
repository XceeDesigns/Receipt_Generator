import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Badge,
    MenuItem,
    FormControl,
    Select,
    InputLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import { jwtDecode } from 'jwt-decode';
import { useRazorpay } from "react-razorpay";

const Subscription = () => {

    const backend_url = process.env.REACT_APP_BACKEND_URL;
    const { Razorpay } = useRazorpay();

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

    const [liteDuration, setLiteDuration] = useState('');
    const [proDuration, setProDuration] = useState('');
    const [user, setUser] = useState({});
    const [status, setStatus] = useState({});

    const startSubscription = async () => {
        console.log('Starting subscription');
        const addSubscription = await fetch(`${backend_url}/api/subscription/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                subscriptionType: 'Free',
                subscriptionStatus: 'Active',
                user: jwtDecode(localStorage.getItem('token')).sub,
                startDate: new Date(),
                endDate: new Date(),
            }),
        });
        const data = await addSubscription.json();
        console.log(data);
        setUser(data);
        navigate('/dashboard/user-profile');
    };

    const fetchStatus = async () => {
        try {
            const response = await fetch(`${backend_url}/api/subscription/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            console.log(data);
            setStatus(data);
        } catch (error) {
            console.log('Error fetching subscription status');
        }
    };

    const fetchUser = async () => {
        try {
            const response = await fetch(`${backend_url}/api/user/fetch`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log('Error fetching user data');
        }
    };

    useEffect(() => {
        fetchUser();
        fetchStatus();
    }, []);

    const handleLiteSubscription = async () => {
        console.log('Lite Plan Duration:', liteDuration);
        const amount = liteDuration === '1month' ? 9 : liteDuration === '3month' ? 27 : liteDuration === '6month' ? 54 : 108;
        const response = await fetch(`${backend_url}/api/payment/createOrder?amount=${amount}`
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );
        const order = await response.json();
        console.log(order);
        var options = {
            "key_id": "rzp_test_6WAqYcpc5WOf2p", // Replace with your Razorpay Key ID
            "amount": order.amount, // Amount in paise
            "currency": order.currency,
            "name": "XceeDesigns",
            "description": "Test Transaction",
            "order_id": order.id, // Pass the order ID received from backend
            "handler": async function (response) {
                console.log("Payment ID: ", response.razorpay_payment_id);
                console.log("Order ID: ", response.razorpay_order_id);
                console.log("Signature: ", response.razorpay_signature);

                // const endDate = new Date().setMonth(new Date().getMonth() + (liteDuration === '1month' ? 1 : liteDuration === '3month' ? 3 : liteDuration === '6month' ? 6 : 12));
                try {
                    console.log(status._id);
                    const endDate = () => {
                        const date = new Date();
                        if (liteDuration === '1month') {
                            return date.setMonth(date.getMonth() + 1);
                        } else if (liteDuration === '3month') {
                            return date.setMonth(date.getMonth() + 3);
                        } else if (liteDuration === '6month') {
                            return date.setMonth(date.getMonth() + 6);
                        } else {
                            return date.setMonth(date.getMonth() + 12);
                        }
                    }
                    const updateSubscription = await fetch(`${backend_url}/api/subscription/update`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                        body: JSON.stringify({
                            subscriptionType: 'Lite',
                            subscriptionStatus: 'Active',
                            _id: status._id,
                            user: jwtDecode(localStorage.getItem('token')).sub,
                            startDate: new Date(),
                            endDate: endDate(),
                        }),
                    });
                    const data = await updateSubscription.json();
                    console.log("Update Subscription:", data);
                    alert('Payment successful and subscription updated!');
                } catch (error) {
                    console.log('Error updating subscription');
                }
            },
            "prefill": {
                "name": user.name,
                "email": user.email
            }
        };

        var rzp1 = new Razorpay(options);
        rzp1.open();
    };

    const handleProSubscription = async () => {
        console.log('Pro Plan Duration:', proDuration);
        const amount = proDuration === '1month' ? 49 : proDuration === '3month' ? 147 : proDuration === '6month' ? 294 : 588;
        const response = await fetch(`${backend_url}/api/payment/createOrder?amount=${amount}`
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );
        const order = await response.json();
        console.log(order);
        var options = {
            "key_id": "rzp_test_6WAqYcpc5WOf2p", // Replace with your Razorpay Key ID
            "amount": order.amount, // Amount in paise
            "currency": order.currency,
            "name": "XceeDesigns",
            "description": "Test Transaction",
            "order_id": order.id, // Pass the order ID received from backend
            "handler": async function (response) {
                console.log("Payment ID: ", response.razorpay_payment_id);
                console.log("Order ID: ", response.razorpay_order_id);
                console.log("Signature: ", response.razorpay_signature);

                // const endDate = new Date().setMonth(new Date().getMonth() + (liteDuration === '1month' ? 1 : liteDuration === '3month' ? 3 : liteDuration === '6month' ? 6 : 12));
                try {
                    console.log(status._id);
                    const endDate = () => {
                        const date = new Date();
                        if (proDuration === '1month') {
                            return date.setMonth(date.getMonth() + 1);
                        } else if (proDuration === '3month') {
                            return date.setMonth(date.getMonth() + 3);
                        } else if (proDuration === '6month') {
                            return date.setMonth(date.getMonth() + 6);
                        } else {
                            return date.setMonth(date.getMonth() + 12);
                        }
                    }
                    const updateSubscription = await fetch(`${backend_url}/api/subscription/update`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                        body: JSON.stringify({
                            subscriptionType: 'Premium',
                            subscriptionStatus: 'Active',
                            _id: status._id,
                            user: jwtDecode(localStorage.getItem('token')).sub,
                            startDate: new Date(),
                            endDate: endDate(),
                        }),
                    });
                    const data = await updateSubscription.json();
                    console.log("Update Subscription:", data);
                    alert('Payment successful and subscription updated!');
                } catch (error) {
                    console.log('Error updating subscription');
                }
            },
            "prefill": {
                "name": user.name,
                "email": user.email
            }
        };

        var rzp1 = new Razorpay(options);
        rzp1.open();
    };

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
            <Typography variant="h4" fontWeight="bold" color='#1e1e2f'>
                Choose Your Subscription Plan
            </Typography>
            <Typography variant="body1" color="textSecondary">
                Select a plan that suits your needs and enjoy exclusive features.
            </Typography>
            <Grid container spacing={4} sx={{ mt: 1 }}>
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
                                <Typography variant="h5" fontWeight="bold" color="#2C3E50" sx={{ mt: 0 }}>
                                    {plan.title}
                                </Typography>
                                <Typography variant="subtitle2" color="grey">
                                    {plan.subtitle}
                                </Typography>
                                <Typography variant="h4" fontWeight="bold" fontFamily="cursive" sx={{ mt: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
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
                                {(plan.title === 'Explorer Plan (Lite)' || plan.title === 'Expert Plan (Pro)') && (
                                    <FormControl fullWidth sx={{ mt: 2 }}>
                                        <InputLabel id={`${plan.title}-duration-label`}>Duration</InputLabel>
                                        <Select
                                            labelId={`${plan.title}-duration-label`}
                                            value={plan.title === 'Explorer Plan (Lite)' ? liteDuration : proDuration}
                                            onChange={(e) => plan.title === 'Explorer Plan (Lite)' ? setLiteDuration(e.target.value) : setProDuration(e.target.value)}
                                            label="Duration"
                                        >
                                            <MenuItem value="1month">1 Month</MenuItem>
                                            <MenuItem value="3month">3 Months</MenuItem>
                                            <MenuItem value="6month">6 Months</MenuItem>
                                            <MenuItem value="12month">12 Months</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
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
                                    onClick={() => {
                                        if (plan.title === 'Beginner Plan') {
                                            startSubscription();
                                        } else if (plan.title === 'Explorer Plan (Lite)') {
                                            handleLiteSubscription();
                                        } else {
                                            handleProSubscription();
                                        }
                                    }}
                                    disabled={(plan.title === 'Explorer Plan (Lite)' && !liteDuration) || (plan.title === 'Expert Plan (Pro)' && !proDuration)}
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
