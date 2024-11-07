import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box, ListItemText,ListItem } from '@mui/material';
import { Home, Person, ShoppingCart, Notifications, Menu } from '@mui/icons-material';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import logo from '../Images/logo.png';
const NavBar = (user,onLogout) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#4CAF50' }}>
      <Toolbar>
       
    
    <Typography variant="h5" component="div" sx={{ flexGrow: 3, fontWeight: 'bold' }}>
        Tea Management System
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
        
       </Box>

        
        
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
