import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

export default function AttendanceupdateFac() {
  const { attId } = useParams(); // Get the attendance ID from URL params
  const [attendance, setAttendance] = useState({
    employeeId: '',
    status: '',
    checkInTime: '',
    checkOutTime: ''
  }); // State to hold form data
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch attendance details based on the attendance ID (attId)
    fetch(`/api/factoryAttendance/${attId}`)
      .then(response => response.json())
      .then(data => {
        setAttendance({
          employeeId: data.employee.empId,
          status: data.status,
          checkInTime: new Date(data.check_in).toISOString().slice(0, 16),
          checkOutTime: new Date(data.check_out).toISOString().slice(0, 16)
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching attendance:', error);
        setLoading(false);
      });
  }, [attId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update attendance record
    const updatedAttendance = {
      ...attendance,
      checkInTime: new Date(attendance.checkInTime).toISOString(),
      checkOutTime: new Date(attendance.checkOutTime).toISOString()
    };

    fetch(`/api/factoryAttendance/update/${attId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedAttendance)
    })
      .then(response => {
        if (response.ok) {
          alert('Attendance updated successfully!');
          navigate('/FactoryWorkersAttendance'); // Redirect to the attendance list page after successful update
        } else {
          alert('Failed to update attendance');
        }
      })
      .catch(error => {
        console.error('Error updating attendance:', error);
        alert('Failed to update attendance');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendance({ ...attendance, [name]: value });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Box sx={{ p: 3, maxWidth: 600, margin: 'auto', backgroundColor: '#f9f9f9', borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Update Attendance Record
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Employee ID"
          variant="outlined"
          fullWidth
          margin="normal"
          name="employeeId"
          value={attendance.employeeId}
          onChange={handleChange}
          disabled
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={attendance.status}
            onChange={handleChange}
            label="Status"
            required
          >
            <MenuItem value="Present">Present</MenuItem>
            <MenuItem value="On Leave">On Leave</MenuItem>
            <MenuItem value="Absent">Absent</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Check-in Time"
          variant="outlined"
          fullWidth
          margin="normal"
          type="datetime-local"
          name="checkInTime"
          value={attendance.checkInTime}
          onChange={handleChange}
          required
        />

        <TextField
          label="Check-out Time"
          variant="outlined"
          fullWidth
          margin="normal"
          type="datetime-local"
          name="checkOutTime"
          value={attendance.checkOutTime}
          onChange={handleChange}
          required
        />

        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
          Update Attendance
        </Button>
      </form>
    </Box>
  );
}
