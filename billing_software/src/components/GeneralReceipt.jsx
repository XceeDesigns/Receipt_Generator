import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {
    Box,
    Button,
    Divider,
    Grid,
    Paper,
    Typography,
    TextField,
    IconButton,
} from "@mui/material";
import { PictureAsPdf } from "@mui/icons-material";

const GeneralReceipt = ({ receiptData }) => {
    const receiptRef = useRef();

    const downloadPdf = async () => {
        const element = receiptRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        pdf.save('receipt.pdf');
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", color: "#333" }}>
                Receipt
            </Typography>

            <Grid container spacing={3} ref={receiptRef}>
                <Grid item xs={12}>
                    <Paper variant="outlined" sx={{ padding: 3, backgroundColor: "#ffffff" }}>
                        {/* Header Section */}
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                Business Name
                            </Typography>
                            <Typography>Date: {receiptData.date}</Typography>
                        </Box>

                        {/* From and To Sections */}
                        <Grid container spacing={2}>
                            {/* From Section */}
                            <Grid item xs={6}>
                                <Typography variant="subtitle1" gutterBottom sx={{ color: "#555" }}>
                                    From
                                </Typography>
                                <Typography>Business Name</Typography>
                                <Typography>Email: business@example.com</Typography>
                                <Typography>Address: 123 Main St, City</Typography>
                                <Typography>Phone: 123-456-7890</Typography>
                            </Grid>

                            {/* Bill To Section */}
                            <Grid item xs={6}>
                                <Typography variant="subtitle1" gutterBottom sx={{ color: "#555" }}>
                                    Bill To
                                </Typography>
                                <Typography>{receiptData.clientName}</Typography>
                                <Typography>Email: {receiptData.clientEmail}</Typography>
                                <Typography>Address: {receiptData.clientAddress}</Typography>
                                <Typography>Phone: {receiptData.clientPhone}</Typography>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 3 }} />

                        {/* Items Section */}
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                            Items
                        </Typography>
                        {receiptData.items.map((item, index) => (
                            <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
                                <Grid item xs={6}>
                                    <Typography>{item.description}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>Rate: ₹{item.rate}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>Qty: {item.qty}</Typography>
                                </Grid>
                            </Grid>
                        ))}

                        {/* Total Calculation */}
                        <Divider sx={{ my: 3 }} />
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="subtitle1">Total Amount:</Typography>
                            <Typography variant="subtitle1">₹{receiptData.total}</Typography>
                        </Box>

                        {/* Footer / Additional Notes */}
                        <Typography variant="subtitle1" sx={{ mt: 4 }}>
                            Notes
                        </Typography>
                        <Typography sx={{ color: "#555" }}>{receiptData.notes}</Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Download Button */}
            <Box display="flex" justifyContent="flex-end" mt={3}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PictureAsPdf />}
                    onClick={downloadPdf}
                >
                    Download as PDF
                </Button>
            </Box>
        </Box>
    );
};

export default GeneralReceipt;
