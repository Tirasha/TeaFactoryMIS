import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Home, Person, Menu as MenuIcon, LightMode, DarkMode } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ user, onLogout, isDarkMode, onToggleDarkMode }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');
  
  const theme = useTheme();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    handleMenuClose();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.background.default, boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
        {/* Logo and Title */}
        <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
            Tea Management System
          </Typography>
        </Box>

        {/* Navigation Links for Desktop */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <IconButton
              sx={{ color: theme.palette.text.primary, '&:hover': { color: '#4CAF50' }, transition: 'color 0.3s ease' }}
              onClick={() => navigate('/SalesDashboard')}
            >
              <Home />
            </IconButton>
            <IconButton
              sx={{ color: theme.palette.text.primary, '&:hover': { color: '#4CAF50' }, transition: 'color 0.3s ease' }}
              onClick={() => navigate('/ProfilePage')}
            >
              <Person />
            </IconButton>
          </Box>
        )}

        {/* User Profile Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar
            alt={user?.user?.username || 'User'}
            src={user?.profilePicture || ''}
            sx={{
              bgcolor: '#4CAF50',
              color: '#fff',
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#388E3C' },
              transition: 'background-color 0.3s ease',
            }}
            onClick={handleMenuOpen}
          />
          {!isMobile && (
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: '500',
                cursor: 'pointer',
                '&:hover': { color: '#4CAF50' },
                transition: 'color 0.3s ease',
              }}
              onClick={handleMenuOpen}
            >
              {user?.user?.username || 'Guest'}
            </Typography>
          )}
        </Box>

        {/* User Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            style: {
              marginTop: '40px',
              minWidth: '150px',
            },
          }}
        >
          <MenuItem onClick={() => { handleMenuClose(); navigate('/ProfilePage'); }}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>

        {/* Mobile Menu Icon */}
        {isMobile && (
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
        )}

        {/* Dark Mode / Light Mode Toggle */}
        <IconButton color="inherit" onClick={onToggleDarkMode}>
          {isDarkMode ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
