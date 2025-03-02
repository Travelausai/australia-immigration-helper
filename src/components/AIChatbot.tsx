import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Drawer, 
  IconButton, 
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  Fab,
  Divider,
  CircularProgress
} from '@mui/material';

// Icons
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';

// AI Service
import { getAIResponse } from '../services/aiService';

// Message interface
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface AIChatbotProps {
  embedded?: boolean;
}

// Main component
const AIChatbot: React.FC<AIChatbotProps> = ({ embedded = false }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  // Initialize chat with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: "Hello! I'm your Australian Immigration Assistant. How can I help you today? You can ask me about visa types, points requirements, skilled occupation lists, English language tests, or the immigration process.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // For non-embedded mode, set isOpen to true on mount
  useEffect(() => {
    if (!embedded) {
      setIsOpen(true);
    }
  }, [embedded]);

  // Focus the input field when opened or when in full-page mode
  useEffect(() => {
    if ((isOpen || !embedded) && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen, embedded]);

  // Create a style element using standard React approach
  useEffect(() => {
    // Create a style element for the contentEditable placeholder
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      [contenteditable=true]:empty:before {
        content: attr(data-placeholder);
        color: rgba(0, 0, 0, 0.55);
        pointer-events: none;
        display: block;
      }
    `;
    document.head.appendChild(styleElement);

    // Clean up style when component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Toggle chat drawer
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  // Handle send message
  const handleSendMessage = async () => {
    if (!inputRef.current || inputRef.current.textContent?.trim() === '') return;
    
    const messageText = inputRef.current.textContent || '';
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Clear input
    inputRef.current.textContent = '';
    setIsTyping(true);

    // Keep focus on the input field
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);

    try {
      // Get response from AI service
      const response = await getAIResponse(messageText);
      
      // Add bot message
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error getting bot response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I couldn't process your request. Please try again later.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Chat interface that can be used in both drawer and full page modes
  const ChatInterface = () => (
    <>
      {/* Chat header */}
      <Box sx={{ 
        p: 2, 
        bgcolor: 'primary.main', 
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
            <SmartToyIcon />
          </Avatar>
          <Typography variant="h6">
            Immigration Assistant
          </Typography>
        </Box>
        {embedded && (
          <IconButton onClick={toggleDrawer} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      
      <Divider />
      
      {/* Chat messages */}
      <Box sx={{ 
        flexGrow: 1, 
        p: 2, 
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        height: embedded ? 'calc(100% - 128px)' : '400px'
      }}>
        <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
          {messages.map((message) => (
            <ListItem 
              key={message.id} 
              alignItems="flex-start"
              sx={{ 
                flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                p: 1
              }}
            >
              <ListItemAvatar sx={{ minWidth: 40 }}>
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32,
                    bgcolor: message.sender === 'user' ? 'secondary.main' : 'primary.main'
                  }}
                >
                  {message.sender === 'user' ? <PersonIcon /> : <SmartToyIcon />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Paper 
                    elevation={1} 
                    sx={{ 
                      p: 1.5, 
                      display: 'inline-block',
                      maxWidth: '80%',
                      bgcolor: message.sender === 'user' ? 'secondary.light' : 'grey.100',
                      borderRadius: message.sender === 'user' 
                        ? '20px 20px 4px 20px' 
                        : '20px 20px 20px 4px',
                    }}
                  >
                    <Typography variant="body1">
                      {message.text}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'right', mt: 0.5 }}>
                      {formatTime(message.timestamp)}
                    </Typography>
                  </Paper>
                }
              />
            </ListItem>
          ))}
          {isTyping && (
            <ListItem alignItems="flex-start">
              <ListItemAvatar sx={{ minWidth: 40 }}>
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32,
                    bgcolor: 'primary.main'
                  }}
                >
                  <SmartToyIcon />
                </Avatar>
              </ListItemAvatar>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <CircularProgress size={20} thickness={5} />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Typing...
                </Typography>
              </Box>
            </ListItem>
          )}
          <div ref={messagesEndRef} />
        </List>
      </Box>
      
      <Divider />
      
      {/* Chat input */}
      <Box sx={{ 
        p: 2, 
        bgcolor: 'background.paper',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Box 
          component="div"
          sx={{ 
            display: 'flex',
            width: '100%',
            border: '1px solid rgba(0, 0, 0, 0.23)',
            borderRadius: '4px',
            mr: 1,
            '&:focus-within': {
              borderColor: 'primary.main',
              borderWidth: '2px',
            }
          }}
        >
          {/* ContentEditable div instead of input */}
          <div
            ref={inputRef}
            contentEditable
            role="textbox"
            onKeyDown={handleKeyDown}
            style={{
              width: '100%',
              padding: '8px 12px',
              outline: 'none',
              fontSize: '16px',
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
              cursor: 'text',
              minHeight: '24px',
              maxHeight: '100px',
              overflowY: 'auto',
              wordBreak: 'break-word',
            }}
            data-placeholder="Type your message..."
            onFocus={(e) => {
              // If empty, clear the content (fixes placeholder issue)
              if (e.currentTarget.textContent === '') {
                e.currentTarget.textContent = '';
              }
            }}
          />
        </Box>
        <IconButton 
          color="primary" 
          onClick={handleSendMessage}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </>
  );

  // For embedded usage (in other pages), show a chat button that opens a drawer
  if (embedded) {
    return (
      <>
        {/* Chat button */}
        <Fab 
          color="primary" 
          aria-label="chat"
          onClick={toggleDrawer}
          sx={{ 
            position: 'fixed', 
            bottom: 20, 
            right: 20,
            zIndex: 1000
          }}
        >
          <ChatIcon />
        </Fab>

        {/* Chat drawer */}
        <Drawer
          anchor="right"
          open={isOpen}
          onClose={toggleDrawer}
          sx={{
            '& .MuiDrawer-paper': { 
              width: { xs: '100%', sm: 400 },
              height: '100%'
            },
          }}
        >
          <ChatInterface />
        </Drawer>
      </>
    );
  }

  // For full page usage (AIChatbot page), show the chat interface directly
  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      border: '1px solid rgba(0, 0, 0, 0.12)',
      borderRadius: 1,
      overflow: 'hidden'
    }}>
      <ChatInterface />
    </Box>
  );
};

export default AIChatbot; 