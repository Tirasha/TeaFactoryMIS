import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, TextField, Grid, Typography, Link, Box, InputAdornment, IconButton, Paper, CircularProgress, Snackbar, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import background from '../Images/b6.jpg';
import logo from '../Images/logo.png';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50',
    },
    secondary: {
      main: '#81C784',
    },
  },
  typography: {
    fontFamily: `'Roboto', sans-serif`,
  },
});

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/user/login', { username, password });
      setLoading(false);

      if (response.status === 200) {
        const userResponse = response.data;
        onLogin(userResponse);
        const role = userResponse.employee.role;

        switch (role) {
          case 'Admin':
            navigate('/AdminDashboard');
            break;
          case 'HRAssist':

            navigate('/HRDashboard');
            break;

          case 'TechnicalAssist':
            navigate('/TechnicalDashboard');
            break;
          case 'InventoryAssist':
            navigate('/InventoryDashboard');
            break;
          case 'SalesAssist':
            navigate('/SalesDashboard');
            break;
        }
      }
    } catch (error) {
      setLoading(false);
      setLoginError('Invalid username or password');
      setSnackbarOpen(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{
          height: '100vh',
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          paddingRight:'150px',
          justifyContent: 'right',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: '100%',
            maxWidth: 400,
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(12px)',
            borderRadius: 3,
            animation: 'fadeIn 1s ease-in-out',
            '@keyframes fadeIn': {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
          }}
        >
          <img src={logo} alt="Company Logo" style={{ width: '150px', marginBottom: '16px' }} />
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A1A1D' },
                  '&.Mui-focused fieldset': { borderColor:'#1A1A1D' },
                },
                '& .MuiInputLabel-root': {
                  color: '#1A1A1D',
                  '&.Mui-focused': { color: '#1A1A1D' },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#1A1A1D' },
                  '&.Mui-focused fieldset': { borderColor: '#1A1A1D' },
                },
                '& .MuiInputLabel-root': {
                  color: '#1A1A1D',
                  '&.Mui-focused': { color: '#1A1A1D'},
                },
              }}
            />
            {loginError && (
              <Typography color="error" variant="body2" align="center" sx={{ mt: 1 }}>
                {loginError}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                height: 45,
                fontSize: '1rem',
                background: loading ? theme.palette.grey[400] : theme.palette.primary.main,
                '&:hover': {
                  background: theme.palette.primary.dark,
                },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Sign In'}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" sx={{ textDecoration: 'underline' }}>
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ width: '100%' }}>
          {loginError}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Login;
