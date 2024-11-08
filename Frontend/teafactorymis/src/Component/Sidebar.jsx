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
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import TableViewIcon from '@mui/icons-material/TableView';
import UpdateIcon from '@mui/icons-material/Update';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Commute from '@mui/icons-material/Commute';
import Factory from '@mui/icons-material/Factory';
import LocalGasStation from '@mui/icons-material/LocalGasStation';
import logo from '../Images/logo.png';

const drawerWidth = 240;

const Sidebar = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = user?.employee?.role;
  
  // State to control the dropdown for attendance
  const [openAttendance, setOpenAttendance] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  const handleAttendanceClick = () => {
    setOpenAttendance(!openAttendance); // Toggle dropdown
  };

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
            onClick: handleAttendanceClick,
            open:openAttendance,
            items: [
              { text: 'Estate Workers Attendance', path: '/EstateWorkersAttendance' },
              { text: 'Factory Workers Attendance', path: '/FactoryWorkersAttendance' },
            ],
          }
        ];

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
      
  case "TechnicalAssist":
    return [
      {
        text: "Technical Dashboard",
        icon: <Dashboard />,
        path: "/TechnicalDashboard",
      },
      {
        text: "Vehicle",
        icon: <Commute />,
        dropdown: true, // Indicates this item has nested links
        items: [
          {
            text: "Add Vehicle",
            path: "/VehicleAdd",
          },
          {
            text: "View Vehicle Details",
            path: "/VehicleDetails",
          },
        ],
      },
      {
        text: "Machine",
        icon: <Factory />,
        dropdown: true, // Indicates this item has nested links
            items: [
              {
                text: "Add Machine",
                path: "/MachineAdd",
              },
              {
                text: "View Machine Details",
                path: "/MachineDetails",
              },
            ],
          },
          {
            text: "Fuel",
            icon: <LocalGasStation />,
            dropdown: true, // Indicates this item has nested links
            items: [
              {
                text: "Add Fuel Type",
                path: "/FuelAdd",
              },
              {
                text: "View Fuel Types",
                path: "/FuelDetails",
              },
            ],
          },]
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
