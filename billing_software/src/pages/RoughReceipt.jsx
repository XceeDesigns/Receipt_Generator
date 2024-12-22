import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import RoughEstimate from '../components/RoughEstimate'; // Assume these are your components
import Dashboard from '../components/Dashboard'; // Assume these are your components

const RoughReceipt = () => {
    const [selectedOption, setSelectedOption] = useState('manual'); // Default to 'manual'

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
                <Button
                    variant={selectedOption === 'automatic' ? 'contained' : 'outlined'}
                    onClick={() => setSelectedOption('automatic')}
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
