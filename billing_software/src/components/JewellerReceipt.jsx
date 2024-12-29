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
  Divider,
} from '@mui/material';
import { PictureAsPdf } from '@mui/icons-material';
import { ReceiptContext } from '../context/ReceiptContext';
import { UserContext } from '../context/UserContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const JewellerReceipt = () => {
  const receiptRef = useRef();
  const { receiptData, setReceiptData } = useContext(ReceiptContext);
  const navigate = useNavigate();
  const backend_url = process.env.REACT_APP_BACKEND_URL;

  const downloadPdf = async () => {
    const element = receiptRef.current;
    element.style.width = '794px'; // A4 size width
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 190; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save(`${receiptData.billNumber}.pdf`);
    toast.success('PDF downloaded successfully!');
    try {
      const response = await fetch(`${backend_url}/api/receipt/save`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,

        },

        body: JSON.stringify(receiptData),
      });

      if (response.ok) {
        console.log('Receipt saved successfully');
      } else {
        console.log('Error saving receipt');
      }
    } catch (error) {
      console.log('Error saving receipt');
      return;
    }
    setReceiptData({
      businessName: '',
      address: '',
      phone: '',
      documentTitle: '',
      customerName: '',
      customerAddress: '',
      customerPhone: '',
      gst: '',
      cgst: '',
      cgstValue: '',
      sgst: '',
      sgstValue: '',
      totalGst: '',
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
    });

    navigate('/dashboard/rough-receipt');
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
      <Box
        ref={receiptRef}
        sx={{
          backgroundColor: '#fff',
          padding: 4,
          borderRadius: 3,
          boxShadow: 4,
          maxWidth: '800px',
          margin: 'auto',
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
            {receiptData.businessName}
          </Typography>
          <Typography variant="body2" sx={{ marginY: 1 }}>
            {receiptData.address}
            <br />
            {receiptData.phone}
          </Typography>
          <Typography
            variant="h6"
            sx={{ textTransform: 'uppercase', marginTop: 2, fontWeight: 'bold' }}
          >
            {receiptData.documentTitle}
          </Typography>
        </Box>

        {/* Customer & Invoice Details */}
        <Grid container spacing={3} sx={{ marginBottom: 4 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <strong>Customer Name:</strong> {receiptData.customerName}
            </Typography>
            <Typography variant="body2">
              <strong>Address:</strong> {receiptData.customerAddress}
            </Typography>
            <Typography variant="body2">
              <strong>Phone:</strong> {receiptData.customerPhone}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
            <Typography variant="body2">
              <strong>Bill No.:</strong> {receiptData.billNumber}
            </Typography>
            <Typography variant="body2">
              <strong>Date:</strong> {receiptData.date}
            </Typography>
            <Typography variant="body2">
              <strong>Gold Rate:</strong> {receiptData._24kRate}
            </Typography>
            <Typography variant="body2">
              <strong>Silver Rate:</strong> {receiptData.silverBhav}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 2 }} />

        <TableContainer component={Paper} sx={{ marginBottom: 0 }}>
          <Table>
            <TableBody>
              <TableRow>
                {/* First Column */}
                <TableCell
                  sx={{
                    width: '50%',
                    border: '1px solid #ccc',
                    textAlign: 'left',
                    padding: 2
                  }}
                >
                  <Typography variant="body2">
                    GSTIN: {receiptData.gst}
                  </Typography>
                </TableCell>

                {/* Second Column */}
                <TableCell
                  sx={{
                    width: '50%',
                    border: '1px solid #ccc',
                    textAlign: 'left',
                    padding: 2
                  }}
                >
                  <Typography variant="body2" textAlign="center">
                    Original/Duplicate
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Items Table */}
        <TableContainer component={Paper} sx={{ marginTop: 2, marginBottom: 3 }}>
          <Table
            size="small"
            sx={{
              border: '1px solid rgba(224, 224, 224, 1)', // Border for the entire table
              borderRadius: '8px', // Optional, adds rounded corners
            }}
          >
            <TableHead>
              <TableRow>
                {[
                  'Description',
                  'G. Wt (g)',
                  'S. Wt (g)',
                  'S. Value (₹)',
                  'L. Wt (g)',
                  'N. Wt (g)',
                  'Tunch (%)',
                  'Rate (₹)',
                  'Gold',
                  'Silver',
                  'Labour (₹)',
                  'Amount (₹)',
                ].map((header, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      fontSize: '12px',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      padding: '8px',
                      border: '1px solid rgba(224, 224, 224, 1)', // Adds border to the cells
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {receiptData.items.map((item, index) => (
                <TableRow key={index}>
                  {[
                    `${item.description} (${item.type})`,
                    item.gWt,
                    item.sWt,
                    item.sRate,
                    item.lWt,
                    item.nWt,
                    `${item.tunch}%`,
                    item.rate,
                    item.gold,
                    item.silver,
                    item.labour,
                    item.amount,
                  ].map((value, colIndex) => (
                    <TableCell
                      key={colIndex}
                      sx={{
                        fontSize: '12px',
                        textAlign: colIndex === 0 ? 'left' : 'center',
                        padding: '8px',
                        border: '1px solid rgba(224, 224, 224, 1)', // Adds border to the cells
                      }}
                    >
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow>
                <TableCell
                  sx={{
                    textAlign: 'right',
                    border: '1px solid rgba(224, 224, 224, 1)', // Border for the cell
                  }}
                >
                  Total:
                </TableCell>
                <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}></TableCell>
                <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}></TableCell>
                <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}></TableCell>
                <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}></TableCell>
                <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
                  {receiptData.totalNetWeight}
                </TableCell>
                <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}></TableCell>
                <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}></TableCell>
                <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}></TableCell>
                <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}></TableCell>
                <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>with GST</TableCell>
                <TableCell
                  sx={{
                    textAlign: 'right',
                    border: '1px solid rgba(224, 224, 224, 1)', // Border for the cell
                  }}
                >
                  {receiptData.closingBalance}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>


        <TableContainer>
          <Table sx={{ width: '100%' }} size="small">
            <TableBody>
              <TableRow>
                {/* Left Column */}
                <TableCell sx={{ width: '50%', verticalAlign: 'top', border: '1px solid #ccc' }}>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell align="left" sx={{ border: '1px solid #ccc' }}>
                          <strong>CGST</strong>
                        </TableCell>
                        <TableCell align="left" sx={{ border: '1px solid #ccc' }}>
                          {receiptData.cgst}%
                        </TableCell>
                        <TableCell align="right" sx={{ border: '1px solid #ccc' }}>
                          ₹{receiptData.cgstValue}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left" sx={{ border: '1px solid #ccc' }}>
                          <strong>SGST</strong>
                        </TableCell>
                        <TableCell align="left" sx={{ border: '1px solid #ccc' }}>
                          {receiptData.sgst}%
                        </TableCell>
                        <TableCell align="right" sx={{ border: '1px solid #ccc' }}>
                          ₹{receiptData.sgstValue}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left" sx={{ border: '1px solid #ccc' }}>
                          <strong>Total</strong>
                        </TableCell>
                        <TableCell align="left" sx={{ border: '1px solid #ccc' }} />
                        <TableCell align="right" sx={{ border: '1px solid #ccc' }}>
                          ₹{receiptData.totalGst}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableCell>

                {/* Right Column */}
                <TableCell sx={{ width: '50%', verticalAlign: 'top', border: '1px solid #ccc' }}>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell align="left" sx={{ border: '1px solid #ccc' }}>
                          <strong>Closing Balance </strong>(with GST):
                        </TableCell>
                        <TableCell align="right" sx={{ border: '1px solid #ccc' }}>
                          ₹{receiptData.closingBalance}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left" sx={{ border: '1px solid #ccc' }}>
                          <strong>Paid Amount:</strong>
                        </TableCell>
                        <TableCell align="right" sx={{ border: '1px solid #ccc' }}>
                          ₹{receiptData.paidAmount}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left" sx={{ border: '1px solid #ccc' }}>
                          <strong>Due Amount:</strong>
                        </TableCell>
                        <TableCell align="right" sx={{ border: '1px solid #ccc' }}>
                          ₹{receiptData.currentDue}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>




        {/* Footer */}
        <Typography variant="body2" sx={{ marginTop: 4 }}>
          <strong>Terms & Conditions:</strong>
          <br />
          18k return in {receiptData._18kReturn}
          <br />
          20k return in {receiptData._20kReturn}
          <br />
          22k return in {receiptData._22kReturn}
        </Typography>
        <Typography align="right" variant="body2" sx={{ marginTop: 4 }}>
          Authorized Signatory
        </Typography>
      </Box>

      {/* Download Button */}
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
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
