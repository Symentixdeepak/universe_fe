'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface AuthRedirectProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function AuthRedirect({ children, redirectTo = '/dashboard' }: AuthRedirectProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Check authentication status
    const storedTokens = localStorage.getItem('auth-tokens');
    const legacyToken = localStorage.getItem('authToken'); // For backward compatibility
    const cookieToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth-token='))
      ?.split('=')[1];
    
    const authenticated = !!(storedTokens || legacyToken || cookieToken);
    setIsAuthenticated(authenticated);
    
    if (authenticated) {
      // Check if user profile is completed to determine redirect
      const storedUser = localStorage.getItem('auth-user');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          const finalRedirectTo = user.profileCompleted ? '/dashboard' : '/interests';
          router.replace(finalRedirectTo);
        } catch (error) {
          console.error('Error parsing stored user:', error);
          router.replace(redirectTo);
        }
      } else {
        router.replace(redirectTo);
      }
    }
  }, [router, redirectTo]);

  // Don't render anything until mounted to avoid hydration issues
  if (!isMounted) {
    return null;
  }

  // Don't render children if user is authenticated (they'll be redirected)
  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}