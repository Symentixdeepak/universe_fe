'use client';

import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useThemeColors } from '@/hooks';

export interface LoaderProps {
  size?: number;
  message?: string;
  fullScreen?: boolean;
  overlay?: boolean;
  color?: 'primary' | 'secondary' | 'inherit';
  variant?: 'circular' | 'linear';
  thickness?: number;
}

const Loader: React.FC<LoaderProps> = ({
  size = 40,
  message,
  fullScreen = false,
  overlay = false,
  color = 'primary',
  variant = 'circular',
  thickness = 3.6,
}) => {
  const themeColors = useThemeColors();

  const loaderStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    ...(fullScreen && {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      bgcolor: overlay ? 'rgba(0, 0, 0, 0.5)' : themeColors.background.primary,
    }),
    ...(overlay && !fullScreen && {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10,
      bgcolor: 'rgba(0, 0, 0, 0.5)',
    }),
  };

  return (
    <Box sx={loaderStyles}>
      <CircularProgress
        size={size}
        thickness={thickness}
        sx={{
          color: color === 'primary' 
            ? themeColors.pantone.main 
            : color === 'secondary' 
            ? themeColors.text.secondary 
            : 'inherit',
        }}
      />
      {message && (
        <Typography
          variant="bodyRegular"
          sx={{
            color: fullScreen && overlay 
              ? 'white' 
              : themeColors.text.secondary,
            textAlign: 'center',
            maxWidth: 300,
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default Loader;