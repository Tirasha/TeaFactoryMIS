import React, { useEffect, useState } from 'react';
import { Box, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import axios from 'axios';

const InventoryAssistDashboard = () => {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/inventory/all`)
      .then(response => {
        console.log('Data fetched successfully:', response.data); // Check if data is correctly logged
        setRows(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error.response || error.message);
        setError('There was an error fetching the data!');
      });
  }, []);
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, backgroundColor: '#f5f5f5', height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Inventory Dashboard
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer component={Paper}>
        <Table size ="small">
          <TableHead>
            <TableRow>
              <TableCell>Inventory Id</TableCell>
              <TableCell>Tea Type</TableCell>
              <TableCell>Available Stock</TableCell>
              <TableCell>Price per kg</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.inv_id}>
                <TableCell>{row.inv_id}</TableCell>
                <TableCell>{row.tea_type}</TableCell>
                <TableCell>{row.available_stock}</TableCell>
                <TableCell>{row.price_per_kg}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InventoryAssistDashboard;
