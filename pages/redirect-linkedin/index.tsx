import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Box, Typography, CircularProgress, Container } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { useThemeColors } from '@/hooks';
import { toastService } from '@/lib/toast';

export default function LinkedInRedirect() {
  const router = useRouter();
  const { handleLinkedInLoginCallback } = useAuth();
  const themeColors = useThemeColors();
  const [isProcessing, setIsProcessing] = useState(true);
  const [status, setStatus] = useState('Connecting to LinkedIn...');
  const [hasProcessed, setHasProcessed] = useState(false);

  useEffect(() => {
    const processLinkedInCallback = async () => {
      if (!router.isReady || hasProcessed) return;

      setHasProcessed(true); // Prevent multiple calls

      const { code, state, error, error_description } = router.query;

      // Check for LinkedIn errors
      if (error) {
        console.error('LinkedIn error:', error, error_description);
        setStatus('LinkedIn login was cancelled or failed');
        toastService.error(`LinkedIn login failed: ${error_description || error}`);
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          router.replace('/auth/login');
        }, 3000);
        return;
      }

      // Check if we have the required parameters
      if (!code || !state) {
        console.error('Missing code or state parameter');
        setStatus('Invalid LinkedIn callback');
        toastService.error('Invalid LinkedIn callback parameters');
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          router.replace('/auth/login');
        }, 3000);
        return;
      }

      try {
        setStatus('Verifying LinkedIn credentials...');
        
        const result = await handleLinkedInLoginCallback(
          code as string, 
          state as string
        );

        if (result.success) {
          setStatus('Login successful! Redirecting...');
          toastService.success('LinkedIn login successful!');
          
          // Check user profile completion to determine redirect
          const storedUser = localStorage.getItem('auth-user');
          if (storedUser) {
            try {
              const user = JSON.parse(storedUser);
              if (user.profileCompleted) {
                router.replace('/user/dashboard');
              } else {
                router.replace('/interests');
              }
            } catch (error) {
              console.error('Error parsing user data:', error);
              router.replace('/interests'); // Default to interests if error
            }
          } else {
            // If no stored user, redirect based on isNewUser (fallback)
            if (result.isNewUser) {
              router.replace('/interests');
            } else {
              router.replace('/user/dashboard');
            }
          }
        } else {
          setStatus('Login failed');
          toastService.error(result.error || 'LinkedIn login failed');
          
          // Redirect to login page after 3 seconds
          setTimeout(() => {
            router.replace('/auth/login');
          }, 3000);
        }
      } catch (error) {
        console.error('LinkedIn callback error:', error);
        setStatus('An error occurred during login');
        toastService.error('An unexpected error occurred');
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          router.replace('/auth/login');
        }, 3000);
      } finally {
        setIsProcessing(false);
      }
    };

    processLinkedInCallback();
  }, [router.isReady, router.query, handleLinkedInLoginCallback, router, hasProcessed]);

  return (
    <>
      <Head>
        <title>LinkedIn Login - Universe Club</title>
      </Head>
      <Container maxWidth="sm">
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
          {/* LinkedIn Logo or Icon */}
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: '#0E76A8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 4,
            }}
          >
            <Typography
              variant="h3Bold"
              sx={{
                color: 'white',
                fontSize: '2rem',
                fontWeight: 'bold',
              }}
            >
              in
            </Typography>
          </Box>

          {/* Loading Spinner */}
          {isProcessing && (
            <CircularProgress
              size={60}
              sx={{
                color: themeColors.black.main,
                mb: 3,
              }}
            />
          )}

          {/* Status Text */}
          <Typography
            variant="h3Bold"
            sx={{
              color: themeColors.text.primary,
              mb: 2,
            }}
          >
            {isProcessing ? 'Logging you in...' : 'Processing Complete'}
          </Typography>

          <Typography
            variant="bodyRegular"
            sx={{
              color: themeColors.text.secondary,
              maxWidth: 400,
              lineHeight: 1.6,
            }}
          >
            {status}
          </Typography>

          {!isProcessing && (
            <Typography
              variant="captionLight"
              sx={{
                color: themeColors.text.secondary,
                mt: 3,
              }}
            >
              You will be redirected automatically in a few seconds...
            </Typography>
          )}
        </Box>
      </Container>
    </>
  );
}