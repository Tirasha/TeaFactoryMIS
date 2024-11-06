import React, { useState, useEffect } from 'react';
import { Box, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper,InputAdornment,Dialog,DialogActions,DialogTitle,DialogContent } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Add_Edit_Forum from './Add_Edit_Forum';

const InventoryAssistDashboard = () => {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [openForm,setOpenForm] =useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); 
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editItem,setEditItem] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/inventory/all')
      .then(response => {
        setRows(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
        setError('There was an error fetching the data!');
      });
  }, []);

  const filteredRows = rows.filter(row =>
    row.tea_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.inv_id.toString().includes(searchTerm) 
  );

  //open to add inventory forum
  const handleOpenForm =(item = null)=>{
    setEditItem(item);
    setOpenForm(true);
  }

  //close to add inventory forum
  const handleCloseForm =()=>{
    setEditItem(null);
    setOpenForm(false);
  }

  const handleOpenDeleteDialog = (item) => {
    console.log('Delete icon clicked', item); // Debug log
    setItemToDelete(item);
    setOpenDeleteDialog(true);
  };

  // Close the delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setItemToDelete(null);
  };

  const handleDeleteItem = () => {
    if (itemToDelete) {
      axios.delete(`http://localhost:8080/inventory/delete/${itemToDelete.inv_id}`)
        .then(response => {
          // Remove the deleted item from the local state
          setRows(rows.filter(row => row.inv_id !== itemToDelete.inv_id));
          // Close the dialog
          handleCloseDeleteDialog();
        })
        .catch(error => {
          console.error('There was an error deleting the item.', error);
          setError('There was an error deleting the item!');
        });
    }
  };
 
  const handleRefreshData = () => {
    axios.get('http://localhost:8080/inventory/all')
      .then(response => {
        setRows(response.data);
      })
      .catch(error => {
        console.error('There was an error refreshing the data!', error);
      });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, backgroundColor: '#f5f5f5', height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
      <TextField
        fullWidth
        placeholder="Search items..."
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ width: '600px',  // Customize the width
          height: '70px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
       <Button variant="contained" sx={{ ml: 42, height: '50px',width:'150px',fontWeight:'bold',backgroundColor:'#77DD77' }} onClick={handleOpenForm}>Add Tea Stock  </Button>
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#77DD77' }}>
              <TableCell>Inventory ID</TableCell>
              <TableCell>Tea Type</TableCell>
              <TableCell>Available Stock</TableCell>
              <TableCell>Price per kg</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, index) => (
              <TableRow key={row.inv_id || index}>
                <TableCell>{row.inv_id}</TableCell>
                <TableCell>{row.tea_type}</TableCell>
                <TableCell>{row.available_stock}</TableCell>
                <TableCell>{row.price_per_kg}</TableCell>
                <TableCell>
                <Button variant="contained" sx={{ ml:1,fontWeight:'bold',backgroundColor:'#77DD77'}} onClick={() => handleOpenForm(row)}> 
                <EditIcon style={{color:"black"}}/></Button>
                   <Button variant="contained" sx={{ ml:1,fontWeight:'bold',backgroundColor:'#77DD77'}} onClick={() => handleOpenDeleteDialog(row)}> 
                     <DeleteIcon style={{color:"black"}}/></Button> 
               </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Add_Edit_Forum openForm ={openForm} handleCloseForm ={handleCloseForm} onFormSubmit={handleRefreshData} editItem={editItem}/>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this inventory item?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteItem} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventoryAssistDashboard;
