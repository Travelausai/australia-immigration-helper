import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Paper, 
  Box, 
  Grid, 
  TextField, 
  Button, 
  Tabs, 
  Tab, 
  Link,
  Divider,
  Alert,
  Snackbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Define user interface
interface User {
  name: string;
  email: string;
  password: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Auth: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Registration form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerErrors, setRegisterErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // Notification state
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning'
  });

  // Check if user is already logged in
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      // User is already logged in, redirect to home
      navigate('/');
    }
  }, [navigate]);
  
  // Validate registration form
  const validateRegistration = (): boolean => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    
    // Validate name
    if (!registerName.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    // Validate email
    if (!registerEmail) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(registerEmail)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    // Validate password
    if (!registerPassword) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (registerPassword.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    // Validate confirm password
    if (registerPassword !== registerConfirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    setRegisterErrors(newErrors);
    return isValid;
  };

  // Form submission handlers with localStorage integration
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get users from localStorage
    const usersJson = localStorage.getItem('users');
    const users: User[] = usersJson ? JSON.parse(usersJson) : [];
    
    // Find user with matching email and password
    const user = users.find(u => u.email === loginEmail && u.password === loginPassword);
    
    if (user) {
      // Store current user in localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Dispatch custom event to notify components about authentication change
      window.dispatchEvent(new Event('auth-change'));
      
      // Show success notification
      setNotification({
        open: true,
        message: 'Login successful!',
        severity: 'success'
      });
      
      // Redirect to home page after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      // Show error
      setLoginError('Invalid email or password');
    }
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateRegistration()) {
      return;
    }
    
    // Get existing users from localStorage
    const usersJson = localStorage.getItem('users');
    const users: User[] = usersJson ? JSON.parse(usersJson) : [];
    
    // Check if email already exists
    if (users.some(user => user.email === registerEmail)) {
      setRegisterErrors({
        ...registerErrors,
        email: 'Email already in use'
      });
      return;
    }
    
    // Create new user
    const newUser: User = {
      name: registerName,
      email: registerEmail,
      password: registerPassword
    };
    
    // Add user to users array
    users.push(newUser);
    
    // Save users to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Set current user
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    // Dispatch custom event to notify components about authentication change
    window.dispatchEvent(new Event('auth-change'));
    
    // Show success notification
    setNotification({
      open: true,
      message: 'Registration successful!',
      severity: 'success'
    });
    
    // Redirect to home page after a short delay
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    // Clear errors when switching tabs
    setLoginError('');
    setRegisterErrors({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };
  
  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} sx={{ mt: 4, p: 0 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant="fullWidth"
            aria-label="authentication tabs"
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          
          {/* Login Panel */}
          <TabPanel value={tabValue} index={0}>
            <Typography variant="h5" align="center" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" paragraph>
              Sign in to access your immigration journey
            </Typography>
            
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
              {loginError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {loginError}
                </Alert>
              )}
              
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Box sx={{ textAlign: 'center' }}>
                <Link href="#" variant="body2" onClick={() => alert('Password reset functionality would be implemented here')}>
                  Forgot password?
                </Link>
              </Box>
            </Box>
            
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Alert severity="info" sx={{ mt: 2 }}>
                This is a demo app with localStorage authentication. Your data is stored only in your browser.
              </Alert>
            </Box>
          </TabPanel>
          
          {/* Register Panel */}
          <TabPanel value={tabValue} index={1}>
            <Typography variant="h5" align="center" gutterBottom>
              Create an Account
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" paragraph>
              Join us to start your immigration journey to Australia
            </Typography>
            
            <Box component="form" onSubmit={handleRegister} sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                error={!!registerErrors.name}
                helperText={registerErrors.name}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="register-email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                error={!!registerErrors.email}
                helperText={registerErrors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="register-password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                error={!!registerErrors.password}
                helperText={registerErrors.password}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirm-password"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                error={!!registerErrors.confirmPassword}
                helperText={registerErrors.confirmPassword}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
            </Box>
            
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Alert severity="info" sx={{ mt: 2 }}>
                This is a demo app with localStorage authentication. Your data is stored only in your browser.
              </Alert>
            </Box>
          </TabPanel>
        </Paper>
      </Grid>
      
      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Auth; 