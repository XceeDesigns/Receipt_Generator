import React, { useRef } from 'react';
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
import { useLocation } from 'react-router-dom';
import { PictureAsPdf } from "@mui/icons-material";

const JewellerReceipt = () => {

  const { state } = useLocation();
  const { formValues, items } = state || {};

  const receiptRef = useRef();

  if (!formValues || !items) {
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
    <Box sx={{ padding: 1, minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Box sx={{ padding: 3, backgroundColor: "white", margin: 4 }} ref={receiptRef}>
        {/* Header */}
        <Typography variant="h5" align="center" gutterBottom>
          {formValues.businessName}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          {formValues.address} <br />
          {formValues.phone}
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          {formValues.documentTitle}
        </Typography>

        {/* Customer Info and Invoice Details */}
        <Grid container spacing={2} sx={{ marginY: 2 }}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Customer Name & Address:</Typography>
            <Typography variant="body2">{formValues.customerName}</Typography>
            <Typography variant="body2">{formValues.customerAddress}</Typography>
            <Typography variant="body2">Phone: {formValues.customerPhone}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" align="right">Bill No.: {formValues.billNo}</Typography>
            <Typography variant="body2" align="right">Date: {formValues.date}</Typography>
            <Typography variant="body2" align="right">24K Rate: {formValues.rate24K}</Typography>
            <Typography variant="body2" align="right">Silver Bhav: {formValues.silverBhav}</Typography>
          </Grid>
        </Grid>

        {/* Table of Items */}
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
              {/* Row 1 */}
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell align="right">{item.grossWeight}</TableCell>
                  <TableCell align="right">{item.lessWeight}</TableCell>
                  <TableCell align="right">{item.netWeight}</TableCell>
                  <TableCell align="right">{item.tunch}</TableCell>
                  <TableCell align="right">{item.rate}</TableCell>
                  <TableCell align="right">{item.gold}</TableCell>
                  <TableCell align="right">{item.silver}</TableCell>
                  <TableCell align="right">{item.labour}</TableCell>
                  <TableCell align="right">{item.amount}</TableCell>
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
                {items.reduce((acc, item) => acc + (Number(item.amount) || 0), 0).toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Closing Balance */}
        <Typography variant="h6" align="right" sx={{ marginY: 2 }}>
          Closing Balance: {items.reduce((acc, item) => acc + (Number(item.amount) || 0), 0).toFixed(2)}
        </Typography>

        {/* Terms & Conditions */}
        <Typography variant="body2" sx={{ marginTop: 4 }}>
          <strong>Terms & Conditions:</strong><br />
          18k return in {formValues.terms18K}<br />
          20k return in {formValues.terms20K}<br />
          22k return in {formValues.terms22K}
        </Typography>

        {/* Authorized Signature */}
        <Typography align="right" sx={{ marginTop: 4 }}>
          Authorized Signatory
        </Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end" mt={3} mr={4}>
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