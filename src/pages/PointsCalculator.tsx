import React, { useState } from 'react';
import { 
  Container, Typography, Box, Paper, Grid, 
  Accordion, AccordionSummary, AccordionDetails,
  TextField, MenuItem, Button, Divider, Alert
} from '@mui/material';
// @ts-ignore
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// @ts-ignore
import InfoIcon from '@mui/icons-material/Info';

interface PointsCategory {
  name: string;
  points: number;
  maxPoints: number;
}

const PointsCalculator: React.FC = () => {
  const [age, setAge] = useState<string>('');
  const [englishLevel, setEnglishLevel] = useState<string>('');
  const [englishTest, setEnglishTest] = useState<string>('');
  const [qualification, setQualification] = useState<string>('');
  const [experience, setExperience] = useState<string>('');
  const [australianExperience, setAustralianExperience] = useState<string>('');
  const [partnerSkills, setPartnerSkills] = useState<string>('');
  const [specialistEducation, setSpecialistEducation] = useState<string>('');
  const [professionalYear, setProfessionalYear] = useState<string>('');
  const [calculatedPoints, setCalculatedPoints] = useState<PointsCategory[]>([]);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);

  const calculatePoints = () => {
    const categories: PointsCategory[] = [];
    let total = 0;

    // Age points
    let agePoints = 0;
    if (age === '18-24') agePoints = 25;
    else if (age === '25-32') agePoints = 30;
    else if (age === '33-39') agePoints = 25;
    else if (age === '40-44') agePoints = 15;
    else if (age === '45-49') agePoints = 0;
    
    categories.push({ name: 'Age', points: agePoints, maxPoints: 30 });
    total += agePoints;

    // English language points
    let englishPoints = 0;
    if (englishLevel === 'competent') englishPoints = 0;
    else if (englishLevel === 'proficient') englishPoints = 10;
    else if (englishLevel === 'superior') englishPoints = 20;
    
    categories.push({ name: 'English Language', points: englishPoints, maxPoints: 20 });
    total += englishPoints;

    // Qualification points
    let qualificationPoints = 0;
    if (qualification === 'diploma') qualificationPoints = 10;
    else if (qualification === 'bachelors') qualificationPoints = 15;
    else if (qualification === 'masters') qualificationPoints = 15;
    else if (qualification === 'doctorate') qualificationPoints = 20;
    
    categories.push({ name: 'Educational Qualification', points: qualificationPoints, maxPoints: 20 });
    total += qualificationPoints;

    // Work experience points
    let experiencePoints = 0;
    if (experience === '1-3') experiencePoints = 5;
    else if (experience === '3-5') experiencePoints = 10;
    else if (experience === '5-8') experiencePoints = 15;
    else if (experience === '8+') experiencePoints = 20;
    
    categories.push({ name: 'Skilled Employment Outside Australia', points: experiencePoints, maxPoints: 20 });
    total += experiencePoints;

    // Australian work experience points
    let ausExperiencePoints = 0;
    if (australianExperience === '1') ausExperiencePoints = 5;
    else if (australianExperience === '3') ausExperiencePoints = 10;
    else if (australianExperience === '5') ausExperiencePoints = 15;
    else if (australianExperience === '8+') ausExperiencePoints = 20;
    
    categories.push({ name: 'Skilled Employment In Australia', points: ausExperiencePoints, maxPoints: 20 });
    total += ausExperiencePoints;

    // Partner skills points
    let partnerPoints = 0;
    if (partnerSkills === 'skilled') partnerPoints = 10;
    else if (partnerSkills === 'competent-english') partnerPoints = 5;
    else if (partnerSkills === 'no-partner') partnerPoints = 10;
    
    categories.push({ name: 'Partner Skills / Single Applicant', points: partnerPoints, maxPoints: 10 });
    total += partnerPoints;

    // Specialist education points
    let specialistPoints = 0;
    if (specialistEducation === 'yes') specialistPoints = 10;
    
    categories.push({ name: 'Specialist Education', points: specialistPoints, maxPoints: 10 });
    total += specialistPoints;

    // Professional year points
    let professionalYearPoints = 0;
    if (professionalYear === 'yes') professionalYearPoints = 5;
    
    categories.push({ name: 'Professional Year', points: professionalYearPoints, maxPoints: 5 });
    total += professionalYearPoints;

    setCalculatedPoints(categories);
    setTotalPoints(total);
    setShowResults(true);
  };

  const resetCalculator = () => {
    setAge('');
    setEnglishLevel('');
    setEnglishTest('');
    setQualification('');
    setExperience('');
    setAustralianExperience('');
    setPartnerSkills('');
    setSpecialistEducation('');
    setProfessionalYear('');
    setCalculatedPoints([]);
    setTotalPoints(0);
    setShowResults(false);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Australian Skilled Migration Points Calculator
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
          Calculate your points for Australian skilled migration visas
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Enter Your Details
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <TextField
                  select
                  fullWidth
                  label="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  helperText="Select your age range"
                  margin="normal"
                >
                  <MenuItem value="18-24">18-24 years (25 points)</MenuItem>
                  <MenuItem value="25-32">25-32 years (30 points)</MenuItem>
                  <MenuItem value="33-39">33-39 years (25 points)</MenuItem>
                  <MenuItem value="40-44">40-44 years (15 points)</MenuItem>
                  <MenuItem value="45-49">45-49 years (0 points)</MenuItem>
                </TextField>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <TextField
                  select
                  fullWidth
                  label="English Test Type"
                  value={englishTest}
                  onChange={(e) => setEnglishTest(e.target.value)}
                  helperText="Select your English test type"
                  margin="normal"
                >
                  <MenuItem value="ielts">IELTS (International English Language Testing System)</MenuItem>
                  <MenuItem value="pte">PTE (Pearson Test of English)</MenuItem>
                  <MenuItem value="toefl">TOEFL iBT (Test of English as a Foreign Language)</MenuItem>
                  <MenuItem value="cambridge">Cambridge C1 Advanced/C2 Proficiency</MenuItem>
                </TextField>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <TextField
                  select
                  fullWidth
                  label="English Language Proficiency"
                  value={englishLevel}
                  onChange={(e) => setEnglishLevel(e.target.value)}
                  helperText={
                    englishTest === 'ielts' ? "IELTS: Competent (6 in each), Proficient (7 in each), Superior (8 in each)" :
                    englishTest === 'pte' ? "PTE: Competent (50+), Proficient (65+), Superior (79+)" :
                    englishTest === 'toefl' ? "TOEFL: Competent (12+ in each), Proficient (24+ in each), Superior (28+ in each)" :
                    englishTest === 'cambridge' ? "Cambridge: Competent (169+), Proficient (185+), Superior (200+)" :
                    "Select your English language level"
                  }
                  margin="normal"
                >
                  <MenuItem value="competent">Competent English (0 points)</MenuItem>
                  <MenuItem value="proficient">Proficient English (10 points)</MenuItem>
                  <MenuItem value="superior">Superior English (20 points)</MenuItem>
                </TextField>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <TextField
                  select
                  fullWidth
                  label="Educational Qualification"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  helperText="Select your highest qualification"
                  margin="normal"
                >
                  <MenuItem value="diploma">Diploma (10 points)</MenuItem>
                  <MenuItem value="bachelors">Bachelor's Degree (15 points)</MenuItem>
                  <MenuItem value="masters">Master's Degree (15 points)</MenuItem>
                  <MenuItem value="doctorate">Doctorate (20 points)</MenuItem>
                </TextField>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <TextField
                  select
                  fullWidth
                  label="Skilled Employment Outside Australia"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  helperText="Years of skilled employment outside Australia in the last 10 years"
                  margin="normal"
                >
                  <MenuItem value="0">Less than 1 year (0 points)</MenuItem>
                  <MenuItem value="1-3">1-3 years (5 points)</MenuItem>
                  <MenuItem value="3-5">3-5 years (10 points)</MenuItem>
                  <MenuItem value="5-8">5-8 years (15 points)</MenuItem>
                  <MenuItem value="8+">8+ years (20 points)</MenuItem>
                </TextField>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <TextField
                  select
                  fullWidth
                  label="Skilled Employment In Australia"
                  value={australianExperience}
                  onChange={(e) => setAustralianExperience(e.target.value)}
                  helperText="Years of skilled employment in Australia in the last 10 years"
                  margin="normal"
                >
                  <MenuItem value="0">Less than 1 year (0 points)</MenuItem>
                  <MenuItem value="1">1-3 years (5 points)</MenuItem>
                  <MenuItem value="3">3-5 years (10 points)</MenuItem>
                  <MenuItem value="5">5-8 years (15 points)</MenuItem>
                  <MenuItem value="8+">8+ years (20 points)</MenuItem>
                </TextField>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <TextField
                  select
                  fullWidth
                  label="Partner Skills / Single Applicant"
                  value={partnerSkills}
                  onChange={(e) => setPartnerSkills(e.target.value)}
                  helperText="Partner skills or single applicant status"
                  margin="normal"
                >
                  <MenuItem value="none">Partner not skilled (0 points)</MenuItem>
                  <MenuItem value="competent-english">Partner with competent English (5 points)</MenuItem>
                  <MenuItem value="skilled">Skilled partner (10 points)</MenuItem>
                  <MenuItem value="no-partner">Single applicant (10 points)</MenuItem>
                </TextField>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <TextField
                  select
                  fullWidth
                  label="Specialist Education in Australia"
                  value={specialistEducation}
                  onChange={(e) => setSpecialistEducation(e.target.value)}
                  helperText="Specialist education qualification from an Australian educational institution"
                  margin="normal"
                >
                  <MenuItem value="no">No (0 points)</MenuItem>
                  <MenuItem value="yes">Yes (10 points)</MenuItem>
                </TextField>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <TextField
                  select
                  fullWidth
                  label="Professional Year in Australia"
                  value={professionalYear}
                  onChange={(e) => setProfessionalYear(e.target.value)}
                  helperText="Completed a Professional Year in Australia"
                  margin="normal"
                >
                  <MenuItem value="no">No (0 points)</MenuItem>
                  <MenuItem value="yes">Yes (5 points)</MenuItem>
                </TextField>
              </Box>
              
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={calculatePoints}
                  disabled={!age || !englishLevel || !qualification}
                >
                  Calculate Points
                </Button>
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  onClick={resetCalculator}
                >
                  Reset
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            {showResults && (
              <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Your Points Breakdown
                </Typography>
                
                {calculatedPoints.map((category, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Typography variant="body1">{category.name}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" fontWeight="bold">
                          {category.points} / {category.maxPoints}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider sx={{ my: 1 }} />
                  </Box>
                ))}
                
                <Box sx={{ mt: 3, p: 2, bgcolor: 'primary.main', color: 'white', borderRadius: 1 }}>
                  <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                      <Typography variant="h6">Total Points</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">{totalPoints}</Typography>
                    </Grid>
                  </Grid>
                </Box>
                
                <Box sx={{ mt: 3 }}>
                  {totalPoints >= 65 ? (
                    <Alert severity="success" sx={{ mb: 2 }}>
                      You have {totalPoints} points, which meets the minimum requirement of 65 points for skilled migration.
                    </Alert>
                  ) : (
                    <Alert severity="warning" sx={{ mb: 2 }}>
                      You have {totalPoints} points, which is below the minimum requirement of 65 points for skilled migration.
                    </Alert>
                  )}
                </Box>
                
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Eligible Visa Options
                  </Typography>
                  
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Subclass 189 - Skilled Independent Visa</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" paragraph>
                        This visa is for skilled workers who are not sponsored by an employer, family member, or state/territory government. It allows you to live and work permanently anywhere in Australia.
                      </Typography>
                      <Typography variant="body2" paragraph>
                        <strong>Requirements:</strong> Minimum 65 points, under 45 years of age, competent English, positive skills assessment.
                      </Typography>
                      {totalPoints >= 65 ? (
                        <Alert severity="success" icon={<InfoIcon />}>
                          With {totalPoints} points, you may be eligible for this visa. However, invitation cutoffs are typically higher than the minimum 65 points.
                        </Alert>
                      ) : (
                        <Alert severity="error" icon={<InfoIcon />}>
                          With {totalPoints} points, you do not meet the minimum requirement for this visa.
                        </Alert>
                      )}
                    </AccordionDetails>
                  </Accordion>
                  
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Subclass 190 - Skilled Nominated Visa</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" paragraph>
                        This visa is for skilled workers who are nominated by a state or territory government. It allows you to live and work permanently anywhere in Australia, but you are expected to live in the nominating state/territory for at least the first two years.
                      </Typography>
                      <Typography variant="body2" paragraph>
                        <strong>Requirements:</strong> Minimum 65 points (including 5 points for state nomination), under 45 years of age, competent English, positive skills assessment.
                      </Typography>
                      {totalPoints >= 60 ? (
                        <Alert severity="success" icon={<InfoIcon />}>
                          With {totalPoints} points + 5 points for state nomination = {totalPoints + 5} points, you may be eligible for this visa.
                        </Alert>
                      ) : (
                        <Alert severity="error" icon={<InfoIcon />}>
                          With {totalPoints} points + 5 points for state nomination = {totalPoints + 5} points, you do not meet the minimum requirement for this visa.
                        </Alert>
                      )}
                    </AccordionDetails>
                  </Accordion>
                  
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Subclass 491 - Skilled Work Regional Visa</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" paragraph>
                        This is a provisional visa for skilled workers who are nominated by a state/territory government or sponsored by an eligible family member living in a designated regional area. It allows you to live, work and study in a designated regional area of Australia for 5 years.
                      </Typography>
                      <Typography variant="body2" paragraph>
                        <strong>Requirements:</strong> Minimum 65 points (including 15 points for regional nomination/sponsorship), under 45 years of age, competent English, positive skills assessment.
                      </Typography>
                      {totalPoints >= 50 ? (
                        <Alert severity="success" icon={<InfoIcon />}>
                          With {totalPoints} points + 15 points for regional nomination = {totalPoints + 15} points, you may be eligible for this visa.
                        </Alert>
                      ) : (
                        <Alert severity="error" icon={<InfoIcon />}>
                          With {totalPoints} points + 15 points for regional nomination = {totalPoints + 15} points, you do not meet the minimum requirement for this visa.
                        </Alert>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PointsCalculator; 