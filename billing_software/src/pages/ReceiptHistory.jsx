import React, { useContext } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TextField,
    Select,
    MenuItem,
    Pagination,
    Container,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ReceiptHistoryContext } from '../context/ReceiptHistoryContext';

const ReceiptHistory = () => {
    // Sample data for demonstration
    const rows = [
        { billNo: '001', date: '07-12-2016', name: 'John Doe', phone: '9878987678', quantity: '1', amount: '$52' },
        { billNo: '002', date: '07-09-2016', name: 'Jon Snow', phone: '9876789876', quantity: '2', amount: '$250' },
        { billNo: '003', date: '07-03-2016', name: 'Rickon Stark', phone: '9876543212', quantity: '3', amount: '$410' },
        { billNo: '004', date: '07-01-2016', name: 'Arya Stark', phone: '9876447234', quantity: '2', amount: '$400' },
        { billNo: '005', date: '07-01-2016', name: 'Arya Stark', phone: '9876447234', quantity: '2', amount: '$400' },
        { billNo: '006', date: '07-01-2016', name: 'Arya Stark', phone: '9876447234', quantity: '2', amount: '$400' },
        { billNo: '007', date: '07-01-2016', name: 'Arya Stark', phone: '9876447234', quantity: '2', amount: '$400' },
    ];

    const { ReceiptHistory } = useContext(ReceiptHistoryContext);

    const handleDelete = () => {
        console.log(receiptData);
    }

    return (
        <Container maxWidth='false' disableGutters>
            <Navbar />
            <Box sx={{ padding: '24px' }}>
                {/* Header */}
                <Typography variant="h6" sx={{ marginBottom: '16px', fontWeight: 'bold' }}>
                    Receipt History
                </Typography>

                {/* Search and Actions */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '16px',
                    }}
                >
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search..."
                        sx={{ width: '300px' }}
                    />
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                        <Select size="small" defaultValue="10">
                            <MenuItem value="10">Show Results 10</MenuItem>
                            <MenuItem value="20">Show Results 20</MenuItem>
                            <MenuItem value="50">Show Results 50</MenuItem>
                        </Select>
                    </Box>
                </Box>

                {/* Table */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Bill No.</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ReceiptHistory.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.billNumber}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                    <TableCell>{row.quantity}</TableCell>
                                    <TableCell>{row.amount}</TableCell>
                                    <TableCell onClick={handleDelete}>
                                        <IconButton size="small" color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '16px',
                    }}
                >
                    <Typography variant="body2">
                        Showing {rows.length} of 230
                    </Typography>
                    <Pagination count={10} page={2} variant="outlined" shape="rounded" />
                </Box>
            </Box>
            <Footer />
        </Container>
    );
};

export default ReceiptHistory;
