import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Menu, 
  MenuItem, 
  Avatar, 
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

interface User {
  name: string;
  email: string;
}

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    // Check for user in localStorage
    const checkUserAuth = () => {
      const userJson = localStorage.getItem('currentUser');
      if (userJson) {
        try {
          const user = JSON.parse(userJson);
          setCurrentUser(user);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('currentUser');
        }
      } else {
        setCurrentUser(null);
      }
    };

    // Initial check
    checkUserAuth();

    // Add event listeners
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth-change', checkUserAuth);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-change', checkUserAuth);
    };
  }, []);

  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === 'currentUser') {
      if (e.newValue) {
        try {
          const user = JSON.parse(e.newValue);
          setCurrentUser(user);
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      } else {
        setCurrentUser(null);
      }
    }
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    handleClose();
    navigate('/');
  };

  const handleProfile = () => {
    handleClose();
    alert('Profile page will be implemented in a future update');
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Visa Types', path: '/visa-types' },
    { label: 'Eligibility', path: '/eligibility' },
    { label: 'Points Calculator', path: '/points-calculator' },
    { label: 'Resources', path: '/resources' },
    { label: 'AI Assistant', path: '/chatbot' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  // Mobile drawer content
  const mobileDrawer = (
    <Box onClick={handleMobileMenuToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        UK to Australia Immigration Helper
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem 
            button 
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            sx={{
              backgroundColor: location.pathname === item.path ? 'rgba(0, 132, 61, 0.1)' : 'transparent',
              borderLeft: location.pathname === item.path ? '4px solid #00843D' : 'none',
            }}
          >
            <ListItemText 
              primary={item.label} 
              primaryTypographyProps={{
                fontWeight: location.pathname === item.path ? 'bold' : 'normal',
              }}
            />
          </ListItem>
        ))}
        {currentUser && (
          <ListItem 
            button 
            onClick={() => handleNavigation('/action-plan')}
            sx={{
              backgroundColor: location.pathname === '/action-plan' ? 'rgba(0, 132, 61, 0.1)' : 'transparent',
              borderLeft: location.pathname === '/action-plan' ? '4px solid #00843D' : 'none',
            }}
          >
            <ListItemText 
              primary="Action Plan" 
              primaryTypographyProps={{
                fontWeight: location.pathname === '/action-plan' ? 'bold' : 'normal',
              }}
            />
          </ListItem>
        )}
        {!currentUser && (
          <ListItem 
            button 
            onClick={() => handleNavigation('/auth')}
            sx={{
              backgroundColor: location.pathname === '/auth' ? 'rgba(0, 132, 61, 0.1)' : 'transparent',
              borderLeft: location.pathname === '/auth' ? '4px solid #00843D' : 'none',
            }}
          >
            <ListItemText primary="Login" />
          </ListItem>
        )}
        {currentUser && (
          <>
            <Divider />
            <ListItem 
              button 
              onClick={handleProfile}
            >
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem 
              button 
              onClick={handleLogout}
            >
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            cursor: 'pointer',
            display: { xs: 'none', sm: 'block' }
          }} 
          onClick={() => navigate('/')}
        >
          UK to Australia Immigration Helper
        </Typography>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            cursor: 'pointer',
            display: { xs: 'block', sm: 'none' }
          }} 
          onClick={() => navigate('/')}
        >
          UK-AU Immigration
        </Typography>

        {/* Desktop menu */}
        {!isMobile && (
          <Box sx={{ display: 'flex' }}>
            {navItems.map((item) => (
              <Button 
                key={item.path}
                color="inherit" 
                onClick={() => navigate(item.path)}
                sx={{
                  borderBottom: location.pathname === item.path ? '2px solid white' : 'none',
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                }}
              >
                {item.label}
              </Button>
            ))}
            {currentUser && (
              <>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/action-plan')}
                  sx={{
                    borderBottom: location.pathname === '/action-plan' ? '2px solid white' : 'none',
                    fontWeight: location.pathname === '/action-plan' ? 'bold' : 'normal',
                  }}
                >
                  Action Plan
                </Button>
              </>
            )}
            
            {currentUser ? (
              <>
                <IconButton 
                  onClick={handleProfileClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                    {currentUser.name.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  id="account-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'account-button',
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem disabled>
                    <Typography variant="body2" color="text.secondary">
                      Signed in as<br />
                      <strong>{currentUser.email}</strong>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button 
                color="inherit" 
                onClick={() => navigate('/auth')}
                sx={{
                  borderBottom: location.pathname === '/auth' ? '2px solid white' : 'none',
                  fontWeight: location.pathname === '/auth' ? 'bold' : 'normal',
                }}
              >
                Login
              </Button>
            )}
          </Box>
        )}

        {/* Mobile menu icon */}
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleMobileMenuToggle}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
      >
        {mobileDrawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar; 