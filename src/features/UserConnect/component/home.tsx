import React, { useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
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
  const [searchText, setSearchText] = useState('');
  const [showChat, setShowChat] = useState(false);

  const handleSearch = () => {
    if (searchText.trim()) {
      setShowChat(true);
    }
  };

  if (showChat) {
    return <Chat />;
  }

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 62px)',
        mt: '62px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
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
        }}
      >
        Welcome back.
      </Typography>

      {/* Sub heading */}
      <Typography
        variant="h4Regular"
        sx={{
          color: themeColors.text.primary,
          mb: 10,
          mt:-0.6
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
        />

        {/* Suggestion Chips */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
       
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
