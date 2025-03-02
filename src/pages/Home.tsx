import React, { useEffect, useState } from 'react';
import { 
  Container, Typography, Box, Grid, Card, CardContent, 
  CardMedia, CardActionArea, Button, Paper, Divider,
  Chip, Stack, useTheme, useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Icons
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import CalculateIcon from '@mui/icons-material/Calculate';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import SmartToyIcon from '@mui/icons-material/SmartToy';

interface User {
  name: string;
  email: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Check for user in localStorage
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        setCurrentUser(user);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        {/* Hero Section - Enhanced */}
        <Paper 
          elevation={3}
          sx={{ 
            p: { xs: 3, md: 5 }, 
            mb: 4, 
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            borderRadius: 2,
            textAlign: 'center'
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            UK to Australia Immigration Helper
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Your comprehensive guide to moving from the UK to Australia
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 3 }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={() => navigate('/questionnaire')}
              startIcon={<FlightTakeoffIcon />}
              sx={{ fontWeight: 'bold', px: 3, py: 1 }}
            >
              Start Your Journey
            </Button>
            <Button 
              variant="outlined" 
              color="secondary" 
              size="large"
              sx={{ color: 'white', borderColor: 'white', px: 3, py: 1 }}
              onClick={() => navigate('/visa-types')}
            >
              Explore Visa Options
            </Button>
          </Box>
          
          {/* Feature tags */}
          <Stack 
            direction={isMobile ? "column" : "row"} 
            spacing={1} 
            justifyContent="center"
            sx={{ mt: 3 }}
          >
            <Chip 
              label="Visa Eligibility Check" 
              color="primary" 
              variant="outlined" 
              sx={{ color: 'white', cursor: 'pointer' }} 
              onClick={() => navigate('/eligibility')}
            />
            <Chip 
              label="Points Calculator" 
              color="primary" 
              variant="outlined" 
              sx={{ color: 'white', cursor: 'pointer' }} 
              onClick={() => navigate('/points-calculator')}
            />
            <Chip 
              label="Resources" 
              color="primary" 
              variant="outlined" 
              sx={{ color: 'white', cursor: 'pointer' }} 
              onClick={() => navigate('/resources')}
            />
            <Chip 
              label="AI Assistant" 
              color="primary" 
              variant="outlined" 
              sx={{ color: 'white', cursor: 'pointer' }} 
              onClick={() => navigate('/chatbot')}
            />
          </Stack>
        </Paper>

        {/* Welcome Back Section (if logged in) */}
        {currentUser && (
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Welcome back, {currentUser.name}!
            </Typography>
            <Typography variant="body1" paragraph>
              Continue your Australian immigration journey with these next steps:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/action-plan')}
              >
                View Your Action Plan
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/points-calculator')}
              >
                Calculate Your Points
              </Button>
            </Box>
          </Paper>
        )}

        {/* Main Features Section */}
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mt: 6, mb: 4 }}>
          How We Can Help
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
              <CardActionArea onClick={() => navigate('/eligibility')}>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                  alt="Eligibility Check"
                />
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CheckCircleIcon color="primary" sx={{ mr: 1 }} />
                    <Typography gutterBottom variant="h6" component="div">
                      Eligibility Check
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Find out if you're eligible for Australian immigration and which visa options suit your profile.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
              <CardActionArea onClick={() => navigate('/points-calculator')}>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                  alt="Points Calculator"
                />
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CalculateIcon color="primary" sx={{ mr: 1 }} />
                    <Typography gutterBottom variant="h6" component="div">
                      Points Calculator
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Calculate your points for skilled migration visas and see how you can improve your score.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
              <CardActionArea onClick={() => navigate('/action-plan')}>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                  alt="Personalised Action Plan"
                />
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <FlightTakeoffIcon color="primary" sx={{ mr: 1 }} />
                    <Typography gutterBottom variant="h6" component="div">
                      Action Plan
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Get a personalised step-by-step plan for your immigration journey from the UK to Australia.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
              <CardActionArea onClick={() => navigate('/resources')}>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                  alt="AI Assistant"
                />
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <SmartToyIcon color="primary" sx={{ mr: 1 }} />
                    <Typography gutterBottom variant="h6" component="div">
                      AI Assistant
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Chat with our AI assistant to get instant answers to your immigration questions.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>

        {/* About Section */}
        <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            About This Project
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body1" paragraph>
            The UK to Australia Immigration Helper is designed to simplify the complex process of migrating from the United Kingdom to Australia. Our goal is to provide accurate, up-to-date information and personalised guidance to help you navigate the Australian immigration system.
          </Typography>
          <Typography variant="body1" paragraph>
            This tool is particularly useful for skilled workers, families, and individuals looking to start a new life in Australia. We cover various visa pathways, eligibility requirements, points calculations, and provide step-by-step action plans to make your immigration journey smoother.
          </Typography>
          <Typography variant="body1">
            <strong>Note:</strong> While we strive to provide accurate information, immigration policies can change. Always verify important details with official sources like the Australian Department of Home Affairs.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home; 