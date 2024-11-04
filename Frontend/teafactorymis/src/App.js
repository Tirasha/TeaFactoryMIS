import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login/Login';
import Sidebar from './Component/Sidebar';
import AdminDashboard from './Dashboards/Admin/AdminDashboard';
import HRAssistDashboard from './Dashboards/HRAssist/HRAssistDashboard';
import InventoryAssistDashboard from './Dashboards/InventoryAssist/InventoryAssistDashboard';
import SalesAssistDashboard from './Dashboards/SalesAssist/SalesAssistDashboard';
import TechnicalDashboard from './Dashboards/TechnicalAssist/TechnicalDashboard';
import Vehicle  from './Dashboards/TechnicalAssist/Vehicle/Vehicle';
import VehicleAdd  from './Dashboards/TechnicalAssist/Vehicle/VehicleAdd';
import VehicleDetails  from './Dashboards/TechnicalAssist/Vehicle/VehicleDetails';
import { Machine } from './Dashboards/TechnicalAssist/Machine';
import { Fuel } from './Dashboards/TechnicalAssist/Fuel';
import UserManage from './Dashboards/Admin/UserManage';
import ManageSales from './Dashboards/SalesAssist/ManageSales';

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
        {isAuthenticated && <Sidebar user={user} onLogout={handleLogout} />} {/* Render Sidebar if authenticated */}
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
                <Route path="/InventoryDashboard" element={<InventoryAssistDashboard user={user} />} />


            //SalesAssist
                <Route path="/SalesDashboard" element={<SalesAssistDashboard user={user} />} />
                <Route path="/ManageSales" element={<ManageSales user={user} />} />
                <Route path="/TechnicalDashboard" element={<TechnicalDashboard user={user} />} />
                <Route path="/Vehicle" element={<Vehicle user={user} />} />
                <Route path="/VehicleAdd" element={<VehicleAdd user={user} />} />
                <Route path="/VehicleDetails" element={<VehicleDetails user={user} />} />

                <Route path="/Machine" element={<Machine user={user} />} />
                <Route path="/Fuel" element={<Fuel user={user} />} />
              </>
            )}  
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
