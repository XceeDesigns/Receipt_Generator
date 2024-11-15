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
} from "@mui/material";
import { PictureAsPdf } from "@mui/icons-material";
import { useLocation } from 'react-router-dom';

const GeneralReceipt = () => {
    const { state } = useLocation();
    const { receiptData } = state || {};

    const receiptRef = useRef();

    if (!receiptData) {
        return <Typography variant="h6">No receipt data available.</Typography>;
    }


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
            <Grid container spacing={3} ref={receiptRef}>
                <Grid item xs={12}>
                    <Paper variant="outlined" sx={{ padding: 4, backgroundColor: "#ffffff" }}>
                        {/* Header Section */}
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Box>
                                <Typography variant="h5" sx={{ fontWeight: "bold" }}>{receiptData.companyName}</Typography>
                                <Typography>{receiptData.companyLocation}</Typography>
                                <Typography>{receiptData.companyPhone}</Typography>
                                <Typography>{receiptData.companyEmail}</Typography>
                            </Box>
                            <Box textAlign="right">
                                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>INVOICE</Typography>
                                <Typography sx={{ mb: '5px' }}>{receiptData.estimateNumber}</Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Date:</Typography>
                                <Typography sx={{ mb: '5px' }}>{receiptData.date}</Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Balance Due:</Typography>
                                <Typography>Total: ₹ {receiptData.total}</Typography>
                            </Box>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        {/* Bill To Section */}
                        <Box mb={2}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>Bill To</Typography>
                            <Typography>{receiptData.clientName}</Typography>
                            <Typography>{receiptData.clientAddress}</Typography>
                        </Box>

                        <Divider sx={{ my: 2, height: '10px' }} />

                        {/* Items Table Headings */}
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1} sx={{ fontWeight: 'bold' }}>
                            <Typography sx={{ width: "50%" }}>Description</Typography>
                            <Typography sx={{ width: "16%", textAlign: "center" }}>Rate</Typography>
                            <Typography sx={{ width: "16%", textAlign: "center" }}>Quantity</Typography>
                            <Typography sx={{ width: "16%", textAlign: "center" }}>Amount</Typography>
                        </Box>

                        <Divider sx={{ mb: 2 }} />

                        {/* Items Table */}
                        {receiptData.desc.map((item, index) => (
                            <React.Fragment key={index}>
                                <Grid container spacing={2} sx={{ mb: 1 }}>
                                    <Grid item xs={6}>
                                        <Typography sx={{ fontWeight: "bold" }}>{item.title}</Typography>
                                        <Typography>{item.description}</Typography>
                                    </Grid>
                                    <Grid item xs={2} textAlign="center">
                                        <Typography>₹{item.rate}</Typography>
                                    </Grid>
                                    <Grid item xs={2} textAlign="center">
                                        <Typography>{item.qty}</Typography>
                                    </Grid>
                                    <Grid item xs={2} textAlign="center">
                                        <Typography>₹{item.rate * item.qty}</Typography>
                                    </Grid>
                                </Grid>
                                {index < receiptData.desc.length - 1 && (
                                    <Divider sx={{ mb: 1 }} />
                                )}
                            </React.Fragment>
                        ))}

                        {/* Total Calculation */}
                        <Divider sx={{ my: 2 }} />
                        <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>TOTAL: ₹ {receiptData.total}</Typography>
                        </Box>

                        {/* Footer / Additional Notes */}
                        <Typography variant="body2" sx={{ mt: 4, color: "#777" }}>
                            {receiptData.notes}
                        </Typography>
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
