import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

export default function AttendanceupdateEs() {
  const { attId } = useParams(); // Get attendance ID from route parameters
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    attId: '',
    date: '',
    status: '',
    leave_Reason: '',
    empId: ''
  });

  // Fetch attendance details on component mount
  useEffect(() => {
    fetch(`/api/attendance/${attId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch attendance data');
        }
        return response.json();
      })
      .then((data) => setFormData(data))
      .catch((error) => console.error('Error fetching attendance details:', error));
  }, [attId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/attendance/update/${attId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Attendance updated:', data);
        alert('Attendance updated successfully!');
        navigate('/EstateWorkersAttendance');
      })
      .catch((error) => {
        console.error('Error updating attendance:', error);
        alert('Failed to update attendance. Please try again.');
      });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, maxWidth: 500, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Edit Attendance
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Attendance ID"
          name="attId"
          value={formData.attId}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          value={formData.date.split('T')[0]} // Format date for input
          onChange={handleChange}
          fullWidth
          margin="normal"
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
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Update Attendance
        </Button>
      </form>
    </Box>
  );
}
