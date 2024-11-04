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
import { Home, Assignment, Dashboard, Settings, Logout, People, Event, ExpandLess, ExpandMore, MonetizationOn } from '@mui/icons-material'; // Added Expand icons
import { useLocation, Link, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = user?.employee?.role;
  
  // State to control the dropdown for attendance
  const [openAttendance, setOpenAttendance] = useState(false);
  const [openSalary, setOpenSalary] = useState(false);

  const handleAttendanceClick = () => {
    setOpenAttendance(!openAttendance); // Toggle dropdown
  };

  const handleSalaryClick =() =>{
    setOpenSalary(!openSalary);
  }

  const getSidebarItems = (role) => {
    switch (role) {
      case 'Admin':
        return [
          { text: 'Dashboard', icon: <Home sx={{color:'#FFFFFF'}}/>, path: '/AdminDashboard' },
          { text: 'Manage Users', icon: <Assignment sx={{color:'#FFFFFF'}}/>, path: '/UserManage' },
          { text: 'Customers', icon: <People sx={{color:'#FFFFFF'}}/>, path: '/Customers' },
        ];

      case 'HRAssist':
        return [
          { text: 'Dashboard', icon: <Dashboard sx={{color:'#FFFFFF'}}/>, path: '/HRAssistDashboard' },
          { text: 'Employee', icon: <People sx={{color:'#FFFFFF'}}/>, path: '/Employee'},
          {
            text: 'Attendance',
            icon: <Event sx={{color:'#FFFFFF'}}/>,
            dropdown: true, // Indicates this item has nested links
            items: [
              { text: 'Estate Workers Attendance', path: '/EstateWorkersAttendance' },
              { text: 'Factory Workers Attendance', path: '/FactoryWorkersAttendance' },
            ],
          },
          {text : 'Salary',
            icon: <MonetizationOn sx={{color:'#FFFFFF'}}/>,
            dropdown:true,
            items:[
              {text: 'Basics', path: '/Basics'},
              {text: 'View Salary', path: '/Salary'},
            ],
          }
        ];

      case 'InventoryAssist':
        return [{ text: 'Inventory Dashboard', icon: <Dashboard sx={{color:'#FFFFFF'}}/>, path: '/InventoryDashboard' }];
      
      case 'SalesAssist':
        return [{ text: 'Sales Dashboard', icon: <Dashboard sx={{color:'#FFFFFF'}}/>, path: '/SalesDashboard' }];
      
      case 'TechnicalAssist':
        return [{ text: 'Technical Dashboard', icon: <Dashboard sx={{color:'#FFFFFF'}}/>, path: '/TechnicalDashboard' }];
      
      default:
        return [];
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
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
            backgroundColor: '#023020',
            color: '#FFFFFF',
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
                onClick={item.dropdown ? handleAttendanceClick : null}
                selected={location.pathname === item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {item.dropdown ? (openAttendance ? <ExpandLess /> : <ExpandMore />) : null}
              </ListItem>

              {item.dropdown && (
                <Collapse in={openAttendance} timeout="auto" unmountOnExit>
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
            <ListItemIcon><Logout sx={{color:'#FFFFFF'}}/></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
