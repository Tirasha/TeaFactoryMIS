import { Modal, Box, TextField, Button, Typography ,MenuItem,InputLabel,FormControl,Select} from '@mui/material';
import React, { useState ,useEffect} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function Edit_Inventory({OpenEditForm  , handleCloseEditForm ,onFormSubmit ,editItem}) {
 const[formData,setFormData] =useState({
    inventory_id:'',
    tea_type:'',
    available_stock:'',
    price_per_kg:''
 });

 useEffect(() => {
    if (editItem) {
      setFormData({
        inventory_id: editItem.inventory_id || '',
        tea_type: editItem.tea_type || '',
        available_stock: editItem.available_stock || '',
        price_per_kg: editItem.price_per_kg || ''
      });
    }
  }, [editItem]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:8080/inventory/edit/${formData.inventory_id}`, formData);
      onFormSubmit(); // Refresh data in the parent component
      handleCloseEditForm(); // Close the modal after submission
    } catch (error) {
      console.error('Error updating inventory:', error);
    }
  };

  return (
    <Modal
      open={OpenEditForm}
      onClose={handleCloseEditForm}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box sx={{ width: 400, bgcolor: 'background.paper', p: 4, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" mb={1}>Edit Tea Stock  </Typography> 
            <CloseIcon  sx={{cursor: 'pointer', color: 'grey', '&:hover': { color: 'black' } }}
            onClick={handleCloseEditForm}/>
        </Box>
        <TextField
          name="inventory_id"
          fullWidth
          label="Inventory ID"
          value={formData.inventory_id}
          InputProps={{ readOnly: true }}
          sx={{ mb: 2 }}
          size="small"
          disabled
          required
        />
        <FormControl fullWidth sx={{ mb: 2 }} size="small">
          <InputLabel id="tea-type-label">Tea Type</InputLabel>
          <Select
            labelId="tea-type-label"
            id="tea-type-select"
            name="tea_type"
            value={formData.tea_type}
            label="Tea Type"
            onChange={handleChange}
           disabled
            required
          >
            <MenuItem value="PEKOE">PEKOE</MenuItem>
            <MenuItem value="B.O.P">B.O.P</MenuItem>
            <MenuItem value="B.O.P.F">B.O.P.F</MenuItem>
            <MenuItem value="Dust 1">Dust 1</MenuItem>
            <MenuItem value="FNGS 1">FNGS 1</MenuItem>
            <MenuItem value="DUST">DUST</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="available_stock"
          fullWidth
          label="Available Stock"
          type="number"
          value={formData.available_stock}
          onChange={handleChange}
          sx={{ mb: 2 }}
          size="small"
          required
        />
         <TextField
          name="price_per_kg"
          fullWidth
          label="Price per kg"
          type="number"
          value={formData.price_per_kg}
          onChange={handleChange}
          sx={{ mb: 2 }}
          size="small"
          required
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: '#77DD77', ':hover': { backgroundColor: '#66CC66' } }}
          fullWidth
          onClick={handleSubmit}
        >
          Update
        </Button>
      </Box>
    </Modal>
  );
}

export default Edit_Inventory;
