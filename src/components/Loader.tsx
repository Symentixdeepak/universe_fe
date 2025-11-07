'use client';

import React from 'react';
import { Box, Typography, keyframes } from '@mui/material';
import { useThemeColors } from '@/hooks';

export interface LoaderProps {
  message?: string;
  size?: number;
  color?: 'primary' | 'secondary' | 'inherit';
}

const Loader: React.FC<LoaderProps> = ({
  message = '',
  size = 22,
  color = 'primary',
}) => {
  const themeColors = useThemeColors();

  const spinColor =
    color === 'primary'
      ? themeColors.pantone.main
      : color === 'secondary'
      ? themeColors.text.secondary
      : 'inherit';

  // Rotation animation
  const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  `;

  // Opacity gradient (darkest → lightest)
  const dotOpacities = ['0.9', '0.75', '0.55', '0.55'];

  return (
    <Box
      sx={{
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Dots Spinner */}
      <Box
        sx={{
          position: 'relative',
          width: size,
          height: size,
          animation: `${spin} 1s linear infinite`,
        }}
      >
        {[...Array(4)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: size * 0.4,
              height: size * 0.4,
              backgroundColor: spinColor,
              opacity: dotOpacities[i],
              borderRadius: '50%',
              top: '50%',
              left: '50%',
              transformOrigin: '0 0',
              transform: `rotate(${i * 90}deg) translate(${size / 2.5}px, -50%)`,
            }}
          />
        ))}
      </Box>


    </Box>
  );
};

export default Loader;
