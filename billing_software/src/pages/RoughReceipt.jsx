import React, { useState, useEffect } from 'react';
import { Button, Box, Badge } from '@mui/material';
import RoughEstimate from '../components/RoughEstimate'; // Assume these are your components
import Dashboard from '../components/Dashboard'; // Assume these are your components

const RoughReceipt = () => {
    const [selectedOption, setSelectedOption] = useState('manual'); // Default to 'manual'
    let [subscription, setSubscription] = useState();

    const backend_url = process.env.REACT_APP_BACKEND_URL;

    const handleSubscriptionStatus = async () => {
        const subscriptionResponse = await fetch(`${backend_url}/api/subscription/`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
          });
          if(subscriptionResponse.ok) {
            const data = await subscriptionResponse.json();
            subscription = data;
            console.log(subscription);
          } else {
            console.log('Error fetching subscription data');
          }
      }
    
      useEffect(() => {
        handleSubscriptionStatus();
      }, []);
    

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                padding: '24px',
            }}
        >
            {/* Buttons at the top */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
                <Button
                    variant={selectedOption === 'manual' ? 'contained' : 'outlined'}
                    onClick={() => setSelectedOption('manual')}
                    sx={{
                        backgroundColor: selectedOption === 'manual' ? '#1e1e2f' : 'transparent',
                        color: selectedOption === 'manual' ? '#ffffff' : '#1e1e2f',
                        borderColor: '#1e1e2f',
                        '&:hover': {
                            backgroundColor: selectedOption === 'manual' ? '#1e1e2f' : '#e6e6e6',
                        },
                    }}
                >
                    Manual Receipt
                </Button>
                <Badge
                    badgeContent="PRO"
                    color="error"
                    sx={{ '& .MuiBadge-dot': { backgroundColor: '#FFD700' } }} // Styling the PRO badge
                >
                    <Button
                        variant={selectedOption === 'automatic' ? 'contained' : 'outlined'}
                        onClick={() => {
                            if(subscription.subscriptionType === 'Premium' && subscription.subscriptionStatus === 'Active') {
                                setSelectedOption('automatic')
                            }
                        }}
                        sx={{
                            backgroundColor: selectedOption === 'automatic' ? '#1e1e2f' : 'transparent',
                            color: selectedOption === 'automatic' ? '#ffffff' : '#1e1e2f',
                            borderColor: '#1e1e2f',
                            '&:hover': {
                                backgroundColor: selectedOption === 'automatic' ? '#1e1e2f' : '#e6e6e6',
                            },
                        }}
                    >
                        Automatic Receipt
                    </Button>
                </Badge>
            </Box>

            {/* Render content based on selection */}
            <Box sx={{ flexGrow: 1 }}>
                {selectedOption === 'manual' && <RoughEstimate />}
                {selectedOption === 'automatic' && <Dashboard />}
            </Box>
        </Box>
    );
};

export default RoughReceipt;
