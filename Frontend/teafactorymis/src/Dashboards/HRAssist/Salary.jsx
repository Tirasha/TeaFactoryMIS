import { Box, Button, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AddSalary } from './AddSalary';

export const Salary = () => {
  let navigate=useNavigate();
  const [salary,setSalary]=useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [employees,setEmployees]=useState([]);
  const [openAddForm, setOpenAddForm] = useState(false);

  const loadSalary =async()=>{
    const result=await axios.get("http://localhost:8080/salaryGet");
    setSalary(result.data);
  }

  const loadEmployee =async ()=>{
    const result=await axios.get("http://localhost:8080/api/employees/all")
    try{
      setEmployees(result.data);
    }catch(error){
      window.alert("Error in loading employee");
    }
  }

  useEffect(()=>{
    loadSalary();
    loadEmployee();
  },[]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddNewBasic=()=>{
    navigate("/addSalary");
  }

  const handleCloseAddForm = () => {
    setOpenAddForm(false);
  };

  const filteredSalary = salary.filter(salary =>
    (salary.salary_id && salary.salary_id.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (salary.salary_paid_date && salary.salary_paid_date.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const deleteSalary = async (salary_id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        await axios.delete(`http://localhost:8080/salaryDelete/${salary_id}`);
        loadSalary();
      } catch (error) {
        window.alert("The salary detail cannot be deleted...!");
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, backgroundColor: '#f5f5f5', height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Details of Salary
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchInputChange}
          sx={{ flex: 1, mr: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton><SearchIcon /></IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained" 
          onClick={handleAddNewBasic}
          sx={{ width: '200px', backgroundColor: "#00AB66" }}
        >
          Add New Salary
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="salary basic table" size="small">
          <TableHead sx={{ backgroundColor: "#77DD77" }}>
            <TableRow>
              <TableCell>Salary ID</TableCell>
              <TableCell>Employee Id</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Total Working Days</TableCell>
              <TableCell>Day Payment</TableCell>
              <TableCell>Salary Paid Date</TableCell>
              <TableCell>Salary Amount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {filteredSalary.map((salary) => (
              <TableRow key={salary.salary_id}>
                <TableCell>{salary.salaryId}</TableCell>
                <TableCell>{salary.employee ? salary.employee.empId: 'N/A'}</TableCell>
                <TableCell>{salary.role}</TableCell>
                <TableCell>{salary.start_date}</TableCell>
                <TableCell>{salary.end_date}</TableCell>
                <TableCell>{salary.total_working_days}</TableCell>
                <TableCell>{salary.day_payment}</TableCell>
                <TableCell>{salary.salary_paid_date}</TableCell>
                <TableCell>{salary.salary}</TableCell>
                <TableCell>
                  <Button variant="contained" style={{ backgroundColor: '#00AB66' }} onClick={() => deleteSalary(salary.salaryId)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <AddSalary openForm={openAddForm} handleCloseForm={handleCloseAddForm} onFormSubmit={loadSalary}/> */}
    </Box>
  )
}
