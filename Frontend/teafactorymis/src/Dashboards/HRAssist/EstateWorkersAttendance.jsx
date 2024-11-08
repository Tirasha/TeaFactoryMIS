import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function EstateWorkersAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [empId, setEmpId] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = () => {
    axios.get('/api/attendance/all')
      .then(response => {
        setAttendanceData(response.data);
        setFilteredAttendance(response.data); // Initially, show all data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleFilterAttendance = () => {
    let filterUrl = '/api/attendance/filter?';

    if (empId) filterUrl += `empId=${empId}&`;
    if (year) filterUrl += `year=${year}&`;
    if (month) filterUrl += `month=${month}`;

    axios.get(filterUrl)
      .then(response => {
        setFilteredAttendance(response.data);
      })
      .catch(error => {
        console.error('Error fetching attendance:', error);
        alert('No records found');
      });
  };

  const handleAddAttendance = () => {
    navigate('/AddAttendance');
  };

  const handleUpdateAttendance = (attendance) => {
    navigate(`/AttendanceupdateEs/${attendance.attId}`);
  };

  const handleDeleteAttendance = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this attendance record?");
    if (confirmDelete) {
      axios.delete(`/api/attendance/delete/${id}`)
        .then(response => {
          setAttendanceData(attendanceData.filter(attendance => attendance.attId !== id));
          alert('Attendance record deleted successfully!');
        })
        .catch(error => {
          console.error('Error deleting attendance:', error);
          alert('Failed to delete attendance record');
        });
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, backgroundColor: '#f5f5f5', height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Estate Workers Attendance
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {/* Removed Attendance ID filter */}
        <TextField
          label="Employee ID"
          variant="outlined"
          value={empId}
          onChange={(e) => setEmpId(e.target.value)}
          sx={{ width: '200px', mr: 1 }}
        />
        <TextField
          label="Year"
          variant="outlined"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          sx={{ width: '200px', mr: 1 }}
        />
        <TextField
          label="Month"
          variant="outlined"
          type="number"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          sx={{ width: '200px', mr: 1 }}
        />
        <Button variant="contained" color="primary" onClick={handleFilterAttendance}>
          Filter Attendance
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
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Leave Reason</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(filteredAttendance.length > 0 ? filteredAttendance : attendanceData).map((attendance) => (
              <TableRow key={attendance.attId}>
                <TableCell>{attendance.attId}</TableCell>
                <TableCell>{new Date(attendance.date).toLocaleString()}</TableCell>
                <TableCell>{attendance.status}</TableCell>
                <TableCell>{attendance.leave_Reason}</TableCell>
                <TableCell>{attendance.employee.empId}</TableCell>
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
}
