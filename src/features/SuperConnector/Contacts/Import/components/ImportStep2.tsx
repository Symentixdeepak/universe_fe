import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { useThemeColors } from '@/hooks';

interface ImportStep2Props {
  fileName?: string;
  progress?: number;
}

const ImportStep2: React.FC<ImportStep2Props> = ({ fileName, progress = 50 }) => {
  const themeColors = useThemeColors();

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '525px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.8,
        }}
      >
        <Typography
          variant="bodyRegular"
          sx={{
            color: themeColors.grey.light,
            textAlign: 'center',
          }}
        >
          Importing your contacts
        </Typography>
        {/* {fileName && (
          <Typography
            variant="captionRegular"
            sx={{
              color: themeColors.text.secondary,
              textAlign: 'center',
            }}
          >
            {fileName}
          </Typography>
        )} */}
        <Box sx={{ width: '100%' }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: '8px',
              borderRadius: '4px',
              backgroundColor: themeColors.grey.light,
              '& .MuiLinearProgress-bar': {
                backgroundColor: themeColors.pantone.main,
                borderRadius: '4px',
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ImportStep2;
