import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Paper, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const UserForm = ({
  newUser = {
    userId: '',
    username: '',
    password: '',
    empId: ''
  },
  handleSubmitCreate,
  editingUser
}) => {
  const [employees, setEmployees] = useState([]);
  const [user, setUser] = useState(editingUser || newUser);

  // Fetch employee data when the component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/employees/all');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  // Handle input changes for all fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  // Handle user creation
  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/user/create', user);
      console.log('User created:', response.data);
      handleSubmitCreate(response.data); // Pass the response data to parent handler
    } catch (error) {
      console.error('Error creating user:', error.response?.data || error.message);
    }
  };

  // Handle employee ID selection change
  const handleEmpIdChange = (event) => {
    setUser({ ...user, empId: event.target.value });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: 2,
      }}
    >
      <Paper
        sx={{
          padding: 3,
          width: '100%',
          maxWidth: 400,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <form onSubmit={handleCreate}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="User ID"
                name="userId"
                value={user.userId || ''}
                onChange={handleInputChange}
                fullWidth
                required
                disabled={editingUser} // Disable if editing an existing user
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Username"
                name="username"
                value={user.username || ''}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={user.password || ''}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="empId-label">Employee ID</InputLabel>
                <Select
                  labelId="empId-label"
                  name="empId"
                  value={user.empId || ''}
                  onChange={handleEmpIdChange}
                  label="Employee ID"
                >
                  {employees.map((employee) => (
                    <MenuItem key={employee.empId} value={employee.empId}>
                      {employee.empId} 
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: '#4caf50', width: '100%' }}
              >
                {editingUser ? 'Update User' : 'Create User'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default UserForm;
