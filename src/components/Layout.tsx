import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import Navbar from './Navbar';
import AIChatbot from './AIChatbot';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isOnChatbotPage = location.pathname === '/chatbot';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {children}
      </Container>
      <Box component="footer" sx={{ py: 3, bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
        <Container>
          <Typography variant="body2">
            © {new Date().getFullYear()} UK to Australia Immigration Helper. This is an informational resource only.
          </Typography>
        </Container>
      </Box>
      {!isOnChatbotPage && <AIChatbot embedded={true} />}
    </Box>
  );
};

export default Layout; 