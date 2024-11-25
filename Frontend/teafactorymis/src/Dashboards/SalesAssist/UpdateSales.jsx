import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Alert, TextField, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions,
  DialogContent, DialogTitle
} from '@mui/material';

const UpdateSales = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [salesData, setSalesData] = useState([]);
  const [formData, setFormData] = useState({
    salesId: '',
    tea_Quantity: '',
    teaType: '',
    inventory_id: '',
  });
  const [updateStatus, setUpdateStatus] = useState(null);
  const [open, setOpen] = useState(false); 
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    fetchSales();
  }, []);

  // Fetch sales data from backend
  const fetchSales = async () => {
    try {
      const response = await fetch('http://localhost:8080/Sales/getsales');
      if (response.ok) {
        const data = await response.json();
        setSalesData(data);
      } else {
        console.error('Failed to fetch sales data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle row click to open update dialog
  const handleRowClick = (item) => {
    setFormData({
      salesId: item.salesId,
      tea_Quantity: item.teaQuantity,
      teaType: item.teaType,
      inventory_id: item.inventoryId,
    });
    setOpen(true);
  };

  // Close update dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit updated data
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.salesId || !formData.tea_Quantity || !formData.teaType || !formData.inventory_id) {
      setUpdateStatus({ type: 'error', message: 'All fields are required' });
      return;
    }

    const payload = {
      salesId: formData.salesId,
      tea_Quantity: parseFloat(formData.tea_Quantity),
      teaType: formData.teaType,
      inventory: { inventory_id: formData.inventory_id },
    };

    try {
      const response = await fetch(`http://localhost:8080/Sales/${formData.salesId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setUpdateStatus({ type: 'success', message: 'Sales record updated successfully!' });
        setFormData({ salesId: '', tea_Quantity: '', teaType: '', inventory_id: '' });
        fetchSales();
        handleClose(); 
      } else {
        setUpdateStatus({ type: 'error', message: 'Error updating sales record' });
      }
    } catch (error) {
      setUpdateStatus({ type: 'error', message: 'Error connecting to the server' });
    }
  };

  // Fetch sales history
  const handleCheckHistory = async () => {
    try {
      const response = await fetch('http://localhost:8080/Sales/history');
      if (response.ok) {
        const data = await response.json();
        setHistoryData(data);
        setHistoryOpen(true);
      } else {
        console.error('Failed to fetch sales history');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Close history dialog
  const handleHistoryClose = () => {
    setHistoryOpen(false);
  };

  const filteredSales = salesData.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
        (item.salesId && item.salesId.toLowerCase().includes(term)) ||
        (item.inventoryId && item.inventoryId.toLowerCase().includes(term)) ||
        (item.teaType && item.teaType.toLowerCase().includes(term))
    );
  });

  return (
    <Box sx={{ display: 'flex', p: 5, backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: 'Arial' }}>
      <Box sx={{ flex: 2, pr: 2 }}>
       

        {updateStatus && (
          <Alert severity={updateStatus.type} sx={{ mb: 3 }}>
            {updateStatus.message}
          </Alert>
        )}

        <TextField
          label="Search Sales"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 5 }}
          size="small"
        />
        
        <Button variant="contained" onClick={handleCheckHistory} sx={{ mb: 3, backgroundColor: '#4CAF50', color: '#fff', '&:hover': { backgroundColor: '#388E3C' } }}>
          View Sales History
        </Button>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#77DD77' }}>
                <TableCell>Sales Id</TableCell>
                <TableCell>Inventory Id</TableCell>
                <TableCell>Tea Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Tea Quantity</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Available Stock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSales.map((item) => (
                <TableRow key={item.salesId} onClick={() => handleRowClick(item)} sx={{ cursor: 'pointer' }}>
                  <TableCell>{item.salesId}</TableCell>
                  <TableCell>{item.inventoryId}</TableCell>
                  <TableCell>{item.teaType}</TableCell>
                  <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                  <TableCell>{item.teaQuantity}</TableCell>
                  <TableCell>{item.totalAmount}</TableCell>
                  <TableCell>{item.availableStock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Update Sale Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Sale</DialogTitle>
        <DialogContent>
          <TextField label="Sales ID" name="salesId" value={formData.salesId} onChange={handleInputChange} size="small" fullWidth disabled sx={{ mb: 2 }} />
          <TextField label="Tea Quantity (kg)" name="tea_Quantity" type="number" value={formData.tea_Quantity} onChange={handleInputChange} size="small" fullWidth required sx={{ mb: 2 }} />
          <TextField label="Tea Type" name="teaType" value={formData.teaType} onChange={handleInputChange} size="small" fullWidth required sx={{ mb: 2 }} />
          <TextField label="Inventory ID" name="inventory_id" value={formData.inventory_id} onChange={handleInputChange} size="small" fullWidth sx={{ mb: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button variant="contained" onClick={handleFormSubmit} sx={{ backgroundColor: '#4CAF50', color: '#fff', '&:hover': { backgroundColor: '#388E3C' } }}>
            Update Sale
          </Button>
        </DialogActions>
      </Dialog>

      {/* Sales History Dialog */}
      <Dialog open={historyOpen} onClose={handleHistoryClose}>
        <DialogTitle>Sales History</DialogTitle>
        <DialogContent>
          {historyData.length > 0 ? (
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>History Id</TableCell>
                    <TableCell>deleted At</TableCell>
                    <TableCell>Inventory ID</TableCell>
                    <TableCell>Sales Id</TableCell>
                    <TableCell>Tea Type</TableCell>
                    <TableCell>Tea Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historyData.map((record) => (
                    <TableRow key={record.history_id}>
                       <TableCell>{record.history_id}</TableCell>
                      <TableCell>{new Date(record.deleted_at).toLocaleDateString()}</TableCell>
                      <TableCell>{record.inventory_id}</TableCell>
                      <TableCell>{record.sales_id}</TableCell>
                      <TableCell>{record.tea_type}</TableCell>
                      <TableCell>{record.tea_quantity}</TableCell>
                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No history records found.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleHistoryClose} color="secondary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UpdateSales;
