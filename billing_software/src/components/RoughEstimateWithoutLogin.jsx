// ✅ Final polished RoughEstimate page — responsive + professional
import React, { useState, useContext, useEffect } from "react";
import {
  Box, Grid, TextField, Typography, Button, Divider, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Save, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ReceiptContext } from "../context/ReceiptContext";
import { jwtDecode } from "jwt-decode";

const HeaderCell = styled(TableCell)(() => ({ fontWeight: 700, background: "#f2f2f2" }));

export default function RoughEstimate(){
  const navigate = useNavigate();
  const { receiptData, setReceiptData } = useContext(ReceiptContext);
  const backend = process.env.REACT_APP_BACKEND_URL;

  const [items,setItems] = useState([{type:"Gold",description:"",gWt:"",sWt:"0",tunch:"",rate:"",amount:"0"}]);

  useEffect(()=>{ setReceiptData(p=>({...p,user:jwtDecode(localStorage.getItem("token")).sub})); },[]);
  useEffect(()=>{ (async()=>{
    const u = jwtDecode(localStorage.getItem("token")).sub;
    const r = await fetch(`${backend}/api/receipt/fetch/${u}`,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});
    const d = await r.json(); if(!d.length) return;
    const last=d.at(-1);
    setReceiptData(p=>({...p,...last,billNumber:`BILL-${+last.billNumber.split('-')[1]+1}`,date:new Date().toISOString().slice(0,10)}));
  })(); },[]);

  const handleForm=(f,v)=>setReceiptData(p=>({...p,[f]:v}));
  const handleItem=(i,f,v)=>{
    const u=[...items]; u[i][f]=v;
    const g=+u[i].gWt||0,s=+u[i].sWt||0,t=+u[i].tunch||0,rateSource=receiptData._24kRate||0;
    const nWt=((g*t)/100 - s).toFixed(3); const calc=(parseFloat(nWt)*(rateSource/10)).toFixed(2);
    u[i].rate=calc; u[i].amount=calc; setItems(u);
  };
  const addItem=()=>setItems([...items,{type:"Gold",description:"",gWt:"",sWt:"0",tunch:"",rate:"",amount:""}]);
  const closing=()=>items.reduce((t,i)=>t+(+i.amount||0),0).toFixed(2);

  const handlePreview=()=>{ setReceiptData(p=>({...p,items,closingBalance:closing()})); navigate("/dashboard/rough-receipt/preview"); };

return(
<Box sx={{minHeight:"100vh",bgcolor:"#fafafa",p:{xs:2,md:4}}}>
  <Box sx={{maxWidth:1200,mx:"auto",bgcolor:"white",p:{xs:2,md:4},borderRadius:2,boxShadow:3}}>

    <Typography variant="h5" fontWeight={700} mb={2}>Rough Estimate</Typography>
    <Typography fontSize={14} mb={2} color="gray">Fill the fields below to generate rough estimate</Typography>

    <Grid container spacing={2} mb={2}>
      <Grid item xs={12} sm={6} md={4}><TextField fullWidth label="Business Name" value={receiptData.businessName||""} onChange={e=>handleForm('businessName',e.target.value)} /></Grid>
      <Grid item xs={12} sm={6} md={4}><TextField fullWidth label="Phone" value={receiptData.phone||""} onChange={e=>handleForm('phone',e.target.value)} /></Grid>
      <Grid item xs={12} sm={6} md={4}><TextField fullWidth label="GST" value={receiptData.gst||""} onChange={e=>handleForm('gst',e.target.value)} /></Grid>
    </Grid>

    <Divider sx={{my:2}} />

    <Grid container spacing={2} mb={2}>
      <Grid item xs={12} sm={6} md={4}><TextField fullWidth label="Customer Name" value={receiptData.customerName||""} onChange={e=>handleForm('customerName',e.target.value)} /></Grid>
      <Grid item xs={12} sm={6} md={4}><TextField fullWidth label="Customer Phone" value={receiptData.customerPhone||""} onChange={e=>handleForm('customerPhone',e.target.value)} /></Grid>
      <Grid item xs={12} sm={6} md={4}><TextField fullWidth type="date" label="Date" value={receiptData.date||""} InputLabelProps={{shrink:true}} onChange={e=>handleForm('date',e.target.value)} /></Grid>
    </Grid>

    <TableContainer component={Paper} sx={{mb:2}}>
    <Table size="small">
      <TableHead><TableRow>
        <HeaderCell>Type</HeaderCell><HeaderCell>Description</HeaderCell><HeaderCell>G Wt</HeaderCell><HeaderCell>S Wt</HeaderCell><HeaderCell>Tunch</HeaderCell><HeaderCell>Rate</HeaderCell><HeaderCell>Amount</HeaderCell>
      </TableRow></TableHead>
      <TableBody>
      {items.map((r,i)=>(<TableRow key={i}>
        <TableCell><Select size="small" fullWidth value={r.type} onChange={e=>handleItem(i,'type',e.target.value)}><MenuItem value="Gold">Gold</MenuItem><MenuItem value="Silver">Silver</MenuItem></Select></TableCell>
        <TableCell><TextField size="small" fullWidth value={r.description} onChange={e=>handleItem(i,'description',e.target.value)} /></TableCell>
        <TableCell><TextField size="small" fullWidth value={r.gWt} onChange={e=>handleItem(i,'gWt',e.target.value)} /></TableCell>
        <TableCell><TextField size="small" fullWidth value={r.sWt} onChange={e=>handleItem(i,'sWt',e.target.value)} /></TableCell>
        <TableCell><TextField size="small" fullWidth value={r.tunch} onChange={e=>handleItem(i,'tunch',e.target.value)} /></TableCell>
        <TableCell><TextField size="small" fullWidth disabled value={r.rate} /></TableCell>
        <TableCell><TextField size="small" fullWidth disabled value={r.amount} /></TableCell>
      </TableRow>))}
      </TableBody>
    </Table></TableContainer>

    <Button variant="contained" onClick={addItem} sx={{mb:2}}>Add Item</Button>

    <Typography sx={{ fontWeight:700, mt:2 }}>Closing: ₹{closing()}</Typography>

    <Box sx={{display:"flex",gap:2,mt:3,flexWrap:"wrap"}}>
      <Button variant="contained" color="primary" startIcon={<Save/>} onClick={()=>window.print()}>Print</Button>
      <Button variant="outlined" startIcon={<Visibility/>} onClick={handlePreview}>Preview</Button>
    </Box>

  </Box>
</Box>
);
}