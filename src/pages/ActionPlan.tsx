import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Container, 
  Paper, 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  StepContent,
  Button,
  Checkbox,
  FormControlLabel,
  Alert,
  Divider,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Chip
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useNavigate } from 'react-router-dom';

interface User {
  name: string;
  email: string;
}

interface ActionItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: 'documentation' | 'application' | 'preparation' | 'settlement';
  timeframe: 'immediate' | 'short-term' | 'medium-term' | 'long-term';
}

const ActionPlan: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [progress, setProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) {
      // Redirect to login if not logged in
      navigate('/auth');
      return;
    }

    try {
      const user = JSON.parse(userJson);
      setCurrentUser(user);
      
      // Load saved action items if they exist
      const savedItemsJson = localStorage.getItem(`actionItems_${user.email}`);
      if (savedItemsJson) {
        const savedItems = JSON.parse(savedItemsJson);
        setActionItems(savedItems);
        calculateProgress(savedItems);
      } else {
        // Generate default action items for new users
        const defaultItems = generateDefaultActionItems();
        setActionItems(defaultItems);
        saveActionItems(defaultItems, user.email);
        calculateProgress(defaultItems);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      navigate('/auth');
    }
  }, [navigate]);

  const calculateProgress = (items: ActionItem[]) => {
    if (items.length === 0) return 0;
    const completedCount = items.filter(item => item.completed).length;
    const progressPercentage = Math.round((completedCount / items.length) * 100);
    setProgress(progressPercentage);
  };

  const saveActionItems = (items: ActionItem[], email: string) => {
    localStorage.setItem(`actionItems_${email}`, JSON.stringify(items));
  };

  const handleToggleComplete = (id: string) => {
    const updatedItems = actionItems.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setActionItems(updatedItems);
    calculateProgress(updatedItems);
    
    if (currentUser) {
      saveActionItems(updatedItems, currentUser.email);
    }
  };

  const generateDefaultActionItems = (): ActionItem[] => {
    return [
      {
        id: '1',
        title: 'Research visa options',
        description: 'Explore different visa subclasses (189, 190, 491) and determine which one suits your situation best.',
        completed: false,
        category: 'preparation',
        timeframe: 'immediate'
      },
      {
        id: '2',
        title: 'Take English language test',
        description: 'Book and complete an approved English language test (IELTS, PTE, TOEFL, etc.) to demonstrate your proficiency.',
        completed: false,
        category: 'preparation',
        timeframe: 'immediate'
      },
      {
        id: '3',
        title: 'Skills assessment',
        description: 'Apply for a skills assessment with the relevant assessing authority for your occupation.',
        completed: false,
        category: 'preparation',
        timeframe: 'short-term'
      },
      {
        id: '4',
        title: 'Create EOI in SkillSelect',
        description: 'Submit an Expression of Interest (EOI) through the SkillSelect system.',
        completed: false,
        category: 'application',
        timeframe: 'medium-term'
      },
      {
        id: '5',
        title: 'Gather documentation',
        description: 'Collect all required documents including passport, birth certificate, marriage certificate, qualification certificates, etc.',
        completed: false,
        category: 'documentation',
        timeframe: 'short-term'
      },
      {
        id: '6',
        title: 'Police clearance certificates',
        description: 'Obtain police clearance certificates from all countries where you have lived for 12 months or more in the past 10 years.',
        completed: false,
        category: 'documentation',
        timeframe: 'medium-term'
      },
      {
        id: '7',
        title: 'Medical examination',
        description: 'Complete a medical examination with an approved panel physician.',
        completed: false,
        category: 'documentation',
        timeframe: 'medium-term'
      },
      {
        id: '8',
        title: 'Visa application',
        description: 'Submit your visa application after receiving an invitation to apply.',
        completed: false,
        category: 'application',
        timeframe: 'medium-term'
      },
      {
        id: '9',
        title: 'Research housing options',
        description: 'Research housing options in your intended destination in Australia.',
        completed: false,
        category: 'settlement',
        timeframe: 'long-term'
      },
      {
        id: '10',
        title: 'Job search preparation',
        description: 'Update your resume/CV to Australian format and start researching job opportunities.',
        completed: false,
        category: 'settlement',
        timeframe: 'long-term'
      },
      {
        id: '11',
        title: 'Banking setup',
        description: 'Research Australian banks and prepare to open an account.',
        completed: false,
        category: 'settlement',
        timeframe: 'long-term'
      },
      {
        id: '12',
        title: 'Healthcare information',
        description: 'Research Medicare and private health insurance options in Australia.',
        completed: false,
        category: 'settlement',
        timeframe: 'long-term'
      }
    ];
  };

  const filterItemsByCategory = (category: string | null) => {
    if (!category) return actionItems;
    return actionItems.filter(item => item.category === category);
  };

  const getTimeframeLabel = (timeframe: string) => {
    switch (timeframe) {
      case 'immediate': return 'Do now';
      case 'short-term': return 'Within 1-3 months';
      case 'medium-term': return 'Within 3-6 months';
      case 'long-term': return 'After visa approval';
      default: return timeframe;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'documentation': return '#4caf50'; // green
      case 'application': return '#2196f3'; // blue
      case 'preparation': return '#ff9800'; // orange
      case 'settlement': return '#9c27b0'; // purple
      default: return '#757575'; // grey
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Your Immigration Action Plan
        </Typography>
        
        {currentUser && (
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Personalized for {currentUser.name}
          </Typography>
        )}
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            Overall Progress: {progress}%
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ height: 10, borderRadius: 5 }}
          />
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button 
            variant={activeCategory === null ? "contained" : "outlined"} 
            onClick={() => setActiveCategory(null)}
            sx={{ mb: 1 }}
          >
            All Tasks
          </Button>
          <Button 
            variant={activeCategory === 'preparation' ? "contained" : "outlined"} 
            onClick={() => setActiveCategory('preparation')}
            sx={{ mb: 1, bgcolor: activeCategory === 'preparation' ? getCategoryColor('preparation') : 'inherit' }}
          >
            Preparation
          </Button>
          <Button 
            variant={activeCategory === 'documentation' ? "contained" : "outlined"} 
            onClick={() => setActiveCategory('documentation')}
            sx={{ mb: 1, bgcolor: activeCategory === 'documentation' ? getCategoryColor('documentation') : 'inherit' }}
          >
            Documentation
          </Button>
          <Button 
            variant={activeCategory === 'application' ? "contained" : "outlined"} 
            onClick={() => setActiveCategory('application')}
            sx={{ mb: 1, bgcolor: activeCategory === 'application' ? getCategoryColor('application') : 'inherit' }}
          >
            Application
          </Button>
          <Button 
            variant={activeCategory === 'settlement' ? "contained" : "outlined"} 
            onClick={() => setActiveCategory('settlement')}
            sx={{ mb: 1, bgcolor: activeCategory === 'settlement' ? getCategoryColor('settlement') : 'inherit' }}
          >
            Settlement
          </Button>
        </Box>
        
        <Grid container spacing={3}>
          {filterItemsByCategory(activeCategory).map((item) => (
            <Grid item xs={12} md={6} key={item.id}>
              <Card 
                sx={{ 
                  mb: 2, 
                  borderLeft: `5px solid ${getCategoryColor(item.category)}`,
                  opacity: item.completed ? 0.8 : 1,
                  bgcolor: item.completed ? 'rgba(0, 0, 0, 0.03)' : 'inherit'
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <FormControlLabel
                        control={
                          <Checkbox 
                            checked={item.completed}
                            onChange={() => handleToggleComplete(item.id)}
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<CheckCircleOutlineIcon />}
                          />
                        }
                        label=""
                      />
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          textDecoration: item.completed ? 'line-through' : 'none',
                          color: item.completed ? 'text.secondary' : 'text.primary'
                        }}
                      >
                        {item.title}
                      </Typography>
                    </Box>
                    <Chip 
                      label={getTimeframeLabel(item.timeframe)} 
                      size="small" 
                      sx={{ ml: 1 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 7 }}>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {actionItems.length === 0 && (
          <Alert severity="info" sx={{ mt: 2 }}>
            No action items found. Please refresh the page or contact support.
          </Alert>
        )}
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/points-calculator')}
          >
            Back to Points Calculator
          </Button>
          <Button 
            variant="contained" 
            onClick={() => navigate('/resources')}
          >
            View Resources
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ActionPlan; 