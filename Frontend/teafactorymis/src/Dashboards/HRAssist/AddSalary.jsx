import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const AddSalary = () => {
  let navigate=useNavigate();

  const [emp_id,setEmp_id]=useState("");
  const [role,setRole]=useState("");
  const [day_payment,setDayPayment]=useState("");
  const [start_date,setStartDate]=useState("");
  const [end_date,setEndDate]=useState("");
  const [total_working_days,setTotalWorkingDays]=useState("");
  const [salary,setSalary]=useState("");
  const [salary_paid_date,setSalaryPaidDate]=useState("");
  const [basic,setBasic]=useState([]);
  const [employees, setEmployees] = useState([]);
  const [attendance,setAttendance]=useState([]);
  const [addSalary,setAddSalary]=useState("");


  const loadEmployee=async()=>{
    try{
      const result=await axios.get("http://localhost:8080/api/employees/all");
    setEmployees(result.data);
    }catch(error){
      console.error("Error loading employees:", error);
    }
  }

  const loadAttendance=async ()=>{
    try{
      const result=await axios.get("http://localhost:8080/api/attendance/all");
      setAttendance(result.data);
    }catch(error){
      console.error("Error loading employees:", error);
    }
  }

  // Handle date input changes
  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  const calculateTotalWorkingDays =()=>{
    if (!start_date || !end_date) {
      window.alert("Please select both start date and end date.");
      return;
    }

    const start = new Date(start_date);
    const end = new Date(end_date);
    const diffInDays = (end - start) / (1000 * 60 * 60 * 24);

    if (diffInDays > 31) {
      window.alert("The date range must be 31 days or less than 31.");
      return;
    }

    const filteredAttendance = attendance.filter(record => (
      record.emp_id === emp_id &&
      new Date(record.date) >= start &&
      new Date(record.date) <= end
    ));

    let totalHours = 0;
    filteredAttendance.forEach(record => {
      totalHours += parseFloat(record.workingHours);
    });

    setTotalWorkingDays(totalHours.toFixed(2));

  }

  //handle cancel
  const handleCancel = async ()=>{
      navigate("/salary");
  }

  const fetchBasic = async ()=>{
    const result=await axios.get("http://localhost:8080/basicGetAll");
    try{
      setBasic(result.data);
    }catch(error){
      window.alert("Error in loading basic detail to the page");
      console.log("Error in loading basic detail to the page",error);
    }
  }

  useEffect(()=>{
    fetchBasic();
    loadAttendance();
    loadEmployee();
  },[]);


  //load empId and role automatically to the form from employee table
  const handleSalaryClick = (day_payment,role) => {
    // Set the selected employee ID when the salary button is clicked
    setRole(role);
    setDayPayment(day_payment);
  }

  // Submit salary data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:8080/",addSalary);
      navigate("/salary");
    }catch(error){
      window.alert("Error in adding salary");
      console.log("Error",error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, p: 3, backgroundColor: 'white', borderRadius: 2 }}>
  {/* Basics Table Section */}
  <Box sx={{ flex: 1 }}>
    <Typography variant="h6" gutterBottom>
      Basics
    </Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="salary basic table" size="small">
        <TableHead sx={{ backgroundColor: "#77DD77" }}>
          <TableRow>
            <TableCell>Role</TableCell>
            <TableCell>Day Payment</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basic.map((basics) => (
            <TableRow key={basics.basicId}>
              <TableCell>{basics.role}</TableCell>
              <TableCell>{basics.dayPayment}</TableCell>
              <TableCell>
                <Button variant="contained" style={{ backgroundColor: '#00AB66', marginRight: "10px" }} onClick={handleSalaryClick}>
                  Add
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>

  {/* Add Salary Form Section */}
  <Box sx={{ flex: 1 }}>
    <Typography variant="h6" gutterBottom>
      Add New Salary Detail
    </Typography>
    <form onSubmit={handleSubmit}>
    <TextField
        label="ID"
        name="EmployeeId"
        value={emp_id}
        onChange={(e) => setEmp_id(e.target.value)}
        fullWidth
        margin="normal"
        required
        InputProps={{ readOnly: true }}
      />

      <TextField
        label="Role"
        name="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Day Payment"
        name="dayPayment"
        value={day_payment}
        onChange={(e) => setDayPayment(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Start Date"
        type="date"
        value={start_date}
        onChange={handleStartDateChange}
        fullWidth
        margin="normal"
        required
        InputLabelProps={{
          shrink: true,
        }}
      />


      <TextField
        label="End Date"
        type="date"
        value={end_date}
        onChange={handleEndDateChange}
        fullWidth
        margin="normal"
        required
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Button variant="contained" onClick={calculateTotalWorkingDays} sx={{ mt: 2, width: '200px', backgroundColor: "#00AB66", alignItems:"center" }}>
        Get Total Working hours
      </Button>

      <TextField
        name="Total Working Hours"
        value={total_working_days}
        onChange={(e) => setTotalWorkingDays(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Salary Payment"
        name="salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="contained" style={{ backgroundColor: '#00AB66' }} type="submit">
          Add Salary
        </Button>
        <Button variant="outlined" style={{ backgroundColor: 'red', color: '#fff' }} onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
    </form>
  </Box>
</Box>
  );
};
