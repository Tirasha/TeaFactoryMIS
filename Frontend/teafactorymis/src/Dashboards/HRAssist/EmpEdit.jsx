import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

export default function EmpEdit() {
  const { empId } = useParams(); // Get employee ID from route parameters
  const navigate = useNavigate(); // For navigation after update

  const [formData, setFormData] = useState({
    empId: '',
    firstname: '',
    lastname: '',
    dob: '',
    houseNo: '',
    lineNo: '',
    category: '',
    role: '',
  });

  // Fetch employee details on component mount
  useEffect(() => {
    fetch(`/api/employees/${empId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch employee data');
        }
        return response.json();
      })
      .then((data) => setFormData(data))
      .catch((error) => console.error('Error fetching employee details:', error));
  }, [empId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/employees/update/${empId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Employee updated:', data);
        alert('Employee updated successfully!'); // Alert for successful update
        navigate('/Employee'); // Redirect to employee list or another page
      })
      .catch((error) => {
        console.error('Error updating employee:', error);
        alert('Failed to update employee. Please try again.'); // Alert for error
      });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, maxWidth: 500, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Edit Employee
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
          value={formData.dob.split('T')[0]} // Format date for input
          onChange={handleChange}
          fullWidth
          margin="normal"
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
        {/* <TextField
          label="NIC"
          name="nic"
          value={formData.nic}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        /> */}
        <TextField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained"  sx={{ backgroundColor:"#77DD77"}}>
          Update Employee
        </Button>
      </form>
    </Box>
  );
}
