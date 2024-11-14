import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

export const Employee = () => {
  const [employees, setEmployees] = useState([]); // List of all employees
  const [empId, setEmpId] = useState(''); // State for employee ID input
  const [filteredEmployee, setFilteredEmployee] = useState(null); // State for the filtered employee details
  const [showLabourEmployees, setShowLabourEmployees] = useState(false); // State to toggle Labour employees
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees(); // Fetch employees on component mount
  }, []);

  const fetchEmployees = () => {
    fetch('/api/employees/all') // API call to fetch all employees
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error('Error:', error));
  };

  const fetchLabourEmployees = () => {
    fetch('/api/employees/labour') // API call to fetch labour employees
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error('Error:', error));
  };

  const handleToggleLabourEmployees = () => {
    if (showLabourEmployees) {
      fetchEmployees(); // Fetch all employees again
    } else {
      fetchLabourEmployees(); // Fetch only labour employees
    }
    setShowLabourEmployees(!showLabourEmployees); // Toggle the state
  };

  const handleFilterEmployee = () => {
    fetch(`/api/employees/${empId}`) // Fetch employee by empId from the backend
      .then(response => {
        if (response.ok) {
          return response.json(); // Return employee data if response is ok
        } else {
          throw new Error('Employee not found');
        }
      })
      .then(data => {
        setFilteredEmployee(data); // Set the filtered employee data
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Employee not found');
      });
  };

  const handleAddEmployee = () => {
    navigate('/AddEmployee'); // Navigate to the Add Employee page
  };

  const handleUpdateEmployee = (employee) => {
    navigate(`/EditEmployee/${employee.empId}`); // Navigate to the Edit Employee page
  };

  const handleDeleteEmployee = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (confirmDelete) {
      fetch(`/api/employees/delete/${id}`, { method: 'DELETE' }) // Send DELETE request to backend
        .then(response => {
          if (response.ok) {
            setEmployees(employees.filter(employee => employee.empId !== id)); // Remove deleted employee from the list
            alert('Employee deleted successfully!');
          } else {
            console.error('Failed to delete employee');
            alert('Failed to delete employee. Please try again.');
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

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          label="Employee ID"
          variant="outlined"
          value={empId}
          onChange={(e) => setEmpId(e.target.value)} // Handle input change for empId
          sx={{ width: '250px', mr: 1 }}
        />
        <Button variant="contained"  onClick={handleFilterEmployee} sx={{backgroundColor:"#77DD77"}}>
          Search Employee
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button variant="contained" sx={{backgroundColor:"#77DD77"}} onClick={handleAddEmployee}>
          Add Employee
        </Button>
        <Button variant="contained" sx={{backgroundColor:"#77DD77"}} onClick={handleToggleLabourEmployees}>
          {showLabourEmployees ? 'Show Estate Employees' : 'Show Estate Employees'}
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="employee table">
          <TableHead sx={{backgroundColor:"#77DD77"}}>
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
            {(filteredEmployee ? [filteredEmployee] : employees).map((employee) => (
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
                  <IconButton sx={{backgroundColor:"#77DD77"}} onClick={() => handleUpdateEmployee(employee)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton sx={{backgroundColor:"#77DD77"}} onClick={() => handleDeleteEmployee(employee.empId)}>
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
