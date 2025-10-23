import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useThemeColors } from '@/hooks';

interface ProtectedRouteProps {
  children: ReactNode;
  requireProfileComplete?: boolean; // If true, redirects to interests if profile incomplete
}

export default function ProtectedRoute({ children, requireProfileComplete = false }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const themeColors = useThemeColors();

  useEffect(() => {
    if (isLoading) return; // Wait for auth to load

    if (!isAuthenticated) {
      console.log('ProtectedRoute: User not authenticated, redirecting to login');
      router.replace('/auth/login');
      return;
    }

    if (user && requireProfileComplete && !user.profileCompleted) {
      console.log('ProtectedRoute: Profile incomplete, redirecting to interests');
      router.replace('/interests');
      return;
    }
  }, [isAuthenticated, isLoading, user, router, requireProfileComplete]);

  // Show loading spinner while checking authentication
  if (isLoading || !isAuthenticated) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 2,
        }}
      >
        <CircularProgress 
          size={40} 
          sx={{ color: themeColors.pantone.main }} 
        />

      </Box>
    );
  }

  // If we need profile completion but it's not complete, don't render
  if (requireProfileComplete && user && !user.profileCompleted) {
    return null;
  }

  return <>{children}</>;
}