import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import React, { useState ,useEffect} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function Edit_Fertilizer({ openEditForm, handleCloseEditForm, onFormSubmit, editItem }) {
 const[formData,setFormData] =useState({
    fer_id: '',
    name: '',
    quantity: ''
 });

 useEffect(() => {
    if (editItem) {
      setFormData({
        fer_id: editItem.fer_id || '',
        name: editItem.name || '',
        quantity: editItem.quantity || ''
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
      await axios.put(`http://localhost:8080/fertilizer/edit/${formData.fer_id}`, formData);
      onFormSubmit(); // Refresh data in the parent component
      handleCloseEditForm(); // Close the modal after submission
    } catch (error) {
      console.error('Error updating inventory:', error);
    }
  };

  return (
    <Modal
      open={openEditForm}
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
          name="fer_id"
          fullWidth
          label="Fertilizer ID"
          value={formData.fer_id}
          InputProps={{ readOnly: true }}
          sx={{ mb: 2 }}
          size="small"
          disabled
          required
        />
        <TextField
          name="name"
          fullWidth
          label="Name "
          value={formData.name}
          onChange={handleChange}
          sx={{ mb: 2 }}
          size="small"
          required
        />
         <TextField
          name="quantity"
          fullWidth
          label="Quantity (kg)"
          type="number"
          value={formData.quantity}
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

export default Edit_Fertilizer;
