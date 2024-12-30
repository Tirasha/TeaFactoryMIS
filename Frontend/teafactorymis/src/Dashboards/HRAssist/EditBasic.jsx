import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const EditBasic = ({ openForm, handleCloseForm, basicId, onFormSubmit }) => { // Destructure props correctly
  let navigate = useNavigate();

  const [basics, setBasic] = useState({
    basicId: "",
    role: "",
    dayPayment: ""
  });

  const { role, dayPayment } = basics;

  const onChangeInput = (e) => {
    setBasic({ ...basics, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try{
        await axios.put(`http://localhost:8080/basicUpdate/${basicId}`, basics);
        window.alert("Updated successfully...!");
        onFormSubmit();
        handleCloseForm();
        navigate("/Basics");
      } catch (error) {
        console.error('Error updating basic:', error);
        window.alert("Updation failed...!");
      }    
  };

  const loadBasic = async () => {
    try {
      // Fetch basic details based on the passed basicId
      const result = await axios.get(`http://localhost:8080/basicGetById/${basicId}`);
      setBasic(result.data); // Update state with the fetched data
    } catch (error) {
      window.alert('Error loading basic salary details:', error);
    }
  };

  // Only call loadBasic when basicId changes (not on every render)
  useEffect(() => {
    if (basicId) {
      loadBasic(); // Load the basic details when basicId is set
    }
  }, [basicId]);

  return (
    <Modal
      open={openForm}
      onClose={handleCloseForm}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box sx={{ width: 400, p: 3, backgroundColor: 'white', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Update Salary Basic Detail
        </Typography>

        <form onSubmit={onSubmit}>
          <TextField
            label="ID"
            name="basicId"
            value={basicId} // Display the basicId, since it can't be edited
            fullWidth
            margin="normal"
            required
            InputProps={{ readOnly: true }}
          />
          <TextField 
            label="Role"
            name="role"
            value={role}
            onChange={onChangeInput}
            fullWidth
            margin="normal"
            required
          />
          <TextField 
            label="Day Payment"
            name="dayPayment"
            value={dayPayment}
            onChange={onChangeInput}
            fullWidth
            margin="normal"
            required
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="contained" style={{ backgroundColor: '#00AB66'}} type="submit">
              Update
            </Button>
            <Button variant="outlined" style={{ backgroundColor: 'red'}} onClick={handleCloseForm}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
