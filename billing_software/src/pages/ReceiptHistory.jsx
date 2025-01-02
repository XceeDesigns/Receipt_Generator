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
    TextField,
    Select,
    MenuItem,
    Pagination,
    Container,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import { ReceiptContext } from '../context/ReceiptContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import LoadingScreen from '../components/LoadingScreen';

const ReceiptHistory = () => {
    const { receiptData, setReceiptData } = useContext(ReceiptContext);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(6);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalRecords, setTotalRecords] = useState(0);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedBillNumber, setSelectedBillNumber] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const backend_url = process.env.REACT_APP_BACKEND_URL;

    // Dialog handling
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
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.ok) {
                toast.success('Bill deleted successfully.');
                fetchReceiptHistory();
            } else {
                toast.error('Failed to delete the bill.');
            }
        } catch (error) {
            console.error('Error deleting the bill:', error);
            toast.error('An error occurred while deleting the bill.');
        }
    };

    // Fetching receipt data
    const fetchReceiptHistory = async () => {
        setLoading(true);
        try {
            const email = jwtDecode(localStorage.getItem('token')).sub;
            const response = await fetch(`${backend_url}/api/receipt/fetch/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) throw new Error('Failed to fetch data');

            const data = await response.json();
            setData(data || []);
            setFilteredData(data || []);
            setTotalRecords(data ? data.length : 0);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching receipt history:', error);
        }
    };

    useEffect(() => {
        fetchReceiptHistory();
    }, []);

    useEffect(() => {
        const filtered = data.filter((row) =>
            row.billNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.customerName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
        setTotalRecords(filtered.length);
    }, [searchQuery, data]);

    const paginatedData = filteredData.slice(
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

    return (
        <Container maxWidth="lg" disableGutters>
            <Box sx={{ padding: '16px' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        gap: '16px',
                        marginBottom: '16px',
                        width: { xs: '100vw', sm: '100%' }, // Ensure the container itself doesn't exceed the viewport width
                    }}
                >
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search by Bill No. or Name"
                        sx={{
                            flex: 1, // Allow the TextField to grow and shrink within available space
                            width: { xs: '100vw', sm: '50%' }, // Full width on extra-small screens, half on small and above
                            maxWidth: '100%', // Prevent it from exceeding the container width
                        }}
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <Select
                        size="small"
                        value={resultsPerPage}
                        onChange={handleResultsPerPageChange}
                        sx={{
                            width: { xs: '100%', sm: '150px' }, // Full width on extra-small screens, fixed width on small and above
                            maxWidth: '100%', // Prevent it from exceeding the container width
                        }}
                    >
                        <MenuItem value={6}>Show 6</MenuItem>
                        <MenuItem value={8}>Show 8</MenuItem>
                        <MenuItem value={10}>Show 10</MenuItem>
                    </Select>
                </Box>



                {loading ? (
                    <LoadingScreen />
                ) : (
                    <>
                        <Box sx={{ overflowX: 'auto', width: { xs: '100vw', sm: '100%' } }}>
                            <TableContainer
                                component={Paper}
                                sx={{
                                    border: '1px solid #ccc', // Border for the table container
                                    borderRadius: '8px', // Optional: Add rounded corners
                                    overflow: 'auto', // Ensure rounded corners are respected
                                }}
                            >
                                <Table
                                    sx={{
                                        minWidth: 650,
                                        borderCollapse: 'collapse', // Ensures borders don't double
                                    }}
                                    aria-label="responsive table"
                                >
                                    <TableHead>
                                        <TableRow sx={{ borderBottom: '2px solid #ccc' }}> {/* Adds bottom border to the header */}
                                            <TableCell sx={{ border: '1px solid #ccc' }}>Bill No.</TableCell>
                                            <TableCell sx={{ border: '1px solid #ccc' }}>Date</TableCell>
                                            <TableCell sx={{ border: '1px solid #ccc' }}>Name</TableCell>
                                            <TableCell
                                                sx={{
                                                    border: '1px solid #ccc',
                                                    display: { xs: 'none', sm: 'table-cell' },
                                                }}
                                            >
                                                Phone
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    border: '1px solid #ccc',
                                                    display: { xs: 'none', sm: 'table-cell' },
                                                }}
                                            >
                                                Net Weight
                                            </TableCell>
                                            <TableCell sx={{ border: '1px solid #ccc' }}>Due</TableCell>
                                            <TableCell sx={{ border: '1px solid #ccc' }}>Amount</TableCell>
                                            <TableCell sx={{ border: '1px solid #ccc' }}>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {paginatedData.map((row, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{
                                                    borderBottom: '1px solid #ccc', // Adds border between rows
                                                }}
                                            >
                                                <TableCell sx={{ border: '1px solid #ccc' }}>{row.billNumber}</TableCell>
                                                <TableCell sx={{ border: '1px solid #ccc' }}>{row.date}</TableCell>
                                                <TableCell sx={{ border: '1px solid #ccc' }}>{row.customerName}</TableCell>
                                                <TableCell
                                                    sx={{
                                                        border: '1px solid #ccc',
                                                        display: { xs: 'none', sm: 'table-cell' },
                                                    }}
                                                >
                                                    {row.customerPhone}
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        border: '1px solid #ccc',
                                                        display: { xs: 'none', sm: 'table-cell' },
                                                    }}
                                                >
                                                    {row.totalNetWeight}
                                                </TableCell>
                                                <TableCell sx={{ border: '1px solid #ccc' }}>{row.currentDue}</TableCell>
                                                <TableCell sx={{ border: '1px solid #ccc' }}>{row.closingBalance}</TableCell>
                                                <TableCell sx={{ border: '1px solid #ccc' }}>
                                                    <IconButton
                                                        size="small"
                                                        color="primary"
                                                        onClick={() => handlePreview(row)}
                                                        sx={{ color: '#1e1e2f' }}
                                                    >
                                                        <PreviewIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={() => handleOpenDialog(row.billNumber)}
                                                    >
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


                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '16px',
                                width: { xs: '100vw', sm: '100%' },
                            }}
                        >
                            <Typography variant="body2">
                                Showing {paginatedData.length} of {totalRecords}
                            </Typography>
                            <Pagination
                                count={Math.ceil(totalRecords / resultsPerPage)}
                                page={currentPage}
                                onChange={handlePageChange}
                            />
                        </Box>
                    </>
                )}
            </Box>
        </Container>
    );
};

export default ReceiptHistory;
