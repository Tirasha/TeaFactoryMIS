import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';


function Add_Edit_Forum({ openForm, handleCloseForm,onFormSubmit,editItem }) {
    const[formData,setFormData]=useState({
        fer_id:'',
        name:'',
        type:'',
        quantity:''
    });

    useEffect(() => {
        console.log("Edit item received: ", editItem);
        if (editItem) {
          setFormData(editItem); // Check if this line is correctly setting the form data
        } else {
          setFormData({
            fer_id: '',
            name: '',
            type: '',
            quantity: ''
          });
        }
      }, [editItem]);

    const handleChange =(e) =>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
        
    const handleSubmit =() =>{
        if(editItem){
            axios.put(`http://localhost:8080/fertilizer/edit/${formData.fer_id}`,formData)
            .then(response =>{
                console.log("Fertilizer updated:",response.data);
                onFormSubmit();
                handleCloseForm();
            })
            .catch(error =>{
                console.error("Error updating fertilizer :",error);
            });
        }else{
            axios.post(`http://localhost:8080/fertilizer/add`,formData)
            .then(response =>{
                console.log("Fertilizer added :",response.data);
                onFormSubmit();
                handleCloseForm();
            })
            .catch(error =>{
                console.error("Error adding fertilizer :",error);
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
        <Typography variant="h6" mb={1}>Add Fertilizer Stock  </Typography> 
            <CloseIcon  sx={{cursor: 'pointer', color: 'grey', '&:hover': { color: 'black' } }}
            onClick={handleCloseForm}/>
        </Box>
        <TextField name="fer_id" fullWidth label="Fertilizer ID" value={formData.fer_id} onChange={handleChange}sx={{ mb: 2 }}  size='small' disabled={!!editItem}/>
        <TextField name="name"fullWidth label="Name" value={formData.name} onChange={handleChange}  sx={{ mb: 2 }}  size='small'/>
        <TextField name="type" fullWidth label="Type" value={formData.type} onChange={handleChange} sx={{ mb: 2 }} size='small'/>
        <TextField name="quantity" fullWidth label="Quantity" type="number" value={formData.quantity} onChange={handleChange} sx={{ mb: 2 }}size='small' />
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
