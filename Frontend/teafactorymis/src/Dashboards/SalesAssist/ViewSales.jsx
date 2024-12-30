import React, { useState, useEffect } from 'react';
import { 
    Box, 
    TextField, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ViewSales = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [salesData, setSalesData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedSalesId, setSelectedSalesId] = useState(null);

    useEffect(() => {
        fetchSalesData();
    }, []);

    const fetchSalesData = async () => {
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

    const handleDeleteClick = (salesId) => {
        setSelectedSalesId(salesId);
        setOpenDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/Sales/${selectedSalesId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setSalesData(salesData.filter((item) => item.salesId !== selectedSalesId));
            } else {
                console.error('Failed to delete sales data');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setOpenDialog(false);
            setSelectedSalesId(null);
        }
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
            <Box sx={{ flex: 2, pl: 4 }}>
                <TextField
                    label="Search Sales"
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
                                <TableCell>Sales Id</TableCell>
                                <TableCell>Inventory Id</TableCell>
                                <TableCell>Tea Type</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Tea Quantity</TableCell>
                                <TableCell>Total Amount</TableCell>
                                <TableCell>Available Stock</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredSales.map((item) => (
                                <TableRow key={item.salesId}>
                                    <TableCell>{item.salesId}</TableCell>
                                    <TableCell>{item.inventoryId}</TableCell>
                                    <TableCell>{item.teaType}</TableCell>
                                    <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                                    <TableCell>{item.teaQuantity}</TableCell>
                                    <TableCell>{item.totalAmount}</TableCell>
                                    <TableCell>{item.availableStock}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            style={{ backgroundColor: '#00AB66' }}
                                            onClick={() => handleDeleteClick(item.salesId)}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Confirmation Dialog */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this record? 
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ViewSales;
