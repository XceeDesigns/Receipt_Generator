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
    Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast'
import { ReceiptContext } from '../context/ReceiptContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import LoadingScreen from '../components/LoadingScreen';

const ReceiptHistory = () => {
    const { receiptData, setReceiptData } = useContext(ReceiptContext);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);  // Ensure it's initialized as an empty array
    const [amount, setAmount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(6);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalRecords, setTotalRecords] = useState(0);  // Track total records for pagination
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedBillNumber, setSelectedBillNumber] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const backend_url = process.env.REACT_APP_BACKEND_URL;

    const handleOpenDialog = (billNumber) => {
        setSelectedBillNumber(billNumber);
        setDialogOpen(true);
    };

    const handleCloseDialog = (confirmed) => {
        setDialogOpen(false);
        if (confirmed) {
            handleDelete(selectedBillNumber);
        }
    };

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
                fetchReceiptHistory(); // Refresh receipt history after deletion
            } else {
                toast.error('Failed to delete the bill.');
            }
        } catch (error) {
            console.error('Error deleting the bill:', error);
            toast.error('An error occurred while deleting the bill.');
        }
    };

    // Fetch all receipt history without pagination
    const fetchReceiptHistory = async () => {
        setLoading(true);
        try {
            const email = jwtDecode(localStorage.getItem('token')).sub;
            const response = await fetch(`${backend_url}/api/receipt/fetch/${email}`, {
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
            console.log('Receipt history:', data);
            setData(data || []);  // Ensure 'records' is an array
            setFilteredData(data || []);  // Initialize filtered data to avoid undefined
            setTotalRecords(data ? data.length : 0);  // Set total records
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching receipt history:', error);
        }
    };

    useEffect(() => {
        fetchReceiptHistory();
    }, []);  // Fetch data once on mount

    // Filter data based on the search query
    useEffect(() => {
        const filtered = data.filter((row) => {
            return (
                row.billNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                row.customerName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
        setFilteredData(filtered); // Update filtered data
        setTotalRecords(filtered.length); // Update total records after search
    }, [searchQuery, data]);  // Re-filter whenever search query or data changes

    // Slice the filtered data for pagination
    const paginatedData = (filteredData || []).slice(
        (currentPage - 1) * resultsPerPage,
        currentPage * resultsPerPage
    );

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleResultsPerPageChange = (event) => {
        setResultsPerPage(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handlePreview = (row) => {
        setReceiptData(row);
        navigate('/dashboard/rough-receipt/preview');
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
            <Box sx={{ padding: '24px' }}>

                {/* Search and Actions */}
                <Box sx={{
                    display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px',
                    '@media (min-width: 600px)': { flexDirection: 'row' },
                }}>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search by Bill No. or Name"
                        sx={{ width: '100%', maxWidth: '300px' }}
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <Box sx={{ display: 'flex', gap: '16px', flexDirection: 'row', '@media (max-width: 600px)': { flexDirection: 'column' } }}>
                        <Select size="small" value={resultsPerPage} onChange={handleResultsPerPageChange}>
                            <MenuItem value={6}>Show Results 6</MenuItem>
                            <MenuItem value={8}>Show Results 8</MenuItem>
                            <MenuItem value={10}>Show Results 10</MenuItem>
                        </Select>
                    </Box>
                </Box>


                {loading ? <LoadingScreen/> : <><Box sx={{ overflowX: 'auto' }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Bill No.</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Phone</TableCell>
                                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Net Weight</TableCell>
                                    <TableCell>Due</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedData.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.billNumber}</TableCell>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>{row.customerName}</TableCell>
                                        <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{row.customerPhone}</TableCell>
                                        <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{row.totalNetWeight}</TableCell>
                                        <TableCell>{row.currentDue}</TableCell>
                                        <TableCell>{row.closingBalance}</TableCell>
                                        <TableCell>
                                            {/* Preview Button */}
                                            <IconButton size="small" color="primary" onClick={() => handlePreview(row)} sx={{ color: '#1e1e2f' }}>
                                                <PreviewIcon />
                                            </IconButton>

                                            {/* Delete Button */}
                                            <IconButton size="small" color="error" onClick={() => handleOpenDialog(row.billNumber)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <ConfirmDialog
                                                open={isDialogOpen}
                                                handleClose={handleCloseDialog}
                                                handleConfirm={() => handleCloseDialog(true)}
                                                title="Delete Bill"
                                                content="Are you sure you want to delete this bill?"
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>


                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                        <Typography variant="body2">
                            Showing {paginatedData.length} of {totalRecords}
                        </Typography>
                        <Pagination
                            count={Math.ceil(totalRecords / resultsPerPage)}  // Dynamic pagination count based on filtered data
                            page={currentPage}
                            onChange={handlePageChange}
                            variant="outlined"
                            shape="rounded"
                        />
                    </Box></>}
            </Box>
        </Container>
    );
};

export default ReceiptHistory;
