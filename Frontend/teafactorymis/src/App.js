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
import UserManage from './Dashboards/Admin/UserManage';
import ManageSales from './Dashboards/SalesAssist/ManageSales';
import AddSales from './Dashboards/SalesAssist/AddSales';
import ViewSales from './Dashboards/SalesAssist/ViewSales';
import UpdateSales from './Dashboards/SalesAssist/UpdateSales';

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
                <Route path="/InventoryDashboard" element={<InventoryAssistDashboard user={user} />} />



                <Route path="/SalesDashboard" element={<SalesAssistDashboard user={user} />} />
                <Route path="/ManageSales" element={<ManageSales user={user} />} />
                <Route path="/AddSales" element={<AddSales user={user} />} />
                <Route path="/ViewSales" element={<ViewSales user={user} />} />
                <Route path="/UpdateSales" element={<UpdateSales user={user} />} />
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
