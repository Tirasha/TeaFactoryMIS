import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

const FactoryWorkersAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]); // State for attendance data
  const [attId, setAttId] = useState(''); // State for attendance ID input
  const [filteredAttendance, setFilteredAttendance] = useState(null); // State for filtered attendance
  const navigate = useNavigate();

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = () => {
    fetch('/api/factoryAttendance/all') // Correct API endpoint path for fetching all attendance records
      .then(response => response.json())
      .then(data => setAttendanceData(data || [])) // Directly set the data as a list
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleFilterAttendance = () => {
    fetch(`/api/factoryAttendance/${attId}`) // Updated API path for fetching attendance by ID
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Attendance not found');
        }
      })
      .then(data => {
        console.log(data); // Log data to check what is returned
        setFilteredAttendance(data); // Set filtered attendance
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Attendance not found');
      });
  };

  const handleAddAttendance = () => {
    navigate('/AddAttendance'); // Navigate to Add Attendance page
  };

  const handleUpdateAttendance = (attendance) => {
    navigate(`/Attendanceupdatefac/${attendance.attId}`); // Navigate to Edit Attendance page
  };

  const handleDeleteAttendance = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this attendance record?');
    if (confirmDelete) {
      fetch(`/api/factoryAttendance/delete/${id}`, { method: 'DELETE' }) // Correct API path for deleting attendance
        .then(response => {
          if (response.ok) {
            setAttendanceData(attendanceData.filter(att => att.attId !== id)); // Remove deleted attendance from state
            alert('Attendance deleted successfully!');
          } else {
            console.error('Failed to delete attendance');
            alert('Failed to delete attendance. Please try again.');
          }
        })
        .catch(error => console.error('Error:', error));
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, backgroundColor: '#f5f5f5', height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Factory Workers Attendance Dashboard
      </Typography>

      {/* Flex container for attendance ID input and search button */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          label="Attendance ID"
          variant="outlined"
          value={attId}
          onChange={(e) => setAttId(e.target.value)} // Update attId state
          sx={{ width: '250px', mr: 1 }}
        />
        <Button variant="contained" color="primary" onClick={handleFilterAttendance}>
          Search Attendance
        </Button>
      </Box>

      <Button variant="contained" color="primary" onClick={handleAddAttendance} sx={{ mb: 2 }}>
        Add Attendance
      </Button>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="attendance table">
          <TableHead>
            <TableRow>
              <TableCell>Attendance ID</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Check-in Time</TableCell>
              <TableCell>Check-out Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Render the filtered attendance if it exists, otherwise render all attendance records */}
            {(filteredAttendance ? [filteredAttendance] : attendanceData).map((attendance) => (
              <TableRow key={attendance.attId}>
                <TableCell>{attendance.attId}</TableCell>
                <TableCell>{attendance.employee.empId}</TableCell>
                <TableCell>{attendance.status}</TableCell>
                <TableCell>{new Date(attendance.check_in).toLocaleString()}</TableCell>
                <TableCell>{new Date(attendance.check_out).toLocaleString()}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleUpdateAttendance(attendance)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteAttendance(attendance.attId)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FactoryWorkersAttendance;
