import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const AddSalary = () => {
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

  const calculateTotalWorkingDays =()=>{
    if (!start_date || !end_date) {
      window.alert("Please select both start date and end date.");
      return;
    }

    const start = new Date(start_date);
    const end = new Date(end_date);
    const diffInDays = (end - start) / (1000 * 60 * 60);

    if (diffInDays > 31) {
      window.alert("The date range must be 31 days or less than 31.");
      return;
    }

    const filteredAttendance = attendance.filter(record => (
      record.emp_id === emp_id &&
      new Date(record.date) >= start &&
      new Date(record.date) <= end
    ));

    let totalDays = 0;
    filteredAttendance.forEach(record => {
      totalDays += parseFloat(record.workingDays);
    });

    setTotalWorkingDays(totalDays.toFixed(2));

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
    loadAttendance();
    loadEmployee();
  },[]);


  //load empId and role automatically to the form from employee table
  const handleSalaryClick = (role,dayPayment) => {
    // Set the selected employee ID when the salary button is clicked
    setRole(role);
    setDayPayment(dayPayment);
  }

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === 'start_date') {
      setStartDate(value);
    } else if (name === 'end_date') {
      if (new Date(value) > new Date()) {
        window.alert("End date cannot be in the future.");
      } else {
        setEndDate(value);
      }
    }
  }

  const calculateSalary = () => {
    const salary = parseFloat(total_working_days) * parseFloat(day_payment);
    setSalary(salary.toFixed(2));
  }

  // Submit salary data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:8080/salaryAdd",{
        emp_id:emp_id,
        role:role,
        start_date:start_date,
        end_date:end_date,
        total_working_days:total_working_days,
        day_payment:day_payment,
        salary:salary,
        salary_paid_date:salary_paid_date
      });
      window.alert("Salary Saved");
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
        name="emp_id"
        value={emp_id}
        onChange={(e) => setEmp_id(e.target.value)}
        fullWidth
        margin="normal"
        required
        // InputProps={{ readOnly: true }}
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
        Get Total Working hours
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
