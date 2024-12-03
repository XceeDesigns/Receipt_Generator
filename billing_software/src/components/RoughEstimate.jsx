import React, { useState, useContext, useEffect } from 'react';
import {
    Box,
    Container,
    Grid,
    TextField,
    Typography,
    Button,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Email, Save, Send, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { ReceiptContext } from '../context/ReceiptContext';
import { jwtDecode } from 'jwt-decode';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 600,
    backgroundColor: theme.palette.grey[200],
}));

function RoughEstimate() {

    const { receiptData, setReceiptData } = useContext(ReceiptContext);

    const navigate = useNavigate();

    const [items, setItems] = useState([
        { description: '', gWt: '', lWt: '', nWt: '', tunch: '', rate: '', gold: '', silver: '', labour: '', amount: '' },
    ]);

    const handleFormChange = (field, value) => {
        setReceiptData((prevValues) => ({
            ...prevValues,
            [field]: value,
        }));
    };

    useEffect(() => {
        // Update the context with the current items
        setReceiptData((prevValues) => {
            return {
                ...prevValues,
                user: jwtDecode(localStorage.getItem('token')).sub,
            };  
        });
    }, []);

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);

        // Also update the items in the receiptData context
        setReceiptData((prevData) => ({
            ...prevData,
            items: updatedItems,
        }));
    };

    const addItem = () => {
        setItems([
            ...items,
            { description: '', gWt: '', lWt: '', nWt: '', tunch: '', rate: '', gold: '', silver: '', labour: '', amount: '' },
        ]);
    };

    // Calculate the closing balance by summing up the amounts of all items
    const calculateClosingBalance = () => {
        return items.reduce((total, item) => {
            const amount = parseFloat(item.amount) || 0;
            return total + amount;
        }, 0).toFixed(2); // Rounds to 2 decimal places
    };

    const handlePreview = () => {
        // Update the context with the current items
        setReceiptData((prevValues) => {
            return {
                ...prevValues,
                items: items,
            };
        });

        console.log(receiptData);

        // Ensure receiptData is updated before navigating
        navigate('/dashboard/e/preview');
    };

    return (
        <Container maxWidth='false' disableGutters>
            <Navbar />
            <Grid container sx={{ background: 'linear-gradient(to bottom right, #1976d2, #ffffff)' }}>
                <Grid item xs={12} sm={12} md={8}>
                    <Container maxWidth='md' sx={{ bgcolor: '#ffffff', p: 3, borderRadius: 2, boxShadow: 3, mt: 4, mb: 4 }} disableGutters>
                        {/* Business Information */}
                        <Box sx={{ mb: 4, textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                                Receipt
                            </Typography>
                            <TextField
                                fullWidth
                                label="Business Name"
                                variant="outlined"
                                margin="dense"
                                value={receiptData.businessName}
                                onChange={(e) => handleFormChange('businessName', e.target.value)}
                                sx={{ fontWeight: 700, textAlign: 'center', mb: 1 }}
                            />
                            <TextField
                                fullWidth
                                label="Address"
                                variant="outlined"
                                margin="dense"
                                value={receiptData.address}
                                onChange={(e) => handleFormChange('address', e.target.value)}
                                sx={{ textAlign: 'center', mb: 1 }}
                            />
                            <TextField
                                fullWidth
                                label="Phone"
                                variant="outlined"
                                margin="dense"
                                value={receiptData.phone}
                                onChange={(e) => handleFormChange('phone', e.target.value)}
                                sx={{ textAlign: 'center', mb: 1 }}
                            />
                            <TextField
                                fullWidth
                                label="Document Title"
                                variant="outlined"
                                margin="dense"
                                value={receiptData.documentTitle}
                                onChange={(e) => handleFormChange('documentTitle', e.target.value)}
                                sx={{ fontWeight: 600, textAlign: 'center', mt: 2 }}
                            />
                        </Box>

                        <Divider sx={{ mb: 2 }} />

                        {/* Customer and Bill Details */}
                        <Grid container spacing={3} sx={{ mb: 3 }}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Customer Name"
                                    variant="outlined"
                                    margin="dense"
                                    value={receiptData.customerName}
                                    onChange={(e) => handleFormChange('customerName', e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label="Address"
                                    variant="outlined"
                                    margin="dense"
                                    value={receiptData.customerAddress}
                                    onChange={(e) => handleFormChange('customerAddress', e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    variant="outlined"
                                    margin="dense"
                                    value={receiptData.customerPhone}
                                    onChange={(e) => handleFormChange('customerPhone', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Bill No."
                                    variant="outlined"
                                    margin="dense"
                                    value={receiptData.billNumber}
                                    onChange={(e) => handleFormChange('billNumber', e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label="Date"
                                    defaultValue="2024-11-12"
                                    InputLabelProps={{ shrink: true }}
                                    type='date'
                                    variant="outlined"
                                    margin="dense"
                                    value={receiptData.date}
                                    onChange={(e) => handleFormChange('date', e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label="24K Rate"
                                    variant="outlined"
                                    margin="dense"
                                    value={receiptData._24KRate}
                                    onChange={(e) => handleFormChange('_24KRate', e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label="Silver Bhav"
                                    variant="outlined"
                                    margin="dense"
                                    value={receiptData.silverBhav}
                                    onChange={(e) => handleFormChange('silverBhav', e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <Divider sx={{ mb: 3 }} />

                        {/* Items Table */}
                        <TableContainer component={Paper} sx={{ mb: 3, overflowX: 'auto' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Description</StyledTableCell>
                                        <StyledTableCell>G Wt.</StyledTableCell>
                                        <StyledTableCell>L Wt.</StyledTableCell>
                                        <StyledTableCell>N Wt.</StyledTableCell>
                                        <StyledTableCell>Tunch</StyledTableCell>
                                        <StyledTableCell>Rate</StyledTableCell>
                                        <StyledTableCell>Gold</StyledTableCell>
                                        <StyledTableCell>Silver</StyledTableCell>
                                        <StyledTableCell>Labour</StyledTableCell>
                                        <StyledTableCell>Amount</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((item, index) => (
                                        <TableRow key={index}>
                                            {Object.keys(item).map((field) => (
                                                <TableCell key={field}>
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        size="small"
                                                        value={item[field]}
                                                        onChange={(e) => handleItemChange(index, field, e.target.value)}
                                                        sx={{
                                                            minWidth: {xs: 120, sm: 45}, // Prevent the text fields from shrinking too small
                                                            '& .MuiInputBase-root': { fontSize: '0.875rem' }, // Adjust font size for small screens
                                                        }}
                                                    />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>


                        <Button variant="contained" onClick={addItem} sx={{ mb: 3 }}>
                            Add Item
                        </Button>

                        <Divider sx={{ mb: 3 }} />

                        {/* Terms & Conditions */}
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Terms & Conditions:</Typography>
                                <TextField
                                    fullWidth
                                    label="18K Return"
                                    variant="outlined"
                                    margin="dense"
                                    value={receiptData._18KReturn}
                                    onChange={(e) => handleFormChange('_18KReturn', e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label="20K Return"
                                    variant="outlined"
                                    margin="dense"
                                    value={receiptData._20KReturn}
                                    onChange={(e) => handleFormChange('_20KReturn', e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label="22K Return"
                                    variant="outlined"
                                    margin="dense"
                                    value={receiptData._22KReturn}
                                    onChange={(e) => handleFormChange('_22KReturn', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography sx={{ ml: { xs: 5, sm: 20 } }} variant='subtitle1'>Closing Balance:</Typography>
                                    <Typography sx={{ ml: 2, mt: 0, fontWeight: 600 }}>₹{calculateClosingBalance()}</Typography>
                                </Box>
                                <Typography sx={{ ml: { sm: 30, xs: 10 }, mt: 24 }}>Authorised Signatory</Typography>
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Container maxWidth="md" sx={{ mt: 4 }}>
                        <Paper variant="outlined" sx={{ padding: 3, backgroundColor: "#ffffff" }}>
                            {/* Preview via Email */}
                            <Typography variant="subtitle1" gutterBottom sx={{ color: "#555" }}>
                                Preview via Email
                            </Typography>
                            <TextField
                                fullWidth
                                label="name@business.com"
                                variant="outlined"
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                endIcon={<Send />}
                                sx={{ mt: 1 }}
                            >
                                Send over WhatsApp
                            </Button>
                        </Paper>
                        <Box display="flex" justifyContent="space-between" mt={2} sx={{ padding: '10px' }}>
                            <Button variant="outlined" sx={{ marginRight: 2, width: '240px' }} startIcon={<Save />}>
                                Print
                            </Button>

                            <Button variant="outlined" sx={{ marginRight: 0, width: '240px' }} startIcon={<Visibility />} onClick={handlePreview}>
                                Preview
                            </Button>

                        </Box>
                    </Container>
                </Grid>
            </Grid >
            <Footer />
        </Container>
    );
}

export default RoughEstimate;
