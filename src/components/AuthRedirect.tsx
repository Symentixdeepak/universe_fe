'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface AuthRedirectProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function AuthRedirect({ children, redirectTo = '/user/dashboard' }: AuthRedirectProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Check authentication status
    const storedTokens = localStorage.getItem('auth-tokens');
    const legacyToken = localStorage.getItem('authToken'); // For backward compatibility
    const storedUser = localStorage.getItem('auth-user');
    
    console.log('AuthRedirect: storedTokens:', !!storedTokens); // Debug log
    console.log('AuthRedirect: legacyToken:', !!legacyToken); // Debug log
    console.log('AuthRedirect: storedUser:', !!storedUser); // Debug log
    
    // User is authenticated only if they have both tokens AND user data
    const authenticated = !!(storedTokens || legacyToken) && !!storedUser;
    console.log('AuthRedirect: authenticated:', authenticated); // Debug log
    
    setIsAuthenticated(authenticated);
    
    if (authenticated) {
      // Check if user profile is completed to determine redirect
      try {
        const user = JSON.parse(storedUser!);
        console.log('AuthRedirect: user data:', user); // Debug log
        console.log('AuthRedirect: profileCompleted:', user.profileCompleted); // Debug log
        const finalRedirectTo = user.profileCompleted ? '/user/dashboard' : '/interests';
        console.log('AuthRedirect: redirecting to:', finalRedirectTo); // Debug log
        router.replace(finalRedirectTo);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        // Clear invalid user data
        localStorage.removeItem('auth-user');
        localStorage.removeItem('auth-tokens');
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
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