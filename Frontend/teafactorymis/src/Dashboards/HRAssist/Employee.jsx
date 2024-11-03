import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

export const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    fetch('/api/employees/all')
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error('Error:', error));
  };

  const handleAddEmployee = () => {
    navigate('/AddEmployee'); // Navigate to the Add Employee page
  };

  const handleUpdateEmployee = (employee) => {
    navigate(`/EditEmployee/${employee.empId}`); // Navigate to the EmpEdit page with employee ID
  };

  const handleDeleteEmployee = (id) => {
    // Confirm before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (confirmDelete) {
      fetch(`/api/employees/delete/${id}`, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            setEmployees(employees.filter(employee => employee.empId !== id));
            alert('Employee deleted successfully!'); // Alert for successful deletion
          } else {
            console.error('Failed to delete employee');
            alert('Failed to delete employee. Please try again.'); // Alert for error
          }
        })
        .catch(error => console.error('Error:', error));
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, backgroundColor: '#f5f5f5', height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        HR Assist Dashboard
      </Typography>

      <Button variant="contained" color="primary" onClick={handleAddEmployee} sx={{ mb: 2 }}>
        Add Employee
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="employee table">
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>House No</TableCell>
              <TableCell>Line No</TableCell>
              <TableCell>NIC</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.empId}>
                <TableCell>{employee.empId}</TableCell>
                <TableCell>{employee.firstname}</TableCell>
                <TableCell>{employee.lastname}</TableCell>
                <TableCell>{new Date(employee.dob).toLocaleDateString()}</TableCell>
                <TableCell>{employee.houseNo}</TableCell>
                <TableCell>{employee.lineNo}</TableCell>
                <TableCell>{employee.nic}</TableCell>
                <TableCell>{employee.category}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleUpdateEmployee(employee)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteEmployee(employee.empId)}>
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
