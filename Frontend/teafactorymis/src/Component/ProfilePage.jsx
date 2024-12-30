import React, { useState, useEffect } from 'react';
import { TextField, Button, Avatar, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ user, onUpdateProfile }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(user?.user?.username || '');
  const [email, setEmail] = useState(user?.user?.email || '');
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '');

  useEffect(() => {
    if (!user) navigate('/login'); // Redirect if the user is not logged in
  }, [user, navigate]);

  const handleSave = () => {
    // Handle saving profile changes here
    const updatedUser = { username, email, profilePicture };
    onUpdateProfile(updatedUser); // Call the parent function to update the profile
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Profile Details
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
        <Avatar alt={username} src={profilePicture} sx={{ width: 100, height: 100 }} />
      </Box>
      <TextField
        label="Username"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Profile Picture URL"
        fullWidth
        value={profilePicture}
        onChange={(e) => setProfilePicture(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        onClick={handleSave}
        sx={{
          width: '100%',
          backgroundColor: '#4CAF50', // Green background
          '&:hover': {
            backgroundColor: '#388E3C', // Darker green on hover
          },
          transition: 'background-color 0.3s ease', // Smooth hover transition
        }}
      >
        Save Changes
      </Button>
    </Box>
  );
};

export default ProfilePage;
