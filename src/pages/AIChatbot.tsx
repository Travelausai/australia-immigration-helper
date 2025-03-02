import React, { useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import AIChatbotComponent from '../components/AIChatbot';
import { updateAISettings } from '../services/aiService';

// Use environment variable instead of hardcoded key
const DEFAULT_API_KEY = process.env.REACT_APP_OPENAI_API_KEY || "";

const AIChatbot: React.FC = () => {
  // Initialize with default settings on page load
  useEffect(() => {
    updateAISettings({
      apiKey: DEFAULT_API_KEY,
      temperature: 0.7,
      maxTokens: 1500
    });
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          AI Immigration Assistant
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
          Ask questions about the Australian immigration process and get instant answers
        </Typography>
        
        <Box sx={{ height: '650px' }}>
          <AIChatbotComponent embedded={false} />
        </Box>
      </Box>
    </Container>
  );
};

export default AIChatbot;