import { Modal, Box, TextField, Button, Typography ,MenuItem,InputLabel,FormControl,Select} from '@mui/material';
import React, { useState ,useEffect} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function Add_Inventotry({ openForm, handleCloseForm,onFormSubmit }) {
  const initialFormData = {
    inventory_id: '',
    tea_type: '',
    available_stock: '',
    price_per_kg: ''
};
const [formData, setFormData] = useState(initialFormData);
const [duplicateError,setDuplicateError] = useState('');


const fetchLastInventoryId = async () => {
  try {
    const result = await axios.get("http://localhost:8080/inventory/all");
    const lastInventory = result.data[result.data.length - 1];
    const lastInventId = lastInventory ? parseInt(lastInventory.inventory_id.slice(3)) : 0;
    const newInventoryId = `inv${String(lastInventId + 1).padStart(3, '0')}`;
    
    setFormData(prevFormData => ({
      ...prevFormData,
      inventory_id: newInventoryId
    }));
  } catch (error) {
    console.error("Error fetching last inventory id:", error);
  }
};

const checkUniqueTeaType = async () => {
  try {
    const result = await axios.get("http://localhost:8080/inventory/all");
    return result.data.some(item => item.tea_type === formData.tea_type);
  } catch (error) {
    console.error("Error checking unique tea type:", error);
    return false;
  }
};

  
useEffect(() => {
  if (openForm) {
    fetchLastInventoryId();
    setDuplicateError('');
  }
}, [openForm]);

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

    
  const handleSubmit = async () => {
    const isDuplicate = await checkUniqueTeaType();

    if (isDuplicate) {
      setDuplicateError("This tea type already exists; please update that."); // Set error message if duplicate
      setTimeout(handleCloseForm, 2000); // Close the form after 2 seconds
      return;
    }

    try {
      await axios.post(`http://localhost:8080/inventory/add/new`, formData);
      onFormSubmit();
      setFormData(initialFormData); // Reset form to initial state
      handleCloseForm();
    } catch (error) {
      console.error('Error adding inventory:', error);
      setDuplicateError("Failed to add inventory. Please try again.");
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
        <TextField name="inventory_id" fullWidth label="Inventory ID" value={formData.inventory_id} InputProps={{ readOnly: true }} onChange={handleChange} sx={{ mb: 2 }}  size='small'  required />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Tea Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="tea_type"  // Corrected to bind to tea_type
            value={formData.tea_type}  // Corrected to bind to tea_type
            label="Tea Type"
            size="small"
            sx={{ mb: 2 }} 
            onChange={handleChange} required
          >
            <MenuItem value="PEKOE">PEKOE</MenuItem>
            <MenuItem value="B.O.P">B.O.P</MenuItem>
            <MenuItem value="B.O.P.F">B.O.P.F</MenuItem>
            <MenuItem value="Dust 1">Dust 1</MenuItem>
            <MenuItem value="FNGS 1">FNGS 1</MenuItem>
            <MenuItem value="DUST">DUST</MenuItem>
          </Select>
        </FormControl>
        <TextField name="available_stock" fullWidth label="Available Stock" type="number" value={formData.available_stock} onChange={handleChange} sx={{ mb: 2 }} size='small'required/>
        <TextField name="price_per_kg" fullWidth label="Price per kg" type="number" value={formData.price_per_kg} onChange={handleChange} sx={{ mb: 2 }}size='small' required/>
        {duplicateError &&(
          <Typography color='error' variant='body2' sx={{mb:2}}>
            {duplicateError}
          </Typography>
        )}
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

export default Add_Inventotry;
