import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import React, { useState,useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function Add_Edit_Forum({ openForm, handleCloseForm,onFormSubmit,editItem }) {
    const [formData,setFormData] = useState({
        inv_id:'',
        tea_type:'',
        available_stock:'',
        price_per_kg:''
    });

    useEffect(() => {
        console.log("Edit item received:", editItem); // Check what data is being passed
        if (editItem) {
          setFormData(editItem);
        } else {
          setFormData({
            inv_id: '',
            tea_type: '',
            available_stock: '',
            price_per_kg: ''
          });
        }
      }, [editItem]);

    const handleChange =(e) =>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSubmit =()=>{
        if(editItem)
        {
            axios.put(`http://localhost:8080/inventory/edit/${formData.inv_id}`,formData)
            .then(response =>{
                console.log("Inventory updated: ",response.data);
                onFormSubmit();
                handleCloseForm();
            })
            .catch(error =>{
                console.error("Error updating inventory: ",error);
            });
        }
        else{
            axios.post(`http://localhost:8080/inventory/add/new`,formData)
            .then(response =>{
                console.log("Inventory added: ",response.data);
                onFormSubmit();
                handleCloseForm();
            })
            .catch(error =>{
                console.error("Error adding inventory :",error);
            });
        }
    };

  return (
    <Modal
      open={openForm}
      onClose={handleCloseForm}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box sx={{ width: 400, bgcolor: 'background.paper', p: 4, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" mb={1}>Add Tea Stock  </Typography> 
            <CloseIcon  sx={{cursor: 'pointer', color: 'grey', '&:hover': { color: 'black' } }}
            onClick={handleCloseForm}/>
        </Box>
        <TextField name="inv_id" fullWidth label="Inventory ID" value={formData.inv_id} onChange={handleChange} sx={{ mb: 2 }}  size='small' disabled={!!editItem}/>
        <TextField name="tea_type"fullWidth label="Tea Type" value={formData.tea_type} onChange={handleChange} sx={{ mb: 2 }}  size='small'/>
        <TextField name="available_stock" fullWidth label="Available Stock" type="number" value={formData.available_stock} onChange={handleChange} sx={{ mb: 2 }} size='small'/>
        <TextField name="price_per_kg" fullWidth label="Price per kg" type="number" value={formData.price_per_kg} onChange={handleChange} sx={{ mb: 2 }}size='small' />
        <Button
          variant="contained"
          sx={{ backgroundColor: '#77DD77', ':hover': { backgroundColor: '#66CC66' } }}
          fullWidth
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
}

export default Add_Edit_Forum;
