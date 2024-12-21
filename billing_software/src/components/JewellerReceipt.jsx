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
  Container,
  Divider
} from '@mui/material';
import { PictureAsPdf } from "@mui/icons-material";
import { ReceiptContext } from '../context/ReceiptContext';
import { UserContext } from '../context/UserContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const JewellerReceipt = () => {
  const receiptRef = useRef();
  const { receiptData, setReceiptData } = useContext(ReceiptContext);
  const { user } = useContext(UserContext);
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

const navigate = useNavigate();

  const backend_url = process.env.REACT_APP_BACKEND_URL;

  if (!receiptData || !receiptData.items) {
    return <Typography variant="h6">No receipt data available.</Typography>;
  }

  const downloadPdf = async () => {
    const element = receiptRef.current;

    // Set fixed width for A4 size
    element.style.width = "794px"; // A4 width at 96 DPI
    element.style.padding = "5px"; // Add padding for better spacing

    // Use html2canvas with scaling for high-resolution images
    const canvas = await html2canvas(element, {
      scale: 2, // Adjust scaling for higher resolution
      useCORS: true, // Ensure cross-origin content works
      windowWidth: element.scrollWidth, // Match the full table width
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/png');

    // Create the PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 190; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);

    // Save PDF
    pdf.save(`${receiptData.billNumber}.pdf`);

    // Reset the element's width after PDF generation
    element.style.width = "794px";  
    toast.success("PDF downloaded successfully!");

    const response = await fetch(`${backend_url}/api/receipt/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(receiptData)
    });
    const data = await response.json();
    // console.log(data);
    navigate("/dashboard/rough-receipt");
    setReceiptData(defaultReceiptData);
  };

  return (
    <Box sx={{ padding: 2, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Box
        sx={{
          padding: { xs: 2, md: 3 },
          backgroundColor: "white",
          margin: { xs: 2, md: 4 },
          borderRadius: 2,
          boxShadow: 3,
          width: "794px",
        }}
        ref={receiptRef}
      >
        {/* Header */}
        <Typography variant="h5" align="center" gutterBottom sx={{ textTransform: "uppercase", fontWeight: 'bold' }}>
          {receiptData.businessName}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          {receiptData.address} <br />
          {receiptData.phone}
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom sx={{ textTransform: "uppercase", fontWeight: 'bold', marginBottom: 6 }}>
          {receiptData.documentTitle}
        </Typography>

        {/* Customer Info and Invoice Details */}
        <Grid container spacing={2} sx={{ marginY: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">Customer Name: {receiptData.customerName}</Typography>
            <Typography variant="body2">Address: {receiptData.customerAddress}</Typography>
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
              Gold Rate: {receiptData._24kRate}
            </Typography>
            <Typography variant="body2" align="right">
              Silver Rate: {receiptData.silverBhav}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ marginTop: 6 }} />

        {/* Table of Items */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TableContainer component={Paper} sx={{ width: '794px', maxWidth: '100%' }}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: '12px', fontWeight: 'bold', padding: 1}}>Description</TableCell>
                  <TableCell align="left" sx={{ fontSize: '12px', fontWeight: 'bold', padding: 1}}>G. Wt.(g)</TableCell>
                  <TableCell align="left" sx={{ fontSize: '12px', fontWeight: 'bold', padding: 1}}>L. Wt.(g)</TableCell>
                  <TableCell align="left" sx={{ fontSize: '12px', fontWeight: 'bold', padding: 1}}>N. Wt.(g)</TableCell>
                  <TableCell align="left" sx={{ fontSize: '12px', fontWeight: 'bold', padding: 1}}>Tunch(%)</TableCell>
                  <TableCell align="left" sx={{ fontSize: '12px', fontWeight: 'bold', padding: 1}}>Rate(₹)</TableCell>
                  <TableCell align="left" sx={{ fontSize: '12px', fontWeight: 'bold', padding: 1}}>Gold</TableCell>
                  <TableCell align="left" sx={{ fontSize: '12px', fontWeight: 'bold', padding: 1}}>Silver</TableCell>
                  <TableCell align="left" sx={{ fontSize: '12px', fontWeight: 'bold', padding: 1}}>Labour(₹)</TableCell>
                  <TableCell align="left" sx={{ fontSize: '12px', fontWeight: 'bold', padding: 1}}>Amount(₹)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {receiptData.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontSize: '13px', padding: 1, width: '14%'}}>{item.description}</TableCell>
                    <TableCell align="left" sx={{ fontSize: '13px', width: '12%', padding: 1}}>{item.gWt}</TableCell>
                    <TableCell align="left" sx={{ fontSize: '13px', width: '12%', padding: 1}}>{item.lWt}</TableCell>
                    <TableCell align="left" sx={{ fontSize: '13px', width: '12%' , padding: 1}}>{item.nWt}</TableCell>
                    <TableCell align="left" sx={{ fontSize: '13px', width: '4%', padding: 1}}>{item.tunch}%</TableCell>
                    <TableCell align="left" sx={{ fontSize: '13px', width: '10%', padding: 1}}>{item.rate}</TableCell>
                    <TableCell align="left" sx={{ fontSize: '13px', width: '5%', padding: 1}}>{item.gold}</TableCell>
                    <TableCell align="left" sx={{ fontSize: '13px', width: '5%', padding: 1}}>{item.silver}</TableCell>
                    <TableCell align="left" sx={{ fontSize: '13px', width: '10%', padding: 1}}>{item.labour}</TableCell>
                    <TableCell align="left" sx={{ fontSize: '13px', width: '15%', padding: 1}}>{item.amount}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell sx={{padding: 1}}><strong>Total:</strong></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="left" sx={{ fontSize: '13px', padding: 1}}>{receiptData.totalNetWeight} g</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="left" sx={{ fontSize: '13px', padding: 1, width: '15%'}}>₹ {receiptData.closingBalance}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Closing Balance */}
        <Typography align="right" sx={{ marginTop: 2, fontSize: '12px' }}>
          Closing Balance: ₹{receiptData.closingBalance}
        </Typography>
        <Typography variant="subtitle1" align="right" sx={{ marginY: 1, fontSize: '12px' }}>
          Paid Amount: ₹{receiptData.paidAmount}
        </Typography>
        <Typography variant="subtitle1" align="right" sx={{ marginY: 1, fontSize: '12px' }}>
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
        <Typography align="right" sx={{ marginTop: 4 }} variant='body2'>
          Authorized Signatory
        </Typography>
      </Box>
      <Box>
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
