import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Box } from '@mui/material';
import { createAsyncComponent, LoaderConfigs } from '@/components/AsyncWrapper';
import { getRedirectPath } from '@/config/routes';
import { UserRole } from '@/lib/authApi';

// Dynamic import for Loader component
const Loader = createAsyncComponent(
  () => import('@/components/Loader'),
  LoaderConfigs.page
);

export default function Home() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      // Check authentication status from localStorage
      const storedTokens = localStorage.getItem('auth-tokens');
      const legacyToken = localStorage.getItem('authToken'); // For backward compatibility
      const storedUser = localStorage.getItem('auth-user');
      
      if ((storedTokens || legacyToken) && storedUser) {
        try {
          // User is authenticated, redirect based on role
          const user = JSON.parse(storedUser);
          const redirectPath = getRedirectPath(
            user.role as UserRole,
            user.profileCompleted
          );
          console.log('Home: Redirecting authenticated user to:', redirectPath);
          router.replace(redirectPath);
        } catch (error) {
          console.error('Error parsing user data:', error);
          // Clear invalid data and redirect to login
          localStorage.removeItem('auth-user');
          localStorage.removeItem('auth-tokens');
          localStorage.removeItem('authToken');
          router.replace('/auth/login');
        }
      } else {
        // User is not authenticated, redirect to login
        console.log('Home: Redirecting to login');
        router.replace('/auth/login');
      }
    }
  }, [isMounted, router]);

  // Show loading spinner during redirect
  return (
    <>
      <Head>
        <title>Universe Club</title>
      </Head>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Loader />
      </Box>
    </>
  );
}