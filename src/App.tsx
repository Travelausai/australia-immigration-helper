import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Analytics } from '@vercel/analytics/react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Questionnaire from './pages/Questionnaire';
import EligibilityQuestionnaire from './pages/EligibilityQuestionnaire';
import VisaTypes from './pages/VisaTypes';
import Resources from './pages/Resources';
import Auth from './pages/Auth';
import PointsCalculator from './pages/PointsCalculator';
import ActionPlan from './pages/ActionPlan';
import AIChatbot from './pages/AIChatbot';
import './App.css';

// Create a custom theme with Australian-inspired colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#00843D', // Australian green
    },
    secondary: {
      main: '#FFCD00', // Australian gold
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/eligibility" element={<EligibilityQuestionnaire />} />
            <Route path="/visa-types" element={<VisaTypes />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/points-calculator" element={<PointsCalculator />} />
            <Route path="/action-plan" element={<ActionPlan />} />
            <Route path="/chatbot" element={<AIChatbot />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
        <Analytics />
      </Router>
    </ThemeProvider>
  );
}

export default App;
