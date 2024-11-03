import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Typography,
  Avatar,
  Divider,
} from '@mui/material';
import { Home, Assignment, Dashboard, Settings, Logout, Commute, LocalGasStation, Factory} from '@mui/icons-material';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = user?.employee?.role;

  const getSidebarItems = (role) => {
    switch (role) {
      case 'Admin':
        return [
          { text: 'Dashboard', icon: <Home />, path: '/AdminDashboard' },
          { text: 'Manage Users', icon: <Assignment />, path: '/UserManage' },
        ];

      case 'HRAssist':
        return [{ text: 'Dashboard', icon: <Dashboard />, path: '/HRAssistDashboard' }];
      
      case 'InventoryAssist':
        return [{ text: 'Inventory Dashboard', icon: <Dashboard />, path: '/InventoryDashboard' }];
      
      case 'SalesAssist':
        return [{ text: 'Sales Dashboard', icon: <Dashboard />, path: '/SalesDashboard' }];
      
      case 'TechnicalAssist':
        return [{ text: 'Technical Dashboard', icon: <Dashboard />, path: '/TechnicalDashboard' },
                { text: 'Vehicle', icon: <Commute />, path: '/Vehicle' },
                { text: 'Machine', icon: <Factory />, path: '/Machine' },
                { text: 'Fuel', icon: <LocalGasStation />, path: '/Fuel' }];
      
      default:
        return [];
    }
  };

  const handleLogout = () => {
    onLogout(); // Call the logout function passed as a prop
    navigate('/login'); // Navigate to the login page after logout
  };

  const sidebarItems = getSidebarItems(userRole);

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: '#E8F5E9',
            color: '#1B5E20',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ padding: 2, textAlign: 'center' }}>
          <Avatar
            src={user?.employee?.Image || '/default-profile.png'}
            alt={user?.employee?.user?.username || 'User'}
            sx={{ width: 80, height: 80, margin: '0 auto' }}
          />
          <Typography variant="h6" sx={{ mt: 1 }}>
            {user?.employee?.user?.username || 'Guest User'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray' }}>
            {userRole}
          </Typography>
        </Box>

        <Divider />

        <List>
          {sidebarItems.map((item, index) => (
            <ListItem button component={Link} to={item.path} key={index} selected={location.pathname === item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <ListItem button onClick={handleLogout}>
            <ListItemIcon><Logout /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
