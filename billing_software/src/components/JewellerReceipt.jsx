import React from 'react';
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
} from '@mui/material';

const JewellerReceipt = () => {
  return (
    <Box sx={{ padding: 4 }}>
      {/* Header */}
      <Typography variant="h5" align="center" gutterBottom>
        GAHOI JEWELLERS
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        GURU KRIPA MARKET (MAURANIPUR) <br />
        Phone: 8109522776
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        ROUGH ESTIMATE
      </Typography>

      {/* Customer Info and Invoice Details */}
      <Grid container spacing={2} sx={{ marginY: 2 }}>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Customer Name & Address:</Typography>
          <Typography variant="body2">ALOK SONI</Typography>
          <Typography variant="body2">MAU</Typography>
          <Typography variant="body2">Phone: [Customer Phone]</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" align="right">Bill No.: 414</Typography>
          <Typography variant="body2" align="right">Date: 10/11/2024</Typography>
          <Typography variant="body2" align="right">24K Rate: [Rate]</Typography>
          <Typography variant="body2" align="right">Silver Bhav: [Bhav]</Typography>
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
              <TableCell align="right">Labour</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Row 1 */}
            <TableRow>
              <TableCell>ANTIK JEWELLERY 20 20K</TableCell>
              <TableCell align="right">10.320</TableCell>
              <TableCell align="right">0.300</TableCell>
              <TableCell align="right">10.020</TableCell>
              <TableCell align="right">92.00</TableCell>
              <TableCell align="right">-</TableCell>
              <TableCell align="right">9,218</TableCell>
              <TableCell align="right">-</TableCell>
              <TableCell align="right">400</TableCell>
            </TableRow>
            {/* Row 2 */}
            <TableRow>
              <TableCell>STONES (0.30x400)</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            {/* Row 3 */}
            <TableRow>
              <TableCell>ANTIK JEWELLERY 20 20K</TableCell>
              <TableCell align="right">4.770</TableCell>
              <TableCell align="right">4.770</TableCell>
              <TableCell align="right">92.00</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">4,388</TableCell>
              <TableCell align="right">400</TableCell>
            </TableRow>
            {/* Total Row */}
            <TableRow>
              <TableCell colSpan={6} align="right">
                <strong>Total</strong>
              </TableCell>
              <TableCell align="right">13,606</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">400</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Closing Balance */}
      <Typography variant="h6" align="right" sx={{ marginY: 2 }}>
        Closing Balance: 13,606
      </Typography>

      {/* Terms & Conditions */}
      <Typography variant="body2" sx={{ marginTop: 4 }}>
        <strong>Terms & Conditions:</strong><br />
        18k return in 75.50%<br />
        20k return in 83.50%<br />
        22k return in 91.65%
      </Typography>

      {/* Authorized Signature */}
      <Typography align="right" sx={{ marginTop: 4 }}>
        Authorized Signatory
      </Typography>
    </Box>
  );
};

export default JewellerReceipt;