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
import { Email, Phone, Save, Send, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { ReceiptContext } from '../context/ReceiptContext';
import { jwtDecode } from 'jwt-decode';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 600,
    backgroundColor: theme.palette.grey[200],
}));

function RoughEstimate() {

    const { receiptData, setReceiptData } = useContext(ReceiptContext);
    const backend_url = process.env.REACT_APP_BACKEND_URL;

    const navigate = useNavigate();

    const [receipts, setReceipts] = useState([]);

    const [items, setItems] = useState([
        { description: '', gWt: '', lWt: '0', nWt: '0', tunch: '', rate: '', gold: '0', silver: '0', labour: '0', amount: '' },
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

        // Recalculate the values for nWt, lWt, and Amount after user changes any relevant field
        if (field === 'gWt' || field === 'tunch') {
            updatedItems[index].nWt = ((parseFloat(updatedItems[index].gWt) * parseFloat(updatedItems[index].tunch)) / 100).toFixed(3);
            updatedItems[index].lWt = (parseFloat(updatedItems[index].gWt) - parseFloat(updatedItems[index].nWt)).toFixed(3);
            
        }

        if (field === 'rate' || field === 'gold' || field === 'silver' || field === 'labour') {
            updatedItems[index].amount = (parseFloat(updatedItems[index].rate) - (parseFloat(updatedItems[index].gold) * (receiptData._24kRate / 10) + parseFloat(updatedItems[index].silver) * (receiptData.silverBhav / 1000)) + parseFloat(updatedItems[index].labour)).toFixed(3);
        }

        setItems(updatedItems);

        // Also update the items in the receiptData context
        setReceiptData((prevData) => ({
            ...prevData,
            items: updatedItems,
        }));
    };

    useEffect(() => {
        if(receiptData.items.length !== 0) {
            setItems(receiptData.items);
        }
    }, []);

    const addItem = () => {
        setItems([
            ...items,
            { description: '', gWt: '', lWt: '0', nWt: '0', tunch: '', rate: '', gold: '0', silver: '0', labour: '0', amount: '' },
        ]);
    };

    useEffect(() => {
        const fetchReceipts = async () => {
            const user_email = jwtDecode(localStorage.getItem('token')).sub;
            console.log(user_email);
            const response = await fetch(`${backend_url}/api/receipt/fetch/${user_email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            }
            );
            const data = await response.json();
            console.log(data);
            console.log(data[data.length - 1]._18kReturn);


            setReceipts(data);
            if (data.length !== 0)
                setReceiptData((prevValues) => {
                    return {
                        ...prevValues,
                        user: user_email,
                        businessName: data[data.length - 1].businessName,
                        address: data[data.length - 1].address,
                        phone: data[data.length - 1].phone,
                        documentTitle: data[data.length - 1].documentTitle,
                        billNumber: "BILL-" + (data.length + 1),
                        date: new Date().toISOString().slice(0, 10),
                        _18kReturn: data[data.length - 1]._18kReturn,
                        _20kReturn: data[data.length - 1]._20kReturn,
                        _22kReturn: data[data.length - 1]._22kReturn,
                    };
                });
        };
        fetchReceipts();
    }, []);

    useEffect(() => {
        const fetchPreviousDue = async () => {
            // Check if the phone number is exactly 11 digits
            if (receiptData.customerPhone && receiptData.customerPhone.length === 10) {
                try {
                    const response = await fetch(`${backend_url}/api/receipt/fetch/customer/receipts/${receiptData.customerPhone}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
    
                    if (!response.ok) {
                        console.error("Failed to fetch previous due. Server error.");
                        return;
                    }
    
                    const data = await response.json();
                    console.log("Fetched Receipts Data: ", data);
    
                    // Ensure data has valid entries
                    if (data && data.length > 0) {
                        const lastReceipt = data[data.length - 1];
    
                        // Update previousDue in receiptData
                        setReceiptData((prevValues) => ({
                            ...prevValues,
                            previousDue: lastReceipt.currentDue || 0, // Use 0 if currentDue is undefined
                            customerAddress: lastReceipt.customerAddress,
                            customerName: lastReceipt.customerName
                        }));
                    }
                } catch (error) {
                    console.error("Error fetching previous due:", error);
                }
            }
        };
    
        fetchPreviousDue();
    }, [receiptData.customerPhone, backend_url, setReceiptData]);
    

    // Calculate the closing balance by summing up the amounts of all items
    const calculateClosingBalance = () => {
        calculateTotalNetWeight();
        const closingBalance = items.reduce((total, item) => {
            const amount = parseFloat(item.amount) || 0;
            return total + amount;
        }, 0).toFixed(2); // Rounds to 2 decimal places
        receiptData.closingBalance = closingBalance;
        return receiptData.closingBalance;
    };
    const calculateTotalNetWeight = () => {
        const totalNetWeight = items.reduce((total, item) => {
            const nWt = parseFloat(item.nWt) || 0;
            return total + nWt;
        }, 0).toFixed(2); // Rounds to 2 decimal places
        receiptData.totalNetWeight = totalNetWeight;
    };

    const calculateEffectiveBalance = () => {
        const currentDue = ((parseFloat(receiptData.previousDue) + parseFloat(calculateClosingBalance())) - parseFloat(receiptData.paidAmount)).toFixed(2);
        receiptData.currentDue = currentDue;
        return receiptData.currentDue;
    };

    const handlePreview = () => {
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

    const handlePrint = () => {
        // logic
    }

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
                                    InputLabelProps={{ shrink: true }}
                                    type='date'
                                    variant="outlined"
                                    margin="dense"
                                    value={receiptData.date}
                                    onChange={(e) => handleFormChange('date', e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label="Gold Rate"
                                    variant="outlined"
                                    margin="dense"
                                    value={receiptData._24kRate}
                                    onChange={(e) => handleFormChange('_24kRate', e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label="Silver Rate"
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
                                                            minWidth: { xs: 120, sm: 100 },
                                                            '& .MuiInputBase-root': { fontSize: '0.875rem' },
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
                                    value={receiptData._18kReturn}
                                    onChange={(e) => handleFormChange('_18kReturn', e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label="20K Return"
                                    variant="outlined"
                                    margin="dense"
                                    value={receiptData._20kReturn}
                                    onChange={(e) => handleFormChange('_20kReturn', e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label="22K Return"
                                    variant="outlined"
                                    margin="dense"
                                    value={receiptData._22kReturn}
                                    onChange={(e) => handleFormChange('_22kReturn', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography sx={{ ml: { xs: 5, sm: 20 } }} variant='subtitle1'>Closing Balance:</Typography>
                                    <Typography value={receiptData.closingBalance} onChange={(e) => handleFormChange('closingBalance', e.target.value)} sx={{ ml: 2, mt: 0, fontWeight: 600 }}>₹{calculateClosingBalance()}</Typography>
                                </Box>
                                <TextField
                                    fullWidth
                                    label="Previous Due"
                                    variant="outlined"
                                    margin="dense"
                                    value={receiptData.previousDue}
                                    onChange={(e) => handleFormChange('previousDue', e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label="Paid Amount"
                                    variant="outlined"
                                    margin="dense"
                                    value={receiptData.paidAmount}
                                    onChange={(e) => handleFormChange('paidAmount', e.target.value)}
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography sx={{ ml: { xs: 5, sm: 20 } }} variant='subtitle1'>Current Due:</Typography>
                                    <Typography value={receiptData.currentDue} onChange={(e) => handleFormChange('currentDue', e.target.value)} sx={{ ml: 2, mt: 0, fontWeight: 600 }}>₹{calculateEffectiveBalance()}</Typography>
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
                                Enter Customer WhatsApp Number
                            </Typography>
                            <TextField
                                fullWidth
                                label="WhatsApp Number"
                                variant="outlined"
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <WhatsAppIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                
                                endIcon={<Send />}
                                sx={{ mt: 1, backgroundColor:'#25d366' }}
                            >
                                Send over WhatsApp
                            </Button>
                        </Paper>
                        <Box display="flex" justifyContent="space-between" mt={2} sx={{ padding: '10px' }}>
                            <Button variant="contained" sx={{ marginRight: 2, width: '240px' }} startIcon={<Save />} onClick={handlePrint}>
                                Print
                            </Button>

                            <Button variant="contained" sx={{ marginRight: 0, width: '240px' }} startIcon={<Visibility />} onClick={handlePreview}>
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
