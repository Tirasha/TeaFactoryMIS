import React, { useState } from 'react';
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
  Collapse,
} from '@mui/material';
import { Home, Assignment, Dashboard, Event, Logout, ExpandLess, ExpandMore } from '@mui/icons-material';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = user?.employee?.role;

  const [inventory,setInventory]=useState(false);

  const handleInventoryClick = () => {
    setInventory(!inventory); // Toggle dropdown
  };
  

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
        return [
          { text: 'Inventory Dashboard', icon: <Dashboard />, path: '/InventoryAssistDashboard' },
          {
            text: 'Inventory',
            icon: <Event/>,
            dropdown: true, // Indicates this item has nested links
            items: [
              { text: 'Tea Stock', path: '/TeaStock' },
              { text: 'Fertilizer Stock', path: '/FertilizerStock' },
            ],
          },

        ];
      
      case 'SalesAssist':
        return [{ text: 'Sales Dashboard', icon: <Dashboard />, path: '/SalesDashboard' }];
      
      case 'TechnicalAssist':
        return [{ text: 'Technical Dashboard', icon: <Dashboard />, path: '/TechnicalDashboard' }];
      
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
            backgroundColor: '#4CAF50',
            color: '#ffffff',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ padding: 2, textAlign: 'center' }}>
          <Avatar
            src={user?.employee?.Image || '/default-profile.png'}
            alt={user?.user?.username || 'User'}
            sx={{ width: 80, height: 80, margin: '0 auto' }}
          />
          <Typography variant="h6" sx={{ mt: 1 }}>
            {user?.user?.username || 'Guest User'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray' }}>
            {userRole}
          </Typography>
        </Box>

        <Divider />

        <List>
          {sidebarItems.map((item, index) => (
            <React.Fragment key={index}>
            <ListItem
              button
              component={item.path ? Link : 'div'}
              to={item.path}
              onClick={item.dropdown ? handleInventoryClick : null}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
              {item.dropdown ? (inventory ? <ExpandLess /> : <ExpandMore />) : null}
            </ListItem>

            {item.dropdown && (
              <Collapse in={inventory} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.items.map((subItem, subIndex) => (
                    <ListItem
                      key={subIndex}
                      button
                      component={Link}
                      to={subItem.path}
                      sx={{ pl: 4 }}
                      selected={location.pathname === subItem.path}
                    >
                      <ListItemText primary={subItem.text} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
            </React.Fragment>

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
