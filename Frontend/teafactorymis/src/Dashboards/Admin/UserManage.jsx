import React from 'react';
import { Box, Typography } from '@mui/material';

const UserManage = ({ user }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, backgroundColor: '#f5f5f5', height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <Typography variant="h6">
        
      </Typography>
      
    </Box>
  );
};

export default UserManage;
