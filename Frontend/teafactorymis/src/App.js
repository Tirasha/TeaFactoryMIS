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
import TeaStock from './Dashboards/InventoryAssist/Tea_Stock/TeaStock'
import FertilizerStock from './Dashboards/InventoryAssist/Fertilizer_Stock/FertilizerStock';

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
                <Route path="/SalesDashboard" element={<SalesAssistDashboard user={user} />} />
                <Route path="/TechnicalDashboard" element={<TechnicalDashboard user={user} />} />

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
