import { Button, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const AddEpfEtf = ({ openForm, handleCloseForm }) => {
    let navigate = useNavigate();
    const [epfetf,setEpfEtf]=useState({
        epf_etfId:"",
        empId:"",
        date:"",
        epf:"",
        etf:""
    });

    const {epf_etfId,empId,date,epf,etf} = epfetf;

    const fetchLastEpfEtfId = async () => {
        try {
          const result = await axios.get("http://localhost:8080/basicGetAll");
          const lastEpfEtf = result.data[result.data.length - 1];
          const lastEpfEtfId = lastEpfEtf ? parseInt(lastEpfEtf.epf_etfId.slice(2)) : 0;
          const newEpfEtfId = `ep${String(lastEpfEtfId + 1).padStart(2, '0')}`;
          setEpfEtf(prevEpfEtf => ({
            ...prevEpfEtf,
            epf_etfId: newEpfEtfId
          }));
        } catch (error) {
          console.error("Error fetching last epf and etf id:", error);
        }
      };
    
      useEffect(() => {
        fetchLastEpfEtfId();
      }, []);

      const onChangeInput = (e) => {
        setEpfEtf({ ...epfetf, [e.target.name]: e.target.value });
      };

      const onSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:8080/epfetfAdd", epfetf);
          navigate("/EpfEtf");
          handleCloseForm(); // Close the modal after submission
          
        } catch (error) {
          console.error("Error adding new epf ad etf calculation:", error);
        }
      };

  return (
    <Modal
      open={openForm}
      onClose={handleCloseForm}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box sx={{ width: 400, p: 3, backgroundColor: 'white', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Add New EPF and ETF
        </Typography>

        <form onSubmit={onSubmit}>
          <TextField
            label="ID"
            name="epf_etfId"
            value={epf_etfId}
            onChange={onChangeInput}
            fullWidth
            margin="normal"
            required
            InputProps={{ readOnly: true }}
          />
          <TextField 
            label="Employee ID"
            name="empId"
            value={empId}
            onChange={onChangeInput}
            fullWidth
            margin="normal"
            required
          />
          <TextField 
            label="Date"
            name="date"
            value={date}
            onChange={onChangeInput}
            fullWidth
            margin="normal"
            required
          />
          <TextField 
            label="EPF"
            name="epf"
            value={epf}
            onChange={onChangeInput}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="ETF"
            name="etf"
            value={etf}
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
