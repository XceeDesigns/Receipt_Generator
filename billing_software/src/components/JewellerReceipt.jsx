import React, { useRef, useContext } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container
} from '@mui/material';
import { PictureAsPdf } from "@mui/icons-material";
import { ReceiptContext } from '../context/ReceiptContext';
import { UserContext } from '../context/UserContext';

const JewellerReceipt = () => {
  const receiptRef = useRef();
  const { receiptData, setReceiptData } = useContext(ReceiptContext);
  const { user } = useContext(UserContext);

  const backend_url = process.env.REACT_APP_BACKEND_URL;

  if (!receiptData || !receiptData.items) {
    return <Typography variant="h6">No receipt data available.</Typography>;
  }

  const downloadPdf = async () => {
    const element = receiptRef.current;

    // Set fixed width for A4 size
    element.style.width = "794px"; // A4 width at 96 DPI
    element.style.padding = "20px"; // Add padding for better spacing

    // Use html2canvas with scaling for high-resolution images
    const canvas = await html2canvas(element, {
      scale: 2, // Adjust scaling for higher resolution
      useCORS: true, // Ensure cross-origin content works
    });

    const imgData = canvas.toDataURL('image/png');

    // Create the PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 190; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);

    // Save PDF
    pdf.save('receipt.pdf');

    // Reset the element's width after PDF generation
    element.style.width = "auto";


    setReceiptData({ ...receiptData, user: user });

    const response = await fetch(`${backend_url}/api/receipt/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(receiptData)
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <Box sx={{ padding: 2, minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Box
        sx={{
          padding: { xs: 2, md: 3 },
          backgroundColor: "white",
          margin: { xs: 2, md: 4 },
          borderRadius: 2,
          boxShadow: 3,
        }}
        ref={receiptRef}
      >
        {/* Header */}
        <Typography variant="h5" align="center" gutterBottom>
          {receiptData.businessName}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          {receiptData.address} <br />
          {receiptData.phone}
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          {receiptData.documentTitle}
        </Typography>

        {/* Customer Info and Invoice Details */}
        <Grid container spacing={2} sx={{ marginY: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Customer Name & Address:</Typography>
            <Typography variant="body2">{receiptData.customerName}</Typography>
            <Typography variant="body2">{receiptData.customerAddress}</Typography>
            <Typography variant="body2">Phone: {receiptData.customerPhone}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" align="right">
              Bill No.: {receiptData.billNumber}
            </Typography>
            <Typography variant="body2" align="right">
              Date: {receiptData.date}
            </Typography>
            <Typography variant="body2" align="right">
              24K Rate: {receiptData._24kRate}
            </Typography>
            <Typography variant="body2" align="right">
              Silver Bhav: {receiptData.silverBhav}
            </Typography>
          </Grid>
        </Grid>

        {/* Table of Items */}
        <Box sx={{ overflowX: "auto" }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">G. Wt.</TableCell>
                  <TableCell align="right">L. Wt.</TableCell>
                  <TableCell align="right">Net Wt.</TableCell>
                  <TableCell align="right">Tunch</TableCell>
                  <TableCell align="right">Rate</TableCell>
                  <TableCell align="right">Gold</TableCell>
                  <TableCell align="right">Silver</TableCell>
                  <TableCell align="right">Labour</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {receiptData.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell align="right">{item.gWt}gm</TableCell>
                    <TableCell align="right">{item.lWt}gm</TableCell>
                    <TableCell align="right">{item.nWt}gm</TableCell>
                    <TableCell align="right">{item.tunch}%</TableCell>
                    <TableCell align="right">₹{item.rate}</TableCell>
                    <TableCell align="right">{item.gold}gm</TableCell>
                    <TableCell align="right">{item.silver}gm</TableCell>
                    <TableCell align="right">₹{item.labour}</TableCell>
                    <TableCell align="right">₹{item.amount}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={6} align="left">
                    <strong>Total</strong> 
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
                  (Net Weight) : {receiptData.totalNetWeight}gm <br/> ₹{receiptData.closingBalance}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Closing Balance */}
        <Typography variant="h6" align="right" sx={{ marginY: 2 }}>
          Closing Balance: ₹{receiptData.closingBalance}
        </Typography>
        <Typography variant="h6" align="right" sx={{ marginY: 2 }}>
          Paid Amount: ₹{receiptData.paidAmount}
        </Typography>
        <Typography variant="h6" align="right" sx={{ marginY: 2 }}>
          Due Amount: ₹{receiptData.currentDue}
        </Typography>

        {/* Terms & Conditions */}
        <Typography variant="body2" sx={{ marginTop: 4 }}>
          <strong>Terms & Conditions:</strong>
          <br />
          18k return in {receiptData._18kReturn}
          <br />
          20k return in {receiptData._20kReturn}
          <br />
          22k return in {receiptData._22kReturn}
        </Typography>

        {/* Authorized Signature */}
        <Typography align="right" sx={{ marginTop: 4 }}>
          Authorized Signatory
        </Typography>
      </Box>
      <Box display="flex" justifyContent={{ xs: "center", md: "flex-end" }} mt={3} mr={{ xs: 0, md: 4 }}>
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

export default JewellerReceipt;
