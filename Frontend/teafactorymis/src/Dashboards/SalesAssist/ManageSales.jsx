import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ManageSales = () => {
    const [selectedAction, setSelectedAction] = useState(null);
    const [inventoryData, setInventoryData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        inventory_id: '',
        tea_Quantity: '',
        teaType: '',
        salesId: ''
    });

    useEffect(() => {
        fetchInventoryData();
    }, []);

    const fetchInventoryData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/all`);
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
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
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert('Sales record added successfully!');
                setFormData({ inventory_id: '', tea_Quantity: '', teaType: '', salesId: '' });
                fetchInventoryData(); // Refresh inventory data after adding sale
            } else {
                alert('Error adding sales record. Please try again.');
            }
        } catch (error) {
            alert('Error connecting to the server.');
        }
    };

    const filteredInventory = inventoryData.filter((item) =>
        item.inventory_id.includes(searchTerm) || item.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderInventoryTable = () => (
        <Box sx={{ mt: 3 }}>
            <TextField
                label="Search Inventory"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 3 }}
            />
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
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
                                <TableCell>{item.type}</TableCell>
                                <TableCell>{item.available_stock}</TableCell>
                                <TableCell>{item.price_per_kg}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );

    const renderContent = () => {
        switch (selectedAction) {
            case 'add':
                return (
                    <Box component="form" onSubmit={handleFormSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3, padding:3, backgroundColor:'#f0f0f0'}}>
                        <TextField
                            label="Inventory ID"
                            name="inventory_id"
                            value={formData.inventory_id}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Tea Quantity (kg)"
                            name="tea_Quantity"
                            type="number"
                            value={formData.tea_Quantity}
                            onChange={handleInputChange}
                            size="small" 
                fullWidth
                sx={{ fontFamily: 'Calibri', fontSize: '16px', height: '48px' }}
                        />
                        <TextField
                            label="Tea Type"
                            name="teaType"
                            value={formData.teaType}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Sales ID"
                            name="salesId"
                            value={formData.salesId}
                            onChange={handleInputChange}
                        />
                        <Button variant="contained" color="primary" type="submit">
                            Add Sale
                        </Button>
                    </Box>
                );
            case 'view':
                return <Typography variant="body1">Here, you can view all sales records.</Typography>;
            case 'update':
                return <Typography variant="body1">Here, you can update existing sales records.</Typography>;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, backgroundColor: '#f5f5f5', height: '100vh', fontFamily: 'Calibri' }}>
            <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>Manage Sales</Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                <Card
                    sx={{
                        flex: 1,
                        backgroundColor: '#4CAF50',
                        boxShadow: 3,
                        cursor: 'pointer',
                        textAlign: 'center',
                        '&:hover': { transform: 'scale(1.05)' },
                    }}
                    onClick={() => setSelectedAction('add')}
                >
                    <CardContent>
                        <Typography variant="h6">Add Sales</Typography>
                    </CardContent>
                </Card>

                <Card
                    sx={{
                        flex: 1,
                        backgroundColor: '#4CAF50',
                        boxShadow: 3,
                        cursor: 'pointer',
                        textAlign: 'center',
                        '&:hover': { transform: 'scale(1.05)' },
                    }}
                    onClick={() => setSelectedAction('view')}
                >
                    <CardContent>
                        <Typography variant="h6">View Sales</Typography>
                    </CardContent>
                </Card>

                <Card
                    sx={{
                        flex: 1,
                        background: '#4CAF50',
                        boxShadow: 3,
                        cursor: 'pointer',
                        textAlign: 'center',
                        '&:hover': { transform: 'scale(1.05)' },
                    }}
                    onClick={() => setSelectedAction('update')}
                >
                    <CardContent>
                        <Typography variant="h6">Update Sales</Typography>
                    </CardContent>
                </Card>
            </Box>

            <Box sx={{ mt: 5, p: 4, backgroundColor: '#ffffff', borderRadius: 2, boxShadow: 2, backdropFilter: 'blur(8px)' }}>
                {selectedAction === 'add' && renderInventoryTable()}
                {renderContent()}
            </Box>
        </Box>
    );
};

export default ManageSales;
