'use client';

import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import { Toaster } from 'react-hot-toast';

import { queryClient } from '@/lib/react-query';
import { theme } from '@/styles/theme';
import { AuthProvider } from '@/contexts/AuthContext';
import createEmotionCache from '@/lib/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface ProvidersProps {
  children: React.ReactNode;
  emotionCache?: ReturnType<typeof createEmotionCache>;
}

export function Providers({ children, emotionCache = clientSideEmotionCache }: ProvidersProps) {
  return (
    <CacheProvider value={emotionCache}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div suppressHydrationWarning>
              {children}
            </div>
            
            {/* Toast notifications */}
            <Toaster
              position="top-right"
              reverseOrder={false}
              gutter={8}
              containerStyle={{
                top: 20,
                right: 20,
              }}
              toastOptions={{
                duration: 4000,
                style: {
                  borderRadius: '8px',
                  background: '#333',
                  color: '#fff',
                  padding: '12px 16px',
                  fontSize: '14px',
                  maxWidth: '500px',
                },
              }}
            />
            
            {/* React Query Devtools - only in development */}
            {process.env.NODE_ENV === 'development' && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </ThemeProvider>
        </QueryClientProvider>
      </AuthProvider>
    </CacheProvider>
  );
}