import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const Basics = () => {
  const [basic,setBasics]=useState([]);

  const loadBasics=async()=>{
    const result=await axios.get("http://localhost:8080/basics");
    setBasics(result.data);
    console.log(result.data);
  };

  useEffect(()=>{
    loadBasics();
  },[]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, backgroundColor: '#f5f5f5', height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Salary Basics
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="salary basic table">
          <TableHead>
            <TableRow>
              <TableCell>Basic ID</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Basic Amount</TableCell>
              <TableCell> Day Payment</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {basic.map((basics) => (
              <TableRow key={basics.basicID}>
                <TableCell>{basics.role}</TableCell>
                <TableCell>{basics.basicAmount}</TableCell>
                <TableCell>{basics.dayPayment}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
