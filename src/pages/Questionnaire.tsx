import React, { useState } from 'react';
import { 
  Container, Typography, Box, Paper, Stepper, Step, 
  StepLabel, Button, TextField, MenuItem, FormControl,
  FormLabel, RadioGroup, FormControlLabel, Radio, Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface QuestionnaireData {
  name: string;
  email: string;
  age: string;
  occupation: string;
  englishLevel: string;
  qualification: string;
  experience: string;
  familyStatus: string;
  reasonForMigration: string;
  preferredLocation: string;
}

const steps = ['Personal Information', 'Professional Details', 'Migration Preferences'];

const Questionnaire: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<QuestionnaireData>({
    name: '',
    email: '',
    age: '',
    occupation: '',
    englishLevel: '',
    qualification: '',
    experience: '',
    familyStatus: '',
    reasonForMigration: '',
    preferredLocation: ''
  });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Submit the form
      handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Save form data to localStorage
    localStorage.setItem('questionnaireData', JSON.stringify(formData));
    
    // Navigate to eligibility page
    navigate('/eligibility');
  };

  const isStepValid = () => {
    if (activeStep === 0) {
      return formData.name && formData.email && formData.age;
    } else if (activeStep === 1) {
      return formData.occupation && formData.englishLevel && formData.qualification && formData.experience;
    } else {
      return formData.familyStatus && formData.reasonForMigration && formData.preferredLocation;
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              select
              fullWidth
              label="Age Group"
              name="age"
              value={formData.age}
              onChange={handleChange}
              margin="normal"
              required
            >
              <MenuItem value="18-24">18-24 years</MenuItem>
              <MenuItem value="25-32">25-32 years</MenuItem>
              <MenuItem value="33-39">33-39 years</MenuItem>
              <MenuItem value="40-44">40-44 years</MenuItem>
              <MenuItem value="45-49">45-49 years</MenuItem>
              <MenuItem value="50+">50+ years</MenuItem>
            </TextField>
          </Box>
        );
      case 1:
        return (
          <Box>
            <TextField
              fullWidth
              label="Current Occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              select
              fullWidth
              label="English Language Proficiency"
              name="englishLevel"
              value={formData.englishLevel}
              onChange={handleChange}
              margin="normal"
              required
            >
              <MenuItem value="native">Native Speaker</MenuItem>
              <MenuItem value="superior">Superior (IELTS 8+)</MenuItem>
              <MenuItem value="proficient">Proficient (IELTS 7-7.5)</MenuItem>
              <MenuItem value="competent">Competent (IELTS 6-6.5)</MenuItem>
              <MenuItem value="basic">Basic (Below IELTS 6)</MenuItem>
            </TextField>
            <TextField
              select
              fullWidth
              label="Highest Qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              margin="normal"
              required
            >
              <MenuItem value="highSchool">High School</MenuItem>
              <MenuItem value="diploma">Diploma/Certificate</MenuItem>
              <MenuItem value="bachelors">Bachelor's Degree</MenuItem>
              <MenuItem value="masters">Master's Degree</MenuItem>
              <MenuItem value="doctorate">Doctorate</MenuItem>
            </TextField>
            <TextField
              select
              fullWidth
              label="Years of Work Experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              margin="normal"
              required
            >
              <MenuItem value="0-1">Less than 1 year</MenuItem>
              <MenuItem value="1-3">1-3 years</MenuItem>
              <MenuItem value="3-5">3-5 years</MenuItem>
              <MenuItem value="5-8">5-8 years</MenuItem>
              <MenuItem value="8+">8+ years</MenuItem>
            </TextField>
          </Box>
        );
      case 2:
        return (
          <Box>
            <FormControl component="fieldset" margin="normal" required>
              <FormLabel component="legend">Family Status</FormLabel>
              <RadioGroup
                name="familyStatus"
                value={formData.familyStatus}
                onChange={handleChange}
              >
                <FormControlLabel value="single" control={<Radio />} label="Single" />
                <FormControlLabel value="partner" control={<Radio />} label="With Partner" />
                <FormControlLabel value="family" control={<Radio />} label="With Family/Children" />
              </RadioGroup>
            </FormControl>
            
            <TextField
              select
              fullWidth
              label="Primary Reason for Migration"
              name="reasonForMigration"
              value={formData.reasonForMigration}
              onChange={handleChange}
              margin="normal"
              required
            >
              <MenuItem value="career">Career Opportunities</MenuItem>
              <MenuItem value="lifestyle">Lifestyle</MenuItem>
              <MenuItem value="education">Education</MenuItem>
              <MenuItem value="family">Family Reunion</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
            
            <TextField
              select
              fullWidth
              label="Preferred Location in Australia"
              name="preferredLocation"
              value={formData.preferredLocation}
              onChange={handleChange}
              margin="normal"
              required
            >
              <MenuItem value="sydney">Sydney</MenuItem>
              <MenuItem value="melbourne">Melbourne</MenuItem>
              <MenuItem value="brisbane">Brisbane</MenuItem>
              <MenuItem value="perth">Perth</MenuItem>
              <MenuItem value="adelaide">Adelaide</MenuItem>
              <MenuItem value="canberra">Canberra</MenuItem>
              <MenuItem value="regional">Regional Area</MenuItem>
              <MenuItem value="undecided">Undecided</MenuItem>
            </TextField>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Immigration Questionnaire
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
          Help us understand your situation to provide personalized guidance
        </Typography>
        
        <Paper elevation={3} sx={{ p: 3 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {renderStepContent(activeStep)}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
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
              disabled={!isStepValid()}
            >
              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </Box>
        </Paper>
        
        <Grid container justifyContent="center" sx={{ mt: 4 }}>
          <Grid item>
            <Button 
              variant="text" 
              color="primary"
              onClick={() => navigate('/eligibility')}
            >
              Skip to Eligibility Check
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Questionnaire; 