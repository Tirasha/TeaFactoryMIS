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
import { Home, Assignment, Dashboard, Settings, Logout, People, Event, ExpandLess, ExpandMore } from '@mui/icons-material';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import TableViewIcon from '@mui/icons-material/TableView';
import UpdateIcon from '@mui/icons-material/Update';
import logo from '../Images/logo.png';
const drawerWidth = 240;

const Sidebar = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = user?.employee?.role;
  
  const [openMenus, setOpenMenus] = useState({});

  const handleMenuClick = (menu) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  const getSidebarItems = (role) => {
    switch (role) {
      case 'Admin':
        return [
          { text: 'Dashboard', icon: <Home />, path: '/AdminDashboard' },
          { text: 'Manage Users', icon: <Assignment />, path: '/UserManage' },
          { text: 'UserForm', icon: <People />, path: '/UserForm' },
        ];

      case 'HRAssist':
        return [
          { text: 'Dashboard', icon: <Dashboard />, path: '/HRAssistDashboard' },
          { text: 'Employee', icon: <People />, path: '/Employee' },
          {
            text: 'Attendance',
            icon: <Event />,
            dropdown: true,
            items: [
              { text: 'Estate Workers Attendance', path: '/EstateWorkersAttendance' },
              { text: 'Factory Workers Attendance', path: '/FactoryWorkersAttendance' },
            ],
          },
        ];

      case 'InventoryAssist':
        return [{ text: 'Inventory Dashboard', icon: <Dashboard />, path: '/InventoryDashboard' }];
      
      case 'SalesAssist':
        return [
          { text: 'Sales Dashboard', icon: <Dashboard />, path: '/SalesDashboard' },
          {
            text: 'Manage Sales',
            icon: <ManageAccountsIcon />,
            dropdown: true,
            items: [
              { text: 'Add Sales', icon: <NoteAddIcon />, path: '/AddSales' },
              { text: 'View Sales', icon: <TableViewIcon />, path: '/ViewSales' },
              { text: 'Update Sales', icon: <UpdateIcon />, path: '/UpdateSales' },
            ],
          },
          
        ];
      
      case 'TechnicalAssist':
        return [{ text: 'Technical Dashboard', icon: <Dashboard />, path: '/TechnicalDashboard' }];
      
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
            backgroundColor: '#4CAF50',
            color: '#FFFFFF',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ padding: 2, textAlign: 'center' }}>
      
          <Avatar
            src={logo}
            alt={user?.user?.username || 'User'}
            sx={{ width: 80, height: 80, margin: '0 auto' }}
          />
          <Typography variant="h6" sx={{ mt: 1 }}>
            {user?.user?.username || 'Guest User'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'black' }}>
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
                onClick={item.dropdown ? () => handleMenuClick(item.text) : null}
                selected={location.pathname === item.path}
                sx={{
                  color: location.pathname === item.path ? '#1B5E20' : '#FFFFFF',
                  backgroundColor: location.pathname === item.path ? '#A5D6A7' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#81C784',
                    color: '#FFFFFF',
                  },
                  transition: 'background-color 0.3s, color 0.3s',
                }}
              >
                <ListItemIcon
                  sx={{
                    color: location.pathname === item.path ? '#1B5E20' : '#FFFFFF',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
                {item.dropdown ? (openMenus[item.text] ? <ExpandLess /> : <ExpandMore />) : null}
              </ListItem>

              {item.dropdown && (
                <Collapse in={openMenus[item.text]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.items.map((subItem, subIndex) => (
                      <ListItem
                        key={subIndex}
                        button
                        component={Link}
                        to={subItem.path}
                        sx={{
                          pl: 4,
                          color: location.pathname === subItem.path ? '#1B5E20' : '#FFFFFF',
                          backgroundColor: location.pathname === subItem.path ? '#A5D6A7' : 'transparent',
                          '&:hover': {
                            backgroundColor: '#81C784',
                            color: '#FFFFFF',
                          },
                          transition: 'background-color 0.3s, color 0.3s',
                        }}
                        selected={location.pathname === subItem.path}
                      >
                        <ListItemIcon sx={{ color: location.pathname === subItem.path ? '#1B5E20' : '#FFFFFF' }}>
                          {subItem.icon}
                        </ListItemIcon>
                        <ListItemText primary={subItem.text} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}

<ListItem
            button
            onClick={handleLogout}
            sx={{
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#388E3C',
              },
            }}
          >
            <ListItemIcon sx={{ color: '#FFFFFF' }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
