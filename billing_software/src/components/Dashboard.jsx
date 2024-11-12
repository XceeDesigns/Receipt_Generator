import React, { useState } from "react";
import {
    Box,
    Button,
    Divider,
    Grid,
    Paper,
    TextField,
    Typography,
    Select,
    MenuItem,
    Switch,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Email, Save, Send, PictureAsPdf, Add, Close } from "@mui/icons-material";

const Dashboard = () => {
    const [email, setEmail] = useState("");
    const [depositType, setDepositType] = useState("None");
    const [reviewEnabled, setReviewEnabled] = useState(false);
    const [reviewLink, setReviewLink] = useState("");
    const [items, setItems] = useState([{ description: "", rate: 0, qty: 1 }]);

    // Handle functions for form submission and validation
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleDepositTypeChange = (e) => setDepositType(e.target.value);
    const handleReviewLinkChange = (e) => setReviewLink(e.target.value);
    const handleSendEmail = () => {
        if (email) {
            alert(`Sending email to ${email}`);
        } else {
            alert("Please enter an email address");
        }
    };

    const handleAddItem = () => {
        setItems([...items, { description: "", rate: 0, qty: 1 }]);
    };

    const handleRemoveItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
    };

    const calculateTotal = () => {
        return items.reduce((total, item) => total + item.rate * item.qty, 0).toFixed(2);
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", color: "#333" }}>
                Invoice Generator
            </Typography>

            <Grid container spacing={3}>
                {/* Left Section */}
                <Grid item xs={8}>
                    <Paper variant="outlined" sx={{ padding: 3, backgroundColor: "#ffffff" }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                Invoice
                            </Typography>
                            <Button variant="outlined" startIcon={<Save />} size="small">
                                + Logo
                            </Button>
                        </Box>

                        <Grid container spacing={2}>
                            {/* From Section */}
                            <Grid item xs={6}>
                                <Typography variant="subtitle1" gutterBottom sx={{ color: "#555" }}>
                                    From
                                </Typography>
                                <TextField fullWidth label="Business Name" variant="outlined" margin="normal" />
                                <TextField fullWidth label="Email" variant="outlined" margin="normal" />
                                <TextField fullWidth label="Address" variant="outlined" margin="normal" />
                                <TextField fullWidth label="Phone" variant="outlined" margin="normal" />
                                <TextField fullWidth label="Business Number" variant="outlined" margin="normal" />
                                <Button variant="text" size="small">
                                    Show additional business details
                                </Button>
                            </Grid>

                            {/* Bill To Section */}
                            <Grid item xs={6}>
                                <Typography variant="subtitle1" gutterBottom sx={{ color: "#555" }}>
                                    Bill To
                                </Typography>
                                <TextField fullWidth label="Client Name" variant="outlined" margin="normal" />
                                <TextField fullWidth label="Email" variant="outlined" margin="normal" />
                                <TextField fullWidth label="Address" variant="outlined" margin="normal" />
                                <TextField fullWidth label="Phone" variant="outlined" margin="normal" />
                                <TextField fullWidth label="Mobile" variant="outlined" margin="normal" />
                                <TextField fullWidth label="Fax" variant="outlined" margin="normal" />
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 3 }} />

                        {/* Lower Section: Invoice Details */}
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                            Invoice Details
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField fullWidth label="Number" defaultValue="INV0001" variant="outlined" />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Date"
                                    type="date"
                                    defaultValue="2024-11-12"
                                    InputLabelProps={{ shrink: true }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Select fullWidth value="On Receipt" variant="outlined">
                                    <MenuItem value="On Receipt">On Receipt</MenuItem>
                                    <MenuItem value="Net 15">Net 15</MenuItem>
                                    <MenuItem value="Net 30">Net 30</MenuItem>
                                    <MenuItem value="Net 60">Net 60</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>

                        {/* Item Description Section */}
                        <Typography variant="subtitle1" sx={{ mt: 4, mb: 2 }}>
                            Items
                        </Typography>
                        {items.map((item, index) => (
                            <Grid container spacing={2} key={index}>
                                <Grid item xs={3}>
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        value={item.description}
                                        onChange={(e) =>
                                            handleItemChange(index, "description", e.target.value)
                                        }
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <TextField
                                        fullWidth
                                        label="Rate"
                                        type="number"
                                        value={item.rate}
                                        onChange={(e) => handleItemChange(index, "rate", parseFloat(e.target.value))}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <TextField
                                        fullWidth
                                        label="Rate"
                                        type="number"
                                        value={item.rate}
                                        onChange={(e) => handleItemChange(index, "rate", parseFloat(e.target.value))}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <TextField
                                        fullWidth
                                        label="Rate"
                                        type="number"
                                        value={item.rate}
                                        onChange={(e) => handleItemChange(index, "rate", parseFloat(e.target.value))}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <TextField
                                        fullWidth
                                        label="Rate"
                                        type="number"
                                        value={item.rate}
                                        onChange={(e) => handleItemChange(index, "rate", parseFloat(e.target.value))}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <TextField
                                        fullWidth
                                        label="Rate"
                                        type="number"
                                        value={item.rate}
                                        onChange={(e) => handleItemChange(index, "rate", parseFloat(e.target.value))}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        fullWidth
                                        label="Quantity"
                                        type="number"
                                        value={item.qty}
                                        onChange={(e) => handleItemChange(index, "qty", parseInt(e.target.value))}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        fullWidth
                                        label="Amount"
                                        value={(item.rate * item.qty).toFixed(2)}
                                        variant="outlined"
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton onClick={() => handleRemoveItem(index)} color="error">
                                        <Close />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        ))}
                        <Button
                            variant="text"
                            startIcon={<Add />}
                            onClick={handleAddItem}
                            sx={{ mt: 2 }}
                        >
                            Add Item
                        </Button>

                        {/* Summary Section */}
                        <Typography variant="subtitle1" sx={{ mt: 4 }}>
                            Summary
                        </Typography>
                        <Box display="flex" justifyContent="space-between" mt={2}>
                            <Typography>Subtotal:</Typography>
                            <Typography>₹{calculateTotal()}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" mt={1}>
                            <Typography>Total:</Typography>
                            <Typography>₹{calculateTotal()}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" mt={1}>
                            <Typography fontWeight="bold">Balance Due:</Typography>
                            <Typography fontWeight="bold">₹{calculateTotal()}</Typography>
                        </Box>

                        {/* Notes Section */}
                        <Typography variant="subtitle1" sx={{ mt: 4 }}>
                            Notes
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            placeholder="Add any relevant information, terms, or conditions."
                            variant="outlined"
                            sx={{ mt: 1 }}
                        />
                    </Paper>
                </Grid>

                {/* Right Section */}
                <Grid item xs={4}>
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
                            value={email}
                            onChange={handleEmailChange}
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
                            onClick={handleSendEmail}
                            sx={{ mt: 1 }}
                        >
                            Send
                        </Button>
                    </Paper>
                    <Box display="flex" justifyContent="flex-end" mt={2}>
                        <Button variant="outlined" sx={{ marginRight: 1 }} startIcon={<Save />}>
                            Record Payment
                        </Button>
                        <Button variant="outlined" sx={{ marginRight: 1 }} startIcon={<PictureAsPdf />}>
                            PDF
                        </Button>
                        <Button variant="contained" color="primary">
                            Email Invoice
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
