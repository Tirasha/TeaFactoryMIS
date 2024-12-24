import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const AddSalary = () => {
  let navigate=useNavigate();
  const [empId,setEmp_id]=useState("");
  const [role,setRole]=useState("");
  const [day_payment,setDayPayment]=useState("");
  const [start_date,setStartDate]=useState("");
  const [end_date,setEndDate]=useState("");
  const [total_working_days,setTotalWorkingDays]=useState("");
  const [salary,setSalary]=useState("");
  const [salary_paid_date,setSalaryPaidDate]=useState("");
  const [basic,setBasic]=useState([]);
  const [employees, setEmployees] = useState([]);
  const [estateWorkersAttendance,setAttendance]=useState([]);

  const loadEmployee = async () => {
    const result = await axios.get("http://localhost:8080/api/employees/all");
    try {
      setEmployees(result.data);
      console.log("Employee fetched");
      // if (Array.isArray(result.data)) {
      //   setEmployees(result.data);
      //   console.log("Employee fetched succuessfully");
      // } else {
      //   console.error("Unexpected data format: ", result.data);
      // }
    } catch (error) {
      console.error("Error loading employees:", error);
    }
  };
  

  useEffect(()=>{
    loadEmployee();
  },[]);

  const loadAttendance=async ()=>{
    try{
      const result=await axios.get("http://localhost:8080/api/attendance/all");
      setAttendance(result.data);
      console.log("Attendance loaded");
    }catch(error){
      console.error("Error loading employees:", error);
    }
  }

  const calculateTotalWorkingDays =()=>{
    if (!start_date || !end_date) {
      window.alert("Please select both start date and end date.");
      return;
    }

    const start = new Date(start_date);
    const end = new Date(end_date);
    const diffInDays = (end - start) / (1000 * 60 * 60*24);

    if (diffInDays > 31) {
      window.alert("The date range must be 31 days or less than 31.");
      return;
    }

    const filteredAttendance = estateWorkersAttendance.filter(record => (
      record.empId === empId &&
      new Date(record.date) >= start &&
      new Date(record.date) <= end
    ));

    let totalDays = 0;
    filteredAttendance.forEach(record => {
      totalDays += parseInt(record.workingDays);
    });

    setTotalWorkingDays(diffInDays);

  }

  //handle cancel
  const handleCancel = async ()=>{
      setEmp_id("");
      setRole("");
      setDayPayment("");
      setStartDate("");
      setEndDate("");
      setTotalWorkingDays("");
      setSalary("");
      setSalaryPaidDate("");
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
  },[]);

  useEffect(()=>{
    loadAttendance();
  },[]);


  //load empId and role automatically to the form from employee table
  const handleSalaryClick = (role,dayPayment) => {
    // Set the selected employee ID when the salary button is clicked
    setRole(role);
    setDayPayment(dayPayment);
  }

  const handleDateChange = (e) => {
  const { name, value } = e.target;
  
  // Parse the entered date
  const enteredDate = new Date(value);
  const today = new Date(); // Get today's date
  
  if (name === 'start_date') {
    setStartDate(value); // Update the start date
  } else if (name === 'end_date') {
    if (enteredDate > today) {
      window.alert("End date cannot be in the future.");
    } else if (start_date && enteredDate < new Date(start_date)) {
      window.alert("End date cannot be earlier than start date.");
    } else {
      setEndDate(value); // Update the end date if it's valid
    }
  }
};


const calculateSalary = () => {
  if (!total_working_days || !day_payment) {
    window.alert("Day payment or total working days is missing!");
    return;
  }
  const salary = parseFloat(total_working_days) * parseFloat(day_payment);
  setSalary(salary.toFixed(2));
};


  // Submit salary data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting salary data:", {
        empId,
        role,
        start_date,
        end_date,
        total_working_days,
        day_payment,
        salary,
        salary_paid_date,
      });
      await axios.post("http://localhost:8080/salaryAdd", {
        empId,
        role,
        start_date,
        end_date,
        total_working_days,
        day_payment,
        salary,
        salary_paid_date,
      });
      window.alert("Salary Saved");
      navigate("/salary");
    } catch (error) {
      console.error("Error in adding salary:", error.response?.data || error.message);
      window.alert("Error in adding salary");
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
                <Button variant="contained" style={{ backgroundColor: '#00AB66', marginRight: "10px" }} onClick={()=>handleSalaryClick(basics.role,basics.dayPayment)}>
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
    <form onSubmit={(e) => e.preventDefault()}>
    <TextField
        label="ID"
        name="empId"
        value={empId}
        onChange={(e) => setEmp_id(e.target.value)}
        fullWidth
        margin="normal"
        required
        // InputProps={{ readOnly: true }}
      />
{/* <FormControl fullWidth variant="outlined" margin="normal">
  <InputLabel id="employee-select-label">Select Employee</InputLabel>
  <Select
    labelId="employee-select-label"
    id="employee-select"
    name="emp_id"
    value={emp_id || ""} // Default value to avoid errors
    onChange={(e) => setEmp_id(e.target.value)} // Update state on change
    label="Select Employee"
  >
    {employees.length === 0 ? (
      <MenuItem disabled>No Employees Found</MenuItem>
    ) : (
      employees.map((employee) => (
        <MenuItem key={employee.emp_id} value={employee.emp_id}>
          {employee.name} ({employee.emp_id})
        </MenuItem>
      ))
    )}
  </Select>
</FormControl> */}
   

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
        name="day_payment"
        value={day_payment}
        onChange={(e) => setDayPayment(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Start Date"
        type="date"
        name='start_date'
        value={start_date}
        onChange={handleDateChange}
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
        name="end_date"
        value={end_date}
        onChange={handleDateChange}
        fullWidth
        margin="normal"
        required
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Button variant="contained" onClick={calculateTotalWorkingDays} sx={{ mt: 2, width: '200px', backgroundColor: "#00AB66", alignItems:"center" }}>
        Get Total Working Days
      </Button>

      <TextField
        name="Total Working Days"
        value={total_working_days}
        onChange={(e) => setTotalWorkingDays(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      <Button variant="contained" onClick={calculateSalary} sx={{ mt: 2, width: '200px', backgroundColor: "#00AB66", alignItems:"center" }}>
        Calculate Salary
      </Button>

      <TextField
        label="Salary Payment"
        name="salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Salary Paid Date"
        type="date"
        name="salary_paid_date"
        value={salary_paid_date}
        onChange={(e) => setSalaryPaidDate(e.target.value)}
        fullWidth
        margin="normal"
        required
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="contained" style={{ backgroundColor: '#00AB66' }} type="submit" onClick={handleSubmit}>
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
