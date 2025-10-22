'use client';

import { Box, Typography, Container } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useThemeColors } from '@/hooks';
import { Button } from '@/components';

export default function NotFound() {
  const router = useRouter();
  const themeColors = useThemeColors();

  const handleGoHome = () => {
    router.push('/');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          px: 2,
        }}
      >
        {/* 404 Image */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: 150, sm: 250, md: 370 },
            height: { xs: 120, sm: 200, md: 300 },
          
          }}
        >
          <Image
            src="/assets/images/404-illustration.svg"
            alt="404 - Page Not Found"
            fill
            style={{
              objectFit: 'contain',
              filter: themeColors?.isDark ? 'invert(0.8)' : 'none',
            }}
            priority
          />
        </Box>

        {/* 404 Text */}
        <Typography
          variant="h1Bold"
          sx={{
            color: themeColors.text.primary,
            fontSize: { xs: '4rem', sm: '6rem', md: '8rem' },
            fontWeight: 900,
            lineHeight: 0.8,
            mb: 2,
            mt: 4,
            background: `linear-gradient(45deg, ${themeColors.black.main}, ${themeColors.white.light})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404
        </Typography>

        {/* Main Error Message */}
        <Typography
          variant="h2Bold"
          sx={{
            color: themeColors.text.primary,
            mb: 2,
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
          }}
        >
          Oops! Page Not Found
        </Typography>

        {/* Description */}
        <Typography
          variant="bodyRegular"
          sx={{
            color: themeColors.text.secondary,
            mb: 6,
            maxWidth: 600,
            fontSize: { xs: '1rem', sm: '1.1rem' },
            lineHeight: 1.6,
          }}
        >
          The page you're looking for doesn't exist or has been moved to another location. 
          Don't worry, let's get you back to the Universe.
        </Typography>

        {/* Action Buttons */}
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 3, 
            flexDirection: { xs: 'column', sm: 'row' },
            width: { xs: '100%', sm: 'auto' },
            maxWidth: { xs: 400, sm: 'none' },
          }}
        >
          <Button
            variant="contained"
            onClick={handleGoHome}
            sx={{
              minWidth: { xs: '100%', sm: 150 },
              py: 1.5,
              borderRadius: '25px',
              typography: 'bodyBold',
            }}
          >
            Go Home
          </Button>
          
          <Button
            variant="outlined"
            theme="auto"
            onClick={handleGoBack}
            sx={{
              minWidth: { xs: '100%', sm: 150 },
              py: 1.5,
              borderRadius: '25px',
              typography: 'bodyBold',
            }}
          >
            Go Back
          </Button>
        </Box>

 

      </Box>
    </Container>
  );
}