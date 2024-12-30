import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import React, { useState ,useEffect} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function Add_Fertilizer({ openForm, handleCloseForm,onFormSubmit }) {
  const initialFormData = {
    fer_id: '',
    name: '',
    quantity: ''
};
const [formData, setFormData] = useState(initialFormData);


const fetchLastFertilizerId = async () => {
  try {
    const result = await axios.get("http://localhost:8080/fertilizer/all");
    const lastFertilizer = result.data[result.data.length - 1];
    const lastFertilizerId = lastFertilizer ? parseInt(lastFertilizer.fer_id.slice(3)) : 0;
    const newFertilizerId = `fer${String(lastFertilizerId + 1).padStart(3, '0')}`;
    
    setFormData(prevFormData => ({
      ...prevFormData,
      fer_id: newFertilizerId
    }));
  } catch (error) {
    console.error("Error fetching last fertilizer id:", error);
  }
};



  
useEffect(() => {
  if (openForm) {
    fetchLastFertilizerId();
  }
}, [openForm]);

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

    
  const handleSubmit = async () => {

    try {
      await axios.post(`http://localhost:8080/fertilizer/add`, formData);
      onFormSubmit();
      setFormData(initialFormData); // Reset form to initial state
      handleCloseForm();
    } catch (error) {
      console.error('Error adding Fertilizer:', error);
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
        <Typography variant="h6" mb={1}>Add new Fertilizer  </Typography> 
            <CloseIcon  sx={{cursor: 'pointer', color: 'grey', '&:hover': { color: 'black' } }}
            onClick={handleCloseForm}/>
        </Box>
        <TextField 
        name="fer_id" fullWidth
         label="Fertilizer ID" 
         value={formData.fer_id} 
         InputProps={{ readOnly: true }} 
         onChange={handleChange} 
         sx={{ mb: 2 }} 
          size='small'
            required />
            
  
        <TextField name="name" fullWidth label="Name of the Fertilizer"  value={formData.name} onChange={handleChange} sx={{ mb: 2 }} size='small'required/>
        <TextField name="quantity" fullWidth label="Quantity(kg)" type="number" value={formData.quantity} onChange={handleChange} sx={{ mb: 2 }}size='small' required/>
        
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

export default Add_Fertilizer;
