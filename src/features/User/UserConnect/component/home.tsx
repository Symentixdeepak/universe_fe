import React, { useState } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { TextField, Chip } from '@/components';
import { useThemeColors } from '@/hooks';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import Chat from './Chat';
const suggestions = [
  'Find me a travel partner',
  'Find me someone in the tech industry',
  'I am looking to connect with CEOs',
  'I need financial advice'
];

export const UserConnectHome = () => {
  const themeColors = useThemeColors();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchText, setSearchText] = useState('');
  const [showChat, setShowChat] = useState(false);

  const handleSearch = () => {
    if (searchText.trim()) {
      setShowChat(true);
    }
  };

  if (showChat) {
    return <Chat setShowChat={setShowChat} />;
  }

  return (
    <Box
      sx={{
        minHeight: { xs: 'calc(100vh - 56px)', md: 'calc(100vh - 62px)' },
        mt: { xs: 0, md: '62px' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: isMobile ? 'center' : 'center',
        px: 2,
        pt: isMobile ? 8 : 0,
        pb: isMobile ? 8 : 0,
        position: 'relative',
      }}
    >
      {/* Welcome Text with Gradient */}
      <Typography
        variant="h4Bold"
        sx={{
          background: `linear-gradient(90deg, ${themeColors.pantone.main} 0%, ${themeColors.pantone.light} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          textAlign: 'center',
        }}
      >
        Welcome back.
      </Typography>

      {/* Sub heading */}
      <Typography
        variant="h4Regular"
        sx={{
          color: themeColors.text.primary,
          mb: { xs: 2, md: 10 },
          textAlign: 'center',
          mt: -0.6,
          px: { xs: 2, md: 0 }, // Add padding on mobile for better text wrapping
        }}
      >
        Who would you like to connect with today?
      </Typography>

      {/* Search and Suggestions Container */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {/* Search Input */}
        <TextField
          fullWidth
          placeholder="Describe the connection or person you are looking for."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            endAdornment: (
              <Box 
                component="div"
                onClick={handleSearch}
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  color: themeColors.pantone.main,
                }}
              >
                <ArrowCircleRightOutlinedIcon sx={{ fontSize: 24, color: themeColors.pantone.main }} />
              </Box>
            ),
          }}
          sx={{
            // Mobile: sticky at bottom
            ...(isMobile && {
              position: 'fixed',
              bottom: 20,
              left: 20,
              right: 20,
              width: 'calc(100% - 40px)',
              maxWidth: 'calc(100% - 40px)',
              zIndex: theme.zIndex.appBar,
        
            }),
          }}
        />

        {/* Suggestion Chips */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: { xs: 'center', md: 'flex-start' },
            alignItems: 'center',
            gap: 1,
            width: '100%',
          }}
        >
          {suggestions.map((suggestion) => (
            <Chip
              key={suggestion}
              label={suggestion}
              onClick={() => setSearchText(suggestion)}
              variant="outlined"
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default UserConnectHome;
