import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const AddBasic = ({ openForm, handleCloseForm }) => { // Destructure props correctly
  let navigate = useNavigate();
  const [basicTable,setBasicTable]=useState([]);

  const [basics, setBasic] = useState({
    basicId: "",
    role: "",
    basicAmount: "",
    dayPayment: ""
  });

  const { basicId, role, basicAmount, dayPayment } = basics;

  const fetchLastBasicId = async () => {
    try {
      const result = await axios.get("http://localhost:8080/basicGetAll");
      const lastBasic = result.data[result.data.length - 1];
      const lastBasicId = lastBasic ? parseInt(lastBasic.basicId.slice(2)) : 0;
      const newBasicId = `b${String(lastBasicId + 1).padStart(2, '0')}`;
      setBasic(prevBasic => ({
        ...prevBasic,
        basicId: newBasicId
      }));
    } catch (error) {
      console.error("Error fetching last basic id:", error);
    }
  };

  useEffect(() => {
    fetchLastBasicId();
  }, []);

  const onChangeInput = (e) => {
    setBasic({ ...basics, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/basicAdd", basics);
      navigate("/Basics");
      loadBasics();
      handleCloseForm(); // Close the modal after submission
      
    } catch (error) {
      console.error("Error adding new basic detail:", error);
    }
  };

  const loadBasics = async () => {
    const result = await axios.get("http://localhost:8080/basicGetAll");
    setBasicTable(result.data);
    console.log(result.data);
  };

  useEffect(() => {
    loadBasics();
  }, []);

  return (
    <Modal
      open={openForm}
      onClose={handleCloseForm}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box sx={{ width: 400, p: 3, backgroundColor: 'white', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Add New Salary Basic Detail
        </Typography>

        <form onSubmit={onSubmit}>
          <TextField
            label="ID"
            name="basicId"
            value={basicId}
            onChange={onChangeInput}
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
            label="Basic Amount"
            name="basicAmount"
            value={basicAmount}
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
              Add
            </Button>
            <Button variant="outlined" style={{ backgroundColor: 'red'}} onClick={handleCloseForm}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}
