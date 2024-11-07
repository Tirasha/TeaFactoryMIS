import React, { useState, useEffect } from 'react';
import { Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
const ViewSales = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        fetchSalesData();
    }, []);

    const fetchSalesData = async (e) => {
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


    const deleteSales =async(salesId)=> {

        try{
            const response=await fetch(`http://localhost:8080/Sales/${salesId}`,{
            method:'DELETE',
        });

        if(response.ok){
            setSalesData(salesData.filter(item=>item.salesId !== salesId));
        
        }
        else{
            console.error('Failed to delete sales data');
        }
        

    }catch(error){
                console.error('Error',error);
    }
}

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
                    size='small'
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
                                        <Button variant="contained" style={{backgroundColor:'#00AB66'}} onClick={() => deleteSales(item.salesId)}>
                                         <DeleteIcon></DeleteIcon> 
                                        </Button>
                                    </TableCell> 
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default ViewSales;
