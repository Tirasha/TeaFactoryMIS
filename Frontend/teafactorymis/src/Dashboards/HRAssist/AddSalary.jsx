import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

export const AddSalary = ({openForm, handleCloseForm, onFormSubmit}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [salaryData, setSalaryData] = useState(null);
  const [basicId, setBasicId] = useState('');
  const [role, setRole] = useState('');
  const [dayPayment, setDayPayment] = useState('');
  const [salaryPayment,setSalaryPayment]=useState('');

  // Handle date input changes
  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  // Fetch salary details based on date range
  const getSalaryDetails = async () => {
    try {
      const response = await axios.get('http://localhost:8080/estateWorkersSalary', {
        params: { startDate, endDate }
      });
      setSalaryData(response.data);  // assuming response.data is an array of salary details
    } catch (error) {
      console.error('Error fetching salary data:', error.response ? error.response.data : error.message);
    }
  };

  // Submit salary data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (salaryData && salaryData.length > 0) {
      try {
        await Promise.all(
          salaryData.map(async (data) => {
            await axios.post('http://localhost:8080/salaryAdd', {
              empId: data[0],
              role: data[1],
              start_date: startDate,
              end_date: endDate,
              total_working_days: data[4],
              day_payment: data[5],
              salary: data[6],
              salary_paid_date: new Date()
            });
          })
        );
        alert('Salary details added successfully');
      } catch (error) {
        console.error('Error adding salary details:', error);
      }
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
        Add New Salary Detail
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Start Date Input */}
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* End Date Input */}
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Fetch salary details button */}
        <Button variant="contained" color="primary" onClick={getSalaryDetails} sx={{ mt: 2 }}>
          Get Salary Details
        </Button>

        {/* Basic ID Input */}
        <TextField
          label="ID"
          name="basicId"
          value={basicId}
          onChange={(e) => setBasicId(e.target.value)}
          fullWidth
          margin="normal"
          required
          InputProps={{ readOnly: true }}
        />

        {/* Role Input */}
        <TextField
          label="Role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          fullWidth
          margin="normal"
          required
        />

        {/* Role Input */}
        <TextField
          label="Role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          fullWidth
          margin="normal"
          required
        />

        {/* Day Payment Input */}
        <TextField
          label="Day Payment"
          name="dayPayment"
          value={dayPayment}
          onChange={(e) => setDayPayment(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        {/* Salary Payment*/}
        <TextField
          label="Salary Payment"
          name="salary"
          value={salaryPayment}
          onChange={(e) => setSalaryPayment(e.target.value)}
          fullWidth
          margin="normal"
          required
        />

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" style={{ backgroundColor: '#00AB66' }} type="submit">
            Add Salary
          </Button>
          <Button variant="outlined" style={{ backgroundColor: 'red' }} onClick={handleCloseForm}>
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
    </Modal>
  );
};
