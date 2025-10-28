import React from 'react';
import { Box, Typography } from '@mui/material';
import { useThemeColors } from '@/hooks';
import Image from 'next/image';

interface ConnectionFoundProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

export const ConnectionFound: React.FC<ConnectionFoundProps> = ({
  onAccept,
  onDecline,
}) => {
  const themeColors = useThemeColors();

  return (
    <Box
      sx={{
        maxWidth: '680px',
        margin: '0 auto',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 8,
        px: 2,
      }}
    >
      {/* Title */}
      <Typography
        variant="h1Bold"
        sx={{
          color: themeColors.pantone.main,
          mb: 6,
          textAlign: 'center',
        }}
      >
        Connection Found!
      </Typography>

      {/* Profile Images Container */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          mb: 4,
          position: 'relative',
          width: '100%',
          maxWidth: '600px',
        }}
      >
        {/* Connecting Dots */}
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            gap: 1,
          }}
        >
          {[...Array(3)].map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: themeColors.pantone.main,
              }}
            />
          ))}
        </Box>

        {/* First Profile Lig*/}
        <Box sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              width: 214,
              height: 214,
              position: 'relative',
              borderRadius: '50%',
              overflow: 'hidden',
              mb: 2,
            }}
          >
            <Image
              src="/charactor.png"
              alt="Aelia Kos"
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>
          <Typography
            variant="bodyBold"
            sx={{
              color: themeColors.grey.main,
              textAlign: 'center',
            }}
          >
            Aelia Kos
          </Typography>
        </Box>

        {/* Second Profile */}
        <Box sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              width: 214,
              height: 214,
              position: 'relative',
              borderRadius: '50%',
              overflow: 'hidden',
              mb: 2,
            }}
          >
            <Image
              src="/charactor.png"
              alt="Dr. Maya K."
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>
          <Typography
            variant="bodyBold"
            sx={{
              color: themeColors.grey.main,
              textAlign: 'center',
            }}
          >
            Dr. Maya K.
          </Typography>
        </Box>
      </Box>

      {/* Connection Info Box */}
      <Box
        sx={{
          bgcolor: themeColors.background.secondary,
          borderRadius: 2,
          p: 3,
          mb: 4,
          width: '100%',
          maxWidth: '600px',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              bgcolor: themeColors.background.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="bodyBold" sx={{ color: themeColors.text.primary }}>
              i
            </Typography>
          </Box>
          <Typography variant="bodyBold" sx={{ color: themeColors.text.primary }}>
            Why we think this is a good connection
          </Typography>
        </Box>
        <Typography variant="bodyRegular" sx={{ color: themeColors.text.primary }}>
          Dr. Maya shares your interest in the intersection of AI and meaningful social impact. 
          Her focus on healthcare innovation aligns closely with your goal of connecting with 
          leaders driving purposeful change. With her background in startups and mentorship, 
          she offers not only industry expertise but also a collaborative mindset — making her 
          an ideal connection for building both knowledge and opportunity.
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <Box
          onClick={onAccept}
          sx={{
            flex: 1,
            py: 1.5,
            px: 4,
            borderRadius: '24px',
            border: `1px solid ${themeColors.border.primary}`,
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: themeColors.background.secondary,
            },
          }}
        >
          <Typography variant="bodyBold">Accept</Typography>
        </Box>
        <Box
          onClick={onDecline}
          sx={{
            flex: 1,
            py: 1.5,
            px: 4,
            borderRadius: '24px',
            bgcolor: themeColors.background.dark,
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: themeColors.background.darker,
            },
          }}
        >
          <Typography variant="bodyBold" sx={{ color: themeColors.white.main }}>
            Decline
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ConnectionFound;