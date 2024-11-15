import React from 'react'
import { Container, Box, Typography, Paper, Button } from '@mui/material'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useNavigate } from 'react-router-dom';

const Choice = () => {

    const navigate = useNavigate();

    return (
        <Container sx={{ display: "flex", justifyContent: 'center', alignItems: 'center', minHeight: '97vh', backgroundColor: '#f7f9fc' }} disableGutters maxWidth={false}>
            <Paper
                elevation={4}
                sx={{
                    padding: 2,
                    margin: 2,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
            <Box flexDirection="column">
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography variant='h4' gutterBottom>What do you want to do?</Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Button variant='contained' onClick={() => navigate('/dashboard/general')} startIcon={<ReceiptLongIcon />} sx={{textTransform: 'capitalize', paddingX: 4, height: '70px', margin: 2 }}>
                        <Typography variant='h6'>Create a General Receipt</Typography>
                    </Button>
                    <Button variant='contained' onClick={() => navigate('/dashboard/estimate')} startIcon={<ReceiptIcon />} sx={{textTransform: 'capitalize', paddingX: 4, height: '70px', margin: 2 }}>
                        <Typography variant='h6'>Create a Rough Estimate</Typography>
                    </Button>
                </Box>
            </Box>
            </Paper>
        </Container>
    )
}

export default Choice