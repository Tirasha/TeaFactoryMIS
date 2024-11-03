import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login/Login';
import Sidebar from './Component/Sidebar';
import AdminDashboard from './Dashboards/Admin/AdminDashboard';
import HRAssistDashboard from './Dashboards/HRAssist/HRAssistDashboard';
import InventoryAssistDashboard from './Dashboards/InventoryAssist/InventoryAssistDashboard';
import SalesAssistDashboard from './Dashboards/SalesAssist/SalesAssistDashboard';
import TechnicalDashboard from './Dashboards/TechnicalAssist/TechnicalDashboard';
import UserManage from './Dashboards/Admin/UserManage';
import { Employee } from './Dashboards/HRAssist/Employee';
import EmpAdd from './Dashboards/HRAssist/EmpAdd';
import EmpEdit from './Dashboards/HRAssist/EmpEdit';
import Attendance from './Dashboards/HRAssist/Attendance';
import FactoryWorkersAttendance from './Dashboards/HRAssist/FactoryWorkersAttendance'; // Importing FactoryWorkersAttendance
import EstateWorkersAttendance from './Dashboards/HRAssist/EstateWorkersAttendance'; // Importing EstateWorkersAttendance

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userResponse) => {
    setIsAuthenticated(true);
    setUser(userResponse);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {isAuthenticated && <Sidebar user={user} onLogout={handleLogout} />}
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to={`/${user?.employee?.role}Dashboard`} /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            
            {/* Protected Routes */}
            {isAuthenticated && (
              <>
                <Route path="/AdminDashboard" element={<AdminDashboard user={user} />} />
                <Route path="/UserManage" element={<UserManage user={user} />} />

                <Route path="/HRDashboard" element={<HRAssistDashboard user={user} />} />
                <Route path="/Employee" element={<Employee user={user} />} />
                <Route path="/AddEmployee" element={<EmpAdd user={user} />} />
                <Route path="/EditEmployee/:empId" element={<EmpEdit />} /> 
                <Route path="/Attendance" element={<Attendance user={user} />} />
                
                {/* Attendance category routes */}
                <Route path="/EstateWorkersAttendance" element={<EstateWorkersAttendance user={user} />} />
                <Route path="/FactoryWorkersAttendance" element={<FactoryWorkersAttendance user={user} />} />
              

                <Route path="/InventoryDashboard" element={<InventoryAssistDashboard user={user} />} />
                <Route path="/SalesDashboard" element={<SalesAssistDashboard user={user} />} />
                <Route path="/TechnicalDashboard" element={<TechnicalDashboard user={user} />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
