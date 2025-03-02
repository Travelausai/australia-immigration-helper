import React, { useState } from 'react';
import { 
  Typography, 
  Paper, 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio,
  TextField,
  MenuItem,
  Select,
  SelectChangeEvent,
  InputLabel,
  Divider,
  Card,
  CardContent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Define the steps for our questionnaire
const steps = ['Personal Information', 'Professional Background', 'Family Details'];

// English proficiency levels with IELTS score equivalents
const englishLevels = [
  { value: 'native', label: 'Native/Bilingual (IELTS 9)' },
  { value: 'proficient', label: 'Proficient (IELTS 7.5-8.5)' },
  { value: 'competent', label: 'Competent (IELTS 6.0-7.0)' },
  { value: 'moderate', label: 'Moderate (IELTS 5.0-5.5)' },
  { value: 'basic', label: 'Basic (IELTS below 5)' }
];

// List of occupations that are in demand in Australia
const inDemandOccupations = [
  'Software Engineer',
  'Registered Nurse',
  'Civil Engineer',
  'Electrician',
  'Mechanical Engineer',
  'Teacher',
  'Accountant',
  'Chef',
  'Construction Manager',
  'Medical Doctor',
  'Other'
];

const EligibilityQuestionnaire: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Information
    age: '',
    englishLevel: '',
    
    // Professional Background
    occupation: '',
    yearsOfExperience: '',
    qualification: '',
    
    // Family Details
    maritalStatus: '',
    partnerAge: '',
    partnerEnglishLevel: '',
    partnerOccupation: '',
    numberOfChildren: '',
    childrenAges: ''
  });
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const name = event.target.name as string;
    const value = event.target.value as string;
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Navigation functions
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      age: '',
      englishLevel: '',
      occupation: '',
      yearsOfExperience: '',
      qualification: '',
      maritalStatus: '',
      partnerAge: '',
      partnerEnglishLevel: '',
      partnerOccupation: '',
      numberOfChildren: '',
      childrenAges: ''
    });
  };

  // Check if current step is complete
  const isStepComplete = () => {
    switch (activeStep) {
      case 0: // Personal Information
        return formData.age !== '' && formData.englishLevel !== '';
      case 1: // Professional Background
        return formData.occupation !== '' && formData.yearsOfExperience !== '' && formData.qualification !== '';
      case 2: // Family Details
        return formData.maritalStatus !== '';
      default:
        return true;
    }
  };

  // Calculate a simple eligibility score based on the answers
  const calculateEligibilityScore = () => {
    let score = 0;
    
    // Age points (maximum 30)
    const age = parseInt(formData.age);
    if (age >= 25 && age <= 32) score += 30;
    else if (age >= 18 && age <= 24) score += 25;
    else if (age >= 33 && age <= 39) score += 25;
    else if (age >= 40 && age <= 44) score += 15;
    else score += 0;
    
    // English proficiency (maximum 20)
    if (formData.englishLevel === 'native') score += 20;
    else if (formData.englishLevel === 'proficient') score += 20;
    else if (formData.englishLevel === 'competent') score += 10;
    else if (formData.englishLevel === 'moderate') score += 0;
    
    // Work experience (maximum 20)
    const experience = parseInt(formData.yearsOfExperience);
    if (experience >= 8) score += 20;
    else if (experience >= 5) score += 15;
    else if (experience >= 3) score += 10;
    else if (experience >= 1) score += 5;
    
    // Qualification (maximum 20)
    if (formData.qualification === 'doctorate') score += 20;
    else if (formData.qualification === 'masters') score += 15;
    else if (formData.qualification === 'bachelors') score += 15;
    else if (formData.qualification === 'diploma') score += 10;
    else if (formData.qualification === 'trade') score += 10;
    
    // Partner skills (maximum 10)
    if (formData.maritalStatus === 'married' && formData.partnerEnglishLevel !== 'basic') {
      score += 10;
    }
    
    return score;
  };

  // Get visa recommendations based on score
  const getVisaRecommendations = () => {
    const score = calculateEligibilityScore();
    
    if (score >= 65) {
      return (
        <>
          <Typography variant="h6" color="primary" gutterBottom>
            Based on your answers, you may be eligible for:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li" variant="body1" paragraph>
              Skilled Independent visa (subclass 189)
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              Skilled Nominated visa (subclass 190)
            </Typography>
          </Box>
        </>
      );
    } else if (score >= 50) {
      return (
        <>
          <Typography variant="h6" color="primary" gutterBottom>
            Based on your answers, you may be eligible for:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li" variant="body1" paragraph>
              Skilled Work Regional (Provisional) visa (subclass 491)
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              Employer Nomination Scheme (subclass 186)
            </Typography>
          </Box>
        </>
      );
    } else {
      return (
        <>
          <Typography variant="h6" color="primary" gutterBottom>
            Based on your answers, you might want to explore:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li" variant="body1" paragraph>
              Temporary Skill Shortage visa (subclass 482)
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              Working Holiday visa (if eligible by age)
            </Typography>
            <Typography component="li" variant="body1" paragraph>
              Student visa options to gain Australian qualifications
            </Typography>
          </Box>
        </>
      );
    }
  };

  // Content for each step
  const getStepContent = (step: number) => {
    switch (step) {
      case 0: // Personal Information
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Your age and English language proficiency are key factors in Australian immigration eligibility.
            </Typography>
            
            <FormControl fullWidth margin="normal">
              <TextField
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                InputProps={{ inputProps: { min: 18, max: 99 } }}
                required
                helperText="Applicants between 25-32 years receive maximum points"
              />
            </FormControl>
            
            <FormControl fullWidth margin="normal">
              <InputLabel id="english-level-label">English Language Proficiency</InputLabel>
              <Select
                labelId="english-level-label"
                name="englishLevel"
                value={formData.englishLevel}
                onChange={handleChange}
                label="English Language Proficiency"
                required
              >
                {englishLevels.map((level) => (
                  <MenuItem key={level.value} value={level.value}>
                    {level.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );
        
      case 1: // Professional Background
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Professional Background
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Your occupation, work experience, and qualifications significantly impact your visa options.
            </Typography>
            
            <FormControl fullWidth margin="normal">
              <InputLabel id="occupation-label">Occupation</InputLabel>
              <Select
                labelId="occupation-label"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                label="Occupation"
                required
              >
                {inDemandOccupations.map((job) => (
                  <MenuItem key={job} value={job}>
                    {job}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth margin="normal">
              <TextField
                label="Years of Work Experience"
                name="yearsOfExperience"
                type="number"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                InputProps={{ inputProps: { min: 0, max: 50 } }}
                required
                helperText="In your nominated occupation"
              />
            </FormControl>
            
            <FormControl fullWidth margin="normal">
              <InputLabel id="qualification-label">Highest Qualification</InputLabel>
              <Select
                labelId="qualification-label"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                label="Highest Qualification"
                required
              >
                <MenuItem value="doctorate">Doctorate (PhD)</MenuItem>
                <MenuItem value="masters">Masters Degree</MenuItem>
                <MenuItem value="bachelors">Bachelors Degree</MenuItem>
                <MenuItem value="diploma">Diploma</MenuItem>
                <MenuItem value="trade">Trade Qualification</MenuItem>
                <MenuItem value="highschool">High School</MenuItem>
                <MenuItem value="none">No Formal Qualification</MenuItem>
              </Select>
            </FormControl>
          </Box>
        );
        
      case 2: // Family Details
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Family Details
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Your family situation can affect your visa application and may provide additional points.
            </Typography>
            
            <FormControl fullWidth margin="normal">
              <InputLabel id="marital-status-label">Marital Status</InputLabel>
              <Select
                labelId="marital-status-label"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                label="Marital Status"
                required
              >
                <MenuItem value="single">Single</MenuItem>
                <MenuItem value="married">Married/De Facto</MenuItem>
                <MenuItem value="separated">Separated/Divorced</MenuItem>
                <MenuItem value="widowed">Widowed</MenuItem>
              </Select>
            </FormControl>
            
            {formData.maritalStatus === 'married' && (
              <>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Partner's Age"
                    name="partnerAge"
                    type="number"
                    value={formData.partnerAge}
                    onChange={handleChange}
                    InputProps={{ inputProps: { min: 18, max: 99 } }}
                  />
                </FormControl>
                
                <FormControl fullWidth margin="normal">
                  <InputLabel id="partner-english-level-label">Partner's English Proficiency</InputLabel>
                  <Select
                    labelId="partner-english-level-label"
                    name="partnerEnglishLevel"
                    value={formData.partnerEnglishLevel}
                    onChange={handleChange}
                    label="Partner's English Proficiency"
                  >
                    {englishLevels.map((level) => (
                      <MenuItem key={level.value} value={level.value}>
                        {level.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <FormControl fullWidth margin="normal">
                  <InputLabel id="partner-occupation-label">Partner's Occupation</InputLabel>
                  <Select
                    labelId="partner-occupation-label"
                    name="partnerOccupation"
                    value={formData.partnerOccupation}
                    onChange={handleChange}
                    label="Partner's Occupation"
                  >
                    {inDemandOccupations.map((job) => (
                      <MenuItem key={job} value={job}>
                        {job}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
            
            <FormControl fullWidth margin="normal">
              <InputLabel id="children-label">Number of Dependent Children</InputLabel>
              <Select
                labelId="children-label"
                name="numberOfChildren"
                value={formData.numberOfChildren}
                onChange={handleChange}
                label="Number of Dependent Children"
              >
                <MenuItem value="0">None</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4+">4 or more</MenuItem>
              </Select>
            </FormControl>
            
            {formData.numberOfChildren && formData.numberOfChildren !== '0' && (
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Children's Ages"
                  name="childrenAges"
                  value={formData.childrenAges}
                  onChange={handleChange}
                  helperText="Enter ages separated by commas (e.g., 5, 7, 12)"
                />
              </FormControl>
            )}
          </Box>
        );
        
      default:
        return 'Unknown step';
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Immigration Eligibility Assessment
      </Typography>
      <Typography variant="body1" paragraph align="center">
        Complete this questionnaire to assess your eligibility for Australian immigration
      </Typography>
      
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {activeStep === steps.length ? (
        // Results page
        <Box>
          <Typography variant="h5" gutterBottom>
            Your Assessment Results
          </Typography>
          
          <Card variant="outlined" sx={{ mb: 3, bgcolor: '#f5f5f5' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Eligibility Score: {calculateEligibilityScore()}/100
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A score of 65+ typically indicates eligibility for skilled migration visas
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              {getVisaRecommendations()}
            </CardContent>
          </Card>
          
          <Typography variant="body1" paragraph>
            This is a preliminary assessment based on the information you provided. For a comprehensive evaluation, consult with a registered migration agent.
          </Typography>
          
          <Typography variant="body2" color="text.secondary" paragraph>
            Note: Immigration policies and requirements change frequently. Always check the latest information on the Australian Department of Home Affairs website.
          </Typography>
          
          <Box sx={{ mt: 3, mb: 4, textAlign: 'center' }}>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={() => navigate('/points-calculator')}
              sx={{ py: 1.5, px: 4 }}
            >
              Try Our Detailed Points Calculator
            </Button>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Get a more comprehensive points assessment based on the official skilled migration points test
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button onClick={handleReset} variant="outlined">
              Start Over
            </Button>
            <Button variant="contained" color="primary">
              Save Results
            </Button>
          </Box>
        </Box>
      ) : (
        // Questionnaire steps
        <Box>
          {getStepContent(activeStep)}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={!isStepComplete()}
            >
              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default EligibilityQuestionnaire; 