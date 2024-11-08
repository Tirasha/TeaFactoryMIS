import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AttendanceAddEst() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    attId: '',
    date: '',
    status: '',
    leave_Reason: '',
    empId: '',
  });

  // Fetch the next available attId from the server
  useEffect(() => {
    fetch('/api/attendance/nextId')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch next attendance ID');
        return response.text(); // Ensure the response is read as text if it's just a string ID
      })
      .then(data => {
        console.log('Next attendance ID:', data); // Check what is received
        setFormData(prevFormData => ({ ...prevFormData, attId: data }));
      })
      .catch(error => console.error('Error fetching next attendance ID:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the required fields are filled
    if (!formData.attId || !formData.date || !formData.status || !formData.empId) {
      alert('Please fill all the required fields');
      return;
    }

    // Check for leave reason if status is "On Leave"
    if (formData.status === 'On Leave' && (!formData.leave_Reason || formData.leave_Reason.trim() === '')) {
      alert('Leave reason is required when status is "On Leave"');
      return;
    }

    const dataToSend = {
      ...formData,
      employee: { empId: formData.empId }, // Assuming `empId` matches your entity setup
    };

    fetch('/api/attendance/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    })
      .then(response => {
        if (!response.ok) {
          // Handle errors from the database or trigger (e.g., SQL constraint violation)
          return response.text().then(errorMsg => {
            throw new Error(errorMsg || 'Error adding attendance');
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Attendance added:', data);
        alert('Attendance added successfully!');
        navigate('/EstateWorkersAttendance');
      })
      .catch(error => {
        console.error('Error creating attendance:', error);
        alert(error.message || 'An error occurred');
      });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, maxWidth: 500, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Add Estate Worker Attendance
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Attendance ID"
          name="attId"
          value={formData.attId}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true }} // Make field read-only
        />
        <TextField
          label="Date"
          name="date"
          type="datetime-local"
          value={formData.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Leave Reason"
          name="leave_Reason"
          value={formData.leave_Reason}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Employee ID"
          name="empId"
          value={formData.empId}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button variant="contained" sx={{backgroundColor:"#77DD77"}}  type="submit">
          Add Attendance
        </Button>
      </form>
    </Box>
  );
}
