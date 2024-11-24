import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login/Login';
import NavBar from './Component/NavBar';
import Sidebar from './Component/Sidebar';
import AdminDashboard from './Dashboards/Admin/AdminDashboard';
import HRAssistDashboard from './Dashboards/HRAssist/HRAssistDashboard';
import InventoryAssistDashboard from './Dashboards/InventoryAssist/InventoryAssistDashboard';
import SalesAssistDashboard from './Dashboards/SalesAssist/SalesAssistDashboard';
import TechnicalDashboard from './Dashboards/TechnicalAssist/TechnicalDashboard';
import VehicleAdd  from './Dashboards/TechnicalAssist/Vehicle/VehicleAdd';
import VehicleDetails  from './Dashboards/TechnicalAssist/Vehicle/VehicleDetails';

import MachineAdd  from './Dashboards/TechnicalAssist/Machine/MachineAdd';
import MachineDetails  from './Dashboards/TechnicalAssist/Machine/MachineDetails';

import FuelAdd  from './Dashboards/TechnicalAssist/Fuel/FuelAdd';
import FuelDetails  from './Dashboards/TechnicalAssist/Fuel/FuelDetails';
import UserManage from './Dashboards/Admin/UserManage';
import { Employee } from './Dashboards/HRAssist/Employee';
import EmpAdd from './Dashboards/HRAssist/EmpAdd';
import EmpEdit from './Dashboards/HRAssist/EmpEdit';
import Attendance from './Dashboards/HRAssist/Attendance';
import FactoryWorkersAttendance from './Dashboards/HRAssist/FactoryWorkersAttendance'; // Importing FactoryWorkersAttendance
import EstateWorkersAttendance from './Dashboards/HRAssist/EstateWorkersAttendance';
import AttendanceAddEst from './Dashboards/HRAssist/AttendanceAddEst';
import AttendanceupdateEs from './Dashboards/HRAssist/AttendanceupdateEs';
import AttendanceupdateFac from './Dashboards/HRAssist/AttendanceupdateFac';
import TeaStock from './Dashboards/InventoryAssist/Tea_Stock/TeaStock'
import FertilizerStock from './Dashboards/InventoryAssist/Fertilizer_Stock/FertilizerStock';
import ManageSales from './Dashboards/SalesAssist/ManageSales';
import AddSales from './Dashboards/SalesAssist/AddSales';
import ViewSales from './Dashboards/SalesAssist/ViewSales';
import UpdateSales from './Dashboards/SalesAssist/UpdateSales';
import { Basics } from './Dashboards/HRAssist/Basics';
import { Salary } from './Dashboards/HRAssist/Salary';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem('isAuthenticated')) || false
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    localStorage.setItem('user', JSON.stringify(user));
  }, [isAuthenticated, user]);

  const handleLogin = (userResponse) => {
    setIsAuthenticated(true);
    setUser(userResponse);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div style={{ display: 'flex',width: '100%', minHeight: '100vh',zIndex: 1 }}>
        {isAuthenticated && <Sidebar user={user} onLogout={handleLogout} />}

        <div style={{ flexGrow: 1 }}>
          {isAuthenticated && <NavBar user={user} onLogout={handleLogout} />}
          
          <Routes>

            {!isAuthenticated && <Route path="*" element={<Navigate to="/" replace />} />}
            
          
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            
            {isAuthenticated && (
              <>
                <Route path="/AdminDashboard" element={<AdminDashboard user={user} />} />
                <Route path="/UserManage" element={<UserManage user={user} />} />
                <Route path="/HRDashboard" element={<HRAssistDashboard user={user} />} />
                <Route path="/Employee" element={<Employee user={user} />} />
                <Route path="/AddEmployee" element={<EmpAdd user={user} />} />
                <Route path="/EditEmployee/:empId" element={<EmpEdit />} /> 
                <Route path="/Attendance" element={<Attendance user={user} />} />
                <Route path="/basics" element={<Basics user={user}/>}/>
                <Route path="/salary" element={<Salary user={user}/>}/>
                
                {/* Attendance category routes */}
                <Route path="/EstateWorkersAttendance" element={<EstateWorkersAttendance user={user} />} />
                <Route path="/FactoryWorkersAttendance" element={<FactoryWorkersAttendance user={user} />} />
                <Route path="/AddAttendance" element={<AttendanceAddEst user={user} />} />
              

                <Route path="/InventoryDashboard" element={<InventoryAssistDashboard user={user} />} />
                <Route path="/SalesDashboard" element={<SalesAssistDashboard user={user} />} />
                <Route path="/ManageSales" element={<ManageSales user={user} />} />
                <Route path="/AddSales" element={<AddSales user={user} />} />
                <Route path="/ViewSales" element={<ViewSales user={user} />} />
                <Route path="/UpdateSales" element={<UpdateSales user={user} />} />
                <Route path="/TechnicalDashboard" element={<TechnicalDashboard user={user} />} />
                
                <Route path="/VehicleAdd" element={<VehicleAdd user={user} />} />
                <Route path="/VehicleDetails" element={<VehicleDetails user={user} />} />

                <Route path="/MachineAdd" element={<MachineAdd user={user} />} />
                <Route path="/MachineDetails" element={<MachineDetails user={user} />} />

                <Route path="/FuelAdd" element={<FuelAdd user={user} />} />
                <Route path="/FuelDetails" element={<FuelDetails user={user} />} />
              
            
                <Route path="/AttendanceupdateEs/:attId" element={<AttendanceupdateEs />} />
                <Route path="/Attendanceupdatefac/:attId" element={<AttendanceupdateFac />} />
                

              

              {/* inventory routes */}
                <Route path="/InventoryAssistDashboard" element={<InventoryAssistDashboard user={user} />} />
                <Route path ="/TeaStock" element={<TeaStock/>}/>
                <Route path='/FertilizerStock' element={<FertilizerStock/>}/>
                
              </>
            )}
            
        
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
