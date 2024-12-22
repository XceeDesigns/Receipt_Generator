import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import {
    Box,
    Button,
    IconButton,
    TextField,
    Typography,
    Modal,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newItem, setNewItem] = useState({
        user: '',
        itemName: '',
        gWt: '',
        lWt: '',
        nWt: '',
        tunch: '',
        type: '',
        quantity: '',
    });
    const [editItem, setEditItem] = useState(null);

    const backend_url = process.env.REACT_APP_BACKEND_URL;

    // Decode token to get user email
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setNewItem((prev) => ({ ...prev, user: decoded.sub }));
        }
    }, []);

    // Function to fetch items from the backend
    const fetchItems = async () => {
        try {
            const response = await fetch(`${backend_url}/api/product/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setItems(data);
            } else {
                console.error('Failed to fetch items');
            }
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    // Handle search input
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle editing an item
    const handleEdit = (item) => {
        setEditItem(item);
        setIsEditModalOpen(true);
    };

    // Handle deleting an item
    const handleDelete = async (index, _id) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);

        try {
            const response = await fetch(`${backend_url}/api/product/delete/${_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.ok) {
                console.log('Item deleted successfully');
            } else {
                console.error('Failed to delete item');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    // Handle modal opening and closing for Add Item
    const handleAddModalOpen = () => setIsAddModalOpen(true);
    const handleAddModalClose = () => setIsAddModalOpen(false);

    // Handle modal opening and closing for Edit Item
    const handleEditModalClose = () => setIsEditModalOpen(false);

    // Handle input changes for the new item form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem((prev) => ({ ...prev, [name]: value }));
    };

    // Handle editing item input changes
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditItem((prev) => ({ ...prev, [name]: value }));
    };

    // Handle adding a new item
    const handleAddItem = async () => {
        try {
            const response = await fetch(`${backend_url}/api/product/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(newItem),
            });
            if (response.ok) {
                await fetchItems();  // Re-fetch items after adding
                handleAddModalClose();
            } else {
                console.error('Failed to add item');
            }
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    // Handle editing an item
    const handleEditItem = async () => {
        try {
            const response = await fetch(`${backend_url}/api/product/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(editItem),
            });
            if (response.ok) {
                await fetchItems();  // Re-fetch items after editing
                handleEditModalClose();
            } else {
                console.error('Failed to edit item');
            }
        } catch (error) {
            console.error('Error editing item:', error);
        }
    };

    // Filter items based on the search term
    const filteredItems = items.filter((item) =>
        typeof item.itemName === 'string' && item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Fetch items initially
    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <Box sx={{ padding: '24px' }}>
            {/* Search bar and Add Item button */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                }}
            >
                <TextField
                    label="Search Items"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                    sx={{ flex: 1, marginRight: '16px' }}
                />
                <Button variant="contained" color="primary" onClick={handleAddModalOpen} sx={{ backgroundColor: '#1e1e2f' }}>
                    Add Item
                </Button>
            </Box>

            {/* Items List */}
            <Box>
                {filteredItems.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            marginBottom: '8px',
                        }}
                    >
                        <Box>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                {item.itemName} ({item.type})
                            </Typography>
                            <Typography variant="body2">
                                Gross Weight: {item.gWt}, Net Weight: {item.nWt}
                            </Typography>
                            <Typography variant="body2">
                                Tunch: {item.tunch}, Quantity: {item.quantity}
                            </Typography>
                        </Box>
                        <Box>
                            <IconButton
                                color="primary"
                                onClick={() => handleEdit(item)}
                                sx={{ marginRight: '8px', color: '#1e1e2f' }}
                            >
                                <Edit />
                            </IconButton>
                            <IconButton
                                color="secondary"
                                onClick={() => handleDelete(index, item._id)}
                                sx={{ color: 'red' }}
                            >
                                <Delete />
                            </IconButton>
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* Add Item Modal */}
            <Modal open={isAddModalOpen} onClose={handleAddModalClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: 300, sm: 400 },
                        bgcolor: 'background.paper',
                        p: 4,
                        boxShadow: 24,
                        borderRadius: 2,
                    }}
                >
                    <Typography
                        variant="h6"
                        component="h2"
                        mb={3}
                        sx={{ textAlign: 'center', fontWeight: 'bold' }}
                    >
                        Add New Item
                    </Typography>
                    <Grid container spacing={2}>
                        {Object.keys(newItem).map((key) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                key={key}
                                sx={{ display: key === 'user' ? 'none' : 'block' }}
                            >
                                {key === 'type' ? (
                                    <FormControl fullWidth>
                                        <InputLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</InputLabel>
                                        <Select
                                            value={newItem[key]}
                                            name={key}
                                            onChange={handleInputChange}
                                        >
                                            <MenuItem value="Gold">Gold</MenuItem>
                                            <MenuItem value="Silver">Silver</MenuItem>
                                            <MenuItem value="Diamond">Diamond</MenuItem>
                                        </Select>
                                    </FormControl>
                                ) : (
                                    <TextField
                                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                                        name={key}
                                        value={newItem[key]}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                )}
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={handleAddModalClose}
                            sx={{
                                borderColor: '#1e1e2f',
                                color: '#1e1e2f',
                                '&:hover': {
                                    borderColor: '#1e1e2f',
                                    backgroundColor: '#1e1e2f',
                                    color: '#fff',
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#1e1e2f',
                                '&:hover': {
                                    backgroundColor: '#141426',
                                },
                            }}
                            onClick={handleAddItem}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>


            {/* Edit Item Modal */}
            <Modal open={isEditModalOpen} onClose={handleEditModalClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: 300, sm: 400 },
                        bgcolor: 'background.paper',
                        p: 4,
                        boxShadow: 24,
                        borderRadius: 2,
                    }}
                >
                    <Typography
                        variant="h6"
                        component="h2"
                        mb={3}
                        sx={{ textAlign: 'center', fontWeight: 'bold' }}
                    >
                        Edit Item
                    </Typography>
                    <Grid container spacing={2}>
                        {editItem &&
                            Object.keys(editItem).map((key) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    key={key}
                                    sx={{ display: key === '_id' || key === 'user' ? 'none' : 'block' }}
                                >
                                    {key === 'type' ? (
                                        <FormControl fullWidth>
                                            <InputLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</InputLabel>
                                            <Select
                                                value={editItem[key]}
                                                name={key}
                                                onChange={handleEditInputChange}
                                            >
                                                <MenuItem value="Gold">Gold</MenuItem>
                                                <MenuItem value="Silver">Silver</MenuItem>
                                                <MenuItem value="Diamond">Diamond</MenuItem>
                                            </Select>
                                        </FormControl>
                                    ) : (
                                        <TextField
                                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                                            name={key}
                                            value={editItem[key]}
                                            onChange={handleEditInputChange}
                                            fullWidth
                                        />
                                    )}
                                </Grid>
                            ))}
                    </Grid>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={handleEditModalClose}
                            sx={{
                                borderColor: '#1e1e2f',
                                color: '#1e1e2f',
                                '&:hover': {
                                    borderColor: '#1e1e2f',
                                    backgroundColor: '#1e1e2f',
                                    color: '#fff',
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#1e1e2f',
                                '&:hover': {
                                    backgroundColor: '#141426',
                                },
                            }}
                            onClick={handleEditItem}
                        >
                            Update
                        </Button>
                    </Box>
                </Box>
            </Modal>

        </Box>
    );
};

export default Inventory;
