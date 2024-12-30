import React, { useEffect, useState } from 'react'
import Sidebar from '../../Component/Sidebar';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const HRAssistDashboard = (user) => {
  const [employee,setEmployee]=useState([]);
  const [roleData, setRoleData] = useState([]);

  const loadEmployee = async () =>{
    const result= await axios.get("http://localhost:8080/api/employees/all");
    try{
      setEmployee(result.data);
  
      // Process data to group employees by role
      const roleCounts = {};
      result.data.forEach((emp) => {
        if (roleCounts[emp.role]) {
          roleCounts[emp.role]++;
        } else {
          roleCounts[emp.role] = 1;
        }
      });

      // Transform into array format for Recharts
      const formattedData = Object.keys(roleCounts).map((role) => ({
        role: role,
        count: roleCounts[role],
      }));
      setRoleData(formattedData);

      console.log("Employee fetched");

    }catch(error){
      alert("Error loading employee");
      console.log("Error loading employee",error);
    }
  }

  useEffect(()=>{
    loadEmployee();
  },[]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, backgroundColor: '#f5f5f5', height: '100vh' }}>
         {/* Bar Chart for Employee Roles */}
         <ResponsiveContainer width="100%" height={400}>
        <BarChart data={roleData} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
          <XAxis dataKey="role" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#77DD77" barSize={80}/>
        </BarChart>
      </ResponsiveContainer>
    
    
  </Box>
);
};

export default HRAssistDashboard
