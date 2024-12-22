import React, { useEffect } from 'react'
import { Box, Grid, Paper, Typography, Card, CardContent, Button } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Chart from '../components/Chart';
import { useLocation } from 'react-router-dom';
import ReceiptHistory from './ReceiptHistory';
import RoughReceipt from './RoughReceipt';
import Inventory from './Inventory';
import JewellerReceipt from '../components/JewellerReceipt';
import UserProfile from './UserProfile';
import { useNavigate } from 'react-router-dom';

const MainDashboard = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let [subscription, setSubscription] = React.useState();
  const [isPremium, setIsPremium] = React.useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const backend_url = process.env.REACT_APP_BACKEND_URL;

  const handleSubscriptionStatus = async () => {
    const subscriptionResponse = await fetch(`${backend_url}/api/subscription/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (subscriptionResponse.ok) {
      const data = await subscriptionResponse.json();
      subscription = data;
      console.log("Main Dashboard", subscription);
      if(subscription.subscriptionType === 'Premium' && subscription.subscriptionStatus !== 'Canceled') {
        setIsPremium(true);
      }
    } else {
      console.log('Error fetching subscription data');
    }
  }

  useEffect(() => {
    handleSubscriptionStatus();
  }, []);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { md: '4px' }, // Add margin-left for larger screens to adjust for sidebar
          p: 3,
          minHeight: '100vh',
        }}
      >
        {/* Header */}
        <Header handleDrawerToggle={handleDrawerToggle} />

        {(location.pathname === '/dashboard') && (

          <div style={{ position: 'relative' }}>
            {/* Conditional Overlay */}
            {!isPremium && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(4px)',
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#34495e',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                }}
              >
                <Typography variant="h4" sx={{ mb: 2 }}>
                  Upgrade to Premium Plan
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  Unlock premium features and gain full access!
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/dashboard/user-profile')}
                  sx={{backgroundColor:'#1e1e2f'}}
                >
                  Upgrade Now
                </Button>
              </div>
            )}

            {/* Main Content */}
            <div>
              {/* Statistic Cards Section */}
              <Grid container spacing={3} sx={{ mt: 2 }}>
                {[
                  { title: 'Receipt Generated', value: '$53k', change: '+55%' },
                  { title: 'Customers', value: '2300', change: '+3%' },
                  { title: 'Inventory', value: '3,462', change: '-2%' },
                  { title: 'Sales', value: '$103,430', change: '+5%' },
                ].map((card, index) => (
                  <Grid item xs={12} md={3} key={index}>
                    <Card
                      sx={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        borderRadius: 2,
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                          transform: 'translateY(-5px)',
                        },
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3a3a3a' }}>
                          {card.title}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                          {card.value}
                        </Typography>
                        <Typography
                          color={card.change.includes('-') ? 'error.main' : 'success.main'}
                          sx={{ fontWeight: 'bold' }}
                        >
                          {card.change}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Charts Section */}
              <Grid container spacing={3} sx={{ mt: 3 }}>
                {/* Website Views */}
                <Grid item xs={12} md={6}>
                  <Paper
                    sx={{
                      p: 2,
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#34495e' }} gutterBottom>
                      Website Views
                    </Typography>
                    <Chart />
                  </Paper>
                </Grid>

                {/* Daily Sales */}
                <Grid item xs={12} md={6}>
                  <Paper
                    sx={{
                      p: 2,
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#34495e' }} gutterBottom>
                      Daily Sales
                    </Typography>
                    <Chart />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>

        )}

        {location.pathname === '/dashboard/receipt-history' && (
          <ReceiptHistory />
        )}

        {location.pathname === '/dashboard/rough-receipt' && (
          <RoughReceipt />
        )}

        {location.pathname === '/dashboard/inventory' && (
          <Inventory />
        )}

        {location.pathname === '/dashboard/rough-receipt/preview' && (
          <JewellerReceipt />
        )}

        {location.pathname === '/dashboard/user-profile' && (
          <UserProfile />
        )}
      </Box>
    </Box>
  )
}

export default MainDashboard;
