import React, { useState, useEffect } from 'react';
import {
    Box, Typography, TextField, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, Alert, MenuItem, Select,
    InputLabel, FormControl, FormHelperText, Dialog, DialogActions, 
    DialogContent, DialogTitle } from '@mui/material';
    const AddSales = () => {
        const [inventoryData, setInventoryData] = useState([]);
        const [salesData, setSalesData] = useState([]);
        const [searchTerm, setSearchTerm] = useState('');
        const [salesStatus, setSalesStatus] = useState(null); // Fixed initialization
        const [formData, setFormData] = useState({
            inventory_id: '',
            tea_Quantity: '',
            teaType: '',
            salesId: ''
        });
    
        const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
       
        useEffect(() => {
            fetchInventoryData();
            fetchSalesData();
        }, []);
    
        const fetchInventoryData = async () => {
            try {
                const response = await fetch('http://localhost:8080/inventory/all');
                if (response.ok) {
                    const data = await response.json();
                    setInventoryData(data);
                } else {
                    console.error('Failed to fetch inventory data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
    
        const fetchSalesData = async () => {
            try {
                const response = await fetch('http://localhost:8080/Sales/getsales');
                if (response.ok) {
                    const data = await response.json();
                    setSalesData(data);
                    const nextSalesId = calculateNextSalesId(data);
                    setFormData((prevFormData) => ({ ...prevFormData, salesId: nextSalesId }));
                } else {
                    console.error('Failed to fetch sales data');
                }
            } catch (error) {
                console.error('Error', error);
            }
        };
    
        const calculateNextSalesId = (salesData) => {
            if (salesData.length === 0) return 'S001';
    
            const maxNumericPart = salesData.reduce((max, sale) => {
                const numericPart = parseInt(sale.salesId.substring(1), 10);
                return Math.max(max, numericPart);
              }, 0);
            
              const nextNumericPart = maxNumericPart + 1;
              return `S${String(nextNumericPart).padStart(3, '0')}`;
            };
    
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };
    
        const handleFormSubmit = async (e) => {
            e.preventDefault();
    
            if (!formData.salesId || !formData.tea_Quantity || !formData.teaType || !formData.inventory_id) {
                setSalesStatus({ type: 'error', message: 'All fields are required' });
                return;
            }
    
            setOpenConfirmDialog(true);
        };
    
        const handleConfirmSale = async () => {
            const payload = {
                salesId: formData.salesId,
                teaType: formData.teaType,
                tea_Quantity: parseFloat(formData.tea_Quantity),
                inventory: { inventory_id: formData.inventory_id },
            };
    
            try {
                const response = await fetch('http://localhost:8080/Sales/addSales', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
    
                if (response.ok) {
                    setSalesStatus({ type: 'success', message: 'Sales record added successfully' });
                    setFormData({ inventory_id: '', tea_Quantity: '', teaType: '', salesId: '' });
                    fetchInventoryData(); // Refresh inventory data
                } else {
                    setSalesStatus({ type: 'error', message: 'Stock is not available' });
                }
            } catch (error) {
                setSalesStatus({ type: 'error', message: 'Error connecting to the server' });
            }
    
            setOpenConfirmDialog(false);
        };
    
        const handleCancelSale = () => {
            setOpenConfirmDialog(false);
        };
    
        const filteredInventory = inventoryData.filter(
            (item) =>
             item.inventory_id.includes(searchTerm) || item.type.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        return (
            <Box sx={{ display: 'flex', p: 5, backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: 'Arial' }}>
                <Box sx={{ flex: 3, pr: 2 }}>
                  
    
                    {salesStatus && (
                        <Alert severity={salesStatus.type} sx={{ mb: 3 }}>
                            {salesStatus.message}
                        </Alert>
                    )}
    
                    <Box
                        component="form"
                        onSubmit={handleFormSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            padding: 3,
                            backgroundColor: '#f0f0f0',
                            borderRadius: 2,
                            boxShadow: 3,
                        }}
                    >
                        <FormControl fullWidth>
                            <InputLabel id="inventory_id">Inventory Id</InputLabel>
                            <Select
                                label="Inventory ID"
                                name="inventory_id"
                                value={formData.inventory_id}
                                onChange={handleInputChange}
                                size="small"
                            >
                                {inventoryData.map((item) => (
                                    <MenuItem key={item.inventory_id} value={item.inventory_id}>
                                        {item.inventory_id}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Tea Quantity (kg)"
                            name="tea_Quantity"
                            type="number"
                            value={formData.tea_Quantity}
                            onChange={handleInputChange}
                            size="small"
                            sx={{ fontFamily: 'Calibri' }}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="teaType">Tea Type</InputLabel>
                            <Select
                                label="Tea Type"
                                name="teaType"
                                value={formData.teaType}
                                onChange={handleInputChange}
                                size="small"
                            >
                                {inventoryData.map((item) => (
                                    <MenuItem key={item.inventory_id} value={item.tea_type}>
                                        {item.tea_type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
    
                        <TextField
                            label="Sales ID"
                            name="salesId"
                            value={formData.salesId}
                            onChange={handleInputChange}
                            size="small"
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                backgroundColor: '#4CAF50',
                                width: '150px',
                                height: '40px',
                                color: '#fff',
                                '&:hover': { backgroundColor: '#388E3C' },
                            }}
                        >
                            Add Sale
                        </Button>
                    </Box>
                </Box>
    
                <Box sx={{ flex: 2, pl: 4 }}>
                    <TextField
                        label="Search Inventory"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ mb: 5 }}
                        size="small"
                    />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#77DD77' }}>
                                    <TableCell>Inventory ID</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Available Stock (kg)</TableCell>
                                    <TableCell>Price per kg</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredInventory.map((item) => (
                                    <TableRow key={item.inventory_id}>
                                        <TableCell>{item.inventory_id}</TableCell>
                                        <TableCell>{item.tea_type}</TableCell>
                                        <TableCell>{item.available_stock}</TableCell>
                                        <TableCell>{item.price_per_kg}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
    
                <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
                    <DialogTitle>Confirm Sale</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1">Are you sure you want to record this sale?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancelSale} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmSale} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        );
    };
    
    export default AddSales;
    