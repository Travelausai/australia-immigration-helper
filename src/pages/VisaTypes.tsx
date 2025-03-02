import React, { useState } from 'react';
import { 
  Typography, 
  Paper, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader, 
  Tabs, 
  Tab, 
  List, 
  ListItem, 
  ListItemText,
  Divider,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`visa-tabpanel-${index}`}
      aria-labelledby={`visa-tab-${index}`}
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

const VisaTypes: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Australian Visa Types
      </Typography>
      <Typography variant="body1" paragraph align="center">
        Explore the different visa options available for UK citizens moving to Australia
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="visa types tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Skilled Migration" />
          <Tab label="Work Visas" />
          <Tab label="Family Visas" />
          <Tab label="Student Visas" />
          <Tab label="Working Holiday" />
        </Tabs>
      </Box>

      {/* Skilled Migration Visas */}
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h5" gutterBottom>
          Skilled Migration Visas
        </Typography>
        <Typography variant="body1" paragraph>
          Australia's skilled migration program is designed to attract skilled workers who can contribute to the Australian economy.
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardHeader 
                title="Skilled Independent Visa (subclass 189)" 
                subheader="Permanent Residence"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" paragraph>
                  This points-based visa allows skilled workers to live and work permanently in Australia without needing a sponsor.
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Key Requirements:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Invitation to apply after submitting an Expression of Interest (EOI)" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Under 45 years of age" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Competent English (IELTS 6 or equivalent)" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Positive skills assessment in an occupation on the skilled occupation list" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Score at least 65 points on the points test" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardHeader 
                title="Skilled Nominated Visa (subclass 190)" 
                subheader="Permanent Residence"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Similar to the 189 visa, but requires nomination by an Australian state or territory government.
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Key Requirements:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Nomination by a state or territory government" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Under 45 years of age" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Competent English (IELTS 6 or equivalent)" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Positive skills assessment in an occupation on the relevant state's skilled occupation list" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Score at least 65 points on the points test" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Work Visas */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h5" gutterBottom>
          Work Visas
        </Typography>
        <Typography variant="body1" paragraph>
          These visas are designed for people who have been sponsored by an employer to work in Australia.
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardHeader 
                title="Temporary Skill Shortage Visa (subclass 482)" 
                subheader="Temporary Residence (2-4 years)"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Enables employers to address labor shortages by sponsoring skilled overseas workers when they cannot find an appropriately skilled Australian worker.
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Key Requirements:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Sponsorship by an approved business" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Occupation on the relevant skilled occupation list" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="At least 2 years of relevant work experience" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="English language proficiency" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardHeader 
                title="Employer Nomination Scheme (subclass 186)" 
                subheader="Permanent Residence"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" paragraph>
                  For skilled workers who want to be sponsored by an Australian employer for a permanent skilled position.
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Key Requirements:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Nomination by an approved Australian employer" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Under 45 years of age (some exemptions apply)" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="At least 3 years of relevant work experience" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Competent English (IELTS 6 or equivalent)" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Positive skills assessment for your occupation" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Family Visas */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h5" gutterBottom>
          Family Visas
        </Typography>
        <Typography variant="body1" paragraph>
          These visas allow Australian citizens, permanent residents, or eligible New Zealand citizens to sponsor their family members to come to Australia.
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardHeader 
                title="Partner Visa (subclasses 820 and 801)" 
                subheader="Temporary to Permanent Residence"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" paragraph>
                  For partners (spouse or de facto) of Australian citizens, permanent residents, or eligible New Zealand citizens.
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Key Requirements:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Sponsorship by an eligible Australian partner" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Genuine and continuing relationship" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Meet health and character requirements" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardHeader 
                title="Parent Visa (various subclasses)" 
                subheader="Permanent Residence"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" paragraph>
                  For parents of Australian citizens, permanent residents, or eligible New Zealand citizens.
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Key Requirements:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Sponsorship by your child who is an Australian citizen, permanent resident, or eligible New Zealand citizen" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Balance of family test (at least half of your children live permanently in Australia)" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Meet health and character requirements" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Assurance of Support (financial guarantee)" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Student Visas */}
      <TabPanel value={tabValue} index={3}>
        <Typography variant="h5" gutterBottom>
          Student Visas
        </Typography>
        <Typography variant="body1" paragraph>
          These visas allow international students to study in Australia at a registered institution.
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardHeader 
                title="Student Visa (subclass 500)" 
                subheader="Temporary Residence"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" paragraph>
                  For international students who have been accepted to study in Australia at a registered institution.
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Key Requirements:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Enrollment in a registered course of study" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Genuine temporary entrant requirement" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="English language proficiency" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Financial capacity to support yourself during your stay" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Health insurance coverage" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardHeader 
                title="Temporary Graduate Visa (subclass 485)" 
                subheader="Temporary Residence (2-4 years)"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" paragraph>
                  For international students who have recently graduated from an Australian educational institution.
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Key Requirements:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Recent graduation from an Australian institution" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Under 50 years of age" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Competent English (IELTS 6 or equivalent)" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Meet health and character requirements" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Working Holiday */}
      <TabPanel value={tabValue} index={4}>
        <Typography variant="h5" gutterBottom>
          Working Holiday Visa
        </Typography>
        <Typography variant="body1" paragraph>
          This visa is designed for young adults who want to holiday and work in Australia for up to a year.
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardHeader 
                title="Working Holiday Visa (subclass 417)" 
                subheader="Temporary Residence (up to 3 years with extensions)"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" paragraph>
                  For young adults from eligible countries, including the UK, who want to holiday and work in Australia.
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Key Requirements:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Age 18-30 (or 35 for some countries)" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Hold a passport from an eligible country (including the UK)" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Sufficient funds to support yourself (usually around AUD $5,000)" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Meet health and character requirements" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Have not previously held a Working Holiday visa (for first application)" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardHeader 
                title="Second and Third Working Holiday Visas" 
                subheader="Extensions to the initial visa"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" paragraph>
                  You may be eligible for a second or third Working Holiday visa if you complete specified work in regional Australia.
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Key Requirements for Second Visa:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Completed 3 months (88 days) of specified work in regional Australia during your first Working Holiday visa" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Specified work includes: plant and animal cultivation, fishing and pearling, tree farming and felling, mining, and construction" />
                  </ListItem>
                </List>
                <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                  Key Requirements for Third Visa:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Completed 6 months of specified work in regional Australia during your second Working Holiday visa" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          onClick={() => navigate('/eligibility')}
        >
          Check Your Eligibility
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          size="large"
          onClick={() => navigate('/points-calculator')}
        >
          Calculate Your Points
        </Button>
        <Button 
          variant="outlined" 
          color="secondary" 
          size="large"
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </Box>
    </Paper>
  );
};

export default VisaTypes; 