'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
      
      if (storedTokens || legacyToken) {
        // User is authenticated, redirect to dashboard
        router.replace('/dashboard');
      } else {
        // User is not authenticated, redirect to login
        router.replace('/auth/login');
      }
    }
  }, [isMounted, router]);

  // Show nothing during server-side render to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  return null; // Will redirect before this renders
}
