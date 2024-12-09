import React, { useEffect, useState } from 'react';
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
    Button,
    TextField,
    Select,
    MenuItem,
    Pagination,
    Container,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';  // Import Preview Icon
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast'
import { ReceiptContext } from '../context/ReceiptContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

//receipt history page
const ReceiptHistory = () => {

    const { receiptData, setReceiptData } = useContext(ReceiptContext);
    const [data, setData] = useState([]);
    const [amount, setAmount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);
    const navigate = useNavigate();

    const backend_url = process.env.REACT_APP_BACKEND_URL;

    const handleDelete = async (billNumber) => {
        try {
            const response = await fetch(`${backend_url}/api/receipt/delete/${billNumber}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            if (response.ok) {
                toast.success('Bill deleted successfully.');
                fetchReceiptHistory();  // Refresh receipt history after deletion
            } else {
                toast.error('Failed to delete the bill.');
            }
        } catch (error) {
            console.error('Error deleting the bill:', error);
        }
    };

    // Fetch receipt history with pagination
    const fetchReceiptHistory = async () => {
        try {
            const email = jwtDecode(localStorage.getItem('token')).sub;
            const response = await fetch(`${backend_url}/api/receipt/fetch/${email}?page=${currentPage}&limit=${resultsPerPage}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching receipt history:', error);
        }
    };

    useEffect(() => {
        fetchReceiptHistory();
    }, [currentPage, resultsPerPage]); // Fetch when page or results per page change

    const calculateAmount = (items) => {
        let qty = 0;
        items.forEach((item) => {
            const quantity = parseInt(item.rate, 10);
            if (!isNaN(quantity)) {
                qty += quantity;
            }
        });
        return qty;
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleResultsPerPageChange = (event) => {
        setResultsPerPage(event.target.value);
    };

    const handlePreview = (row) => {
        setReceiptData(row);
        console.log(receiptData);
        navigate('/dashboard/e/preview');
        // You can navigate or open a modal here with detailed receipt info.
    };
    const defaultReceiptData = {
        businessName: '',
        address: '',
        phone: '',
        documentTitle: '',
        customerName: '',
        customerAddress: '',
        customerPhone: '',
        billNumber: '',
        date: '',
        user: '',
        _24kRate: '',
        silverBhav: '',
        _18kReturn: '',
        _20kReturn: '',
        _22kReturn: '',
        items: [],
        closingBalance: '',
        previousDue: '0',
        currentDue: '',
        paidAmount: '',
        totalNetWeight: '0',
    };

    const resetReceiptData = () => {
        setReceiptData(defaultReceiptData);
    };

    useEffect(() => {
       resetReceiptData();
    }, []);

    return (
        <Container maxWidth='false' disableGutters>
            <Navbar />
            <Box sx={{ padding: '24px' }}>
                {/* Header */}
                <Typography variant="h6" sx={{ marginBottom: '16px', fontWeight: 'bold' }}>
                    Receipt History
                </Typography>

                {/* Search and Actions */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <TextField variant="outlined" size="small" placeholder="Search..." sx={{ width: '300px' }} />
                    <Box sx={{ display: 'flex', gap: '16px' }}>
                        <Select size="small" value={resultsPerPage} onChange={handleResultsPerPageChange}>
                            <MenuItem value={10}>Show Results 10</MenuItem>
                            <MenuItem value={20}>Show Results 20</MenuItem>
                            <MenuItem value={50}>Show Results 50</MenuItem>
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
                                <TableCell>Net Weight</TableCell>
                                <TableCell>Due</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.billNumber}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.customerName}</TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                    <TableCell>{row.totalNetWeight}</TableCell>
                                    <TableCell>{row.currentDue}</TableCell>
                                    <TableCell>{calculateAmount(row.items)}</TableCell>
                                    <TableCell>
                                        {/* Preview Button */}
                                        <IconButton size="small" color="primary" onClick={() => handlePreview(row)}>
                                            <PreviewIcon />
                                        </IconButton>

                                        {/* Delete Button */}
                                        <IconButton size="small" color="error" onClick={() => handleDelete(row.billNumber)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                    <Typography variant="body2">
                        Showing {data.length} of 230
                    </Typography>
                    <Pagination count={10} page={currentPage} onChange={handlePageChange} variant="outlined" shape="rounded" />
                </Box>
            </Box>
            <Footer />
        </Container>
    );
};

export default ReceiptHistory;
