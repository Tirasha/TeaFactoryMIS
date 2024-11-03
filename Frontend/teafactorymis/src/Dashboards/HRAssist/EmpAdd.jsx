import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

export default function EmpAdd() {
  const [formData, setFormData] = useState({
    empId: '',
    firstname: '',
    lastname: '',
    dob: '',
    houseNo: '',
    lineNo: '',
    nic: '',
    category: '',
    role: '',
  });

  // Fetch next employee ID on component mount
  useEffect(() => {
    fetch('/api/employees/nextId')
      .then((response) => response.text()) // Fetching as text since we're expecting a string
      .then((id) => setFormData((prevData) => ({ ...prevData, empId: id })))
      .catch((error) => console.error('Error fetching next employee ID:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/employees/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Employee added:', data);
        // Optionally reset form or redirect
      })
      .catch((error) => console.error('Error creating employee:', error));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, maxWidth: 500, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Add Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Employee ID"
          name="empId"
          value={formData.empId}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="First Name"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Last Name"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Date of Birth"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="House No"
          name="houseNo"
          value={formData.houseNo}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Line No"
          name="lineNo"
          value={formData.lineNo}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="NIC"
          name="nic"
          value={formData.nic}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
          Add Employee
        </Button>
      </form>
    </Box>
  );
}
