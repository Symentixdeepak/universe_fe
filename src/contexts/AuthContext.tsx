'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { refreshUserToken, shouldRefreshToken, loginUser } from '@/lib/authApi';

interface User {
  id: string;
  email: string;
  full_name: string;
  date_of_birth: string;
  location: string;
  occupation: string;
}

interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  issuedAt: number;
}

interface AuthContextType {
  user: User | null;
  tokens: TokenData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setTokens: (tokens: TokenData | null) => void;
  refreshTokens: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<TokenData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!tokens;

  // Initialize auth state from localStorage/cookies
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedTokens = localStorage.getItem('auth-tokens');
        const storedUser = localStorage.getItem('auth-user');
        
        if (storedTokens && storedUser) {
          const parsedTokens = JSON.parse(storedTokens);
          setTokens(parsedTokens);
          setUser(JSON.parse(storedUser));
          
          // Set cookie for middleware
          document.cookie = `auth-token=${parsedTokens.accessToken}; path=/; max-age=${7 * 24 * 60 * 60}`;
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear invalid data
        localStorage.removeItem('auth-tokens');
        localStorage.removeItem('auth-user');
        localStorage.removeItem('authToken'); // Legacy token key
        document.cookie = 'auth-token=; path=/; max-age=0';
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Save tokens to localStorage and cookies
  const saveTokens = useCallback((newTokens: TokenData | null) => {
    setTokens(newTokens);
    if (newTokens) {
      localStorage.setItem('auth-tokens', JSON.stringify(newTokens));
      localStorage.setItem('authToken', newTokens.accessToken); // For legacy compatibility
      // Also set as cookie for middleware
      document.cookie = `auth-token=${newTokens.accessToken}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days
    } else {
      localStorage.removeItem('auth-tokens');
      localStorage.removeItem('authToken');
      document.cookie = 'auth-token=; path=/; max-age=0';
    }
  }, []);

  // Save user to localStorage
  const saveUser = useCallback((newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('auth-user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('auth-user');
    }
  }, []);

  // Refresh tokens
  const refreshTokens = useCallback(async (): Promise<boolean> => {
    if (!tokens?.refreshToken) {
      return false;
    }

    try {
      const result = await refreshUserToken(tokens.refreshToken);
      
      if (result.success && 'data' in result) {
        const newTokenData: TokenData = {
          ...result.data.tokens,
          issuedAt: Date.now(),
        };
        
        saveTokens(newTokenData);
        return true;
      } else {
        console.error('Token refresh failed:', result);
        // If refresh fails, logout user
        logout();
        return false;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      logout();
      return false;
    }
  }, [tokens?.refreshToken, saveTokens]);

  // Auto-refresh tokens when needed
  useEffect(() => {
    if (!tokens) return;

    const checkAndRefreshToken = () => {
      if (shouldRefreshToken(tokens.expiresIn, tokens.issuedAt)) {
        refreshTokens();
      }
    };

    // Check immediately
    checkAndRefreshToken();

    // Check every hour
    const interval = setInterval(checkAndRefreshToken, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [tokens, refreshTokens]);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const response = await loginUser({ email, password });
      
      if (response.token && response.refreshToken) {
        const tokenData: TokenData = {
          accessToken: response.token,
          refreshToken: response.refreshToken,
          expiresIn: 7 * 24 * 60 * 60, // 7 days in seconds
          issuedAt: Date.now(),
        };
        
        saveTokens(tokenData);
        saveUser(response.user);
        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please check your credentials.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    saveTokens(null);
    saveUser(null);
    // Redirect to login page
    window.location.href = '/auth/login';
  };

  const value: AuthContextType = {
    user,
    tokens,
    isLoading,
    isAuthenticated,
    login,
    logout,
    setUser: saveUser,
    setTokens: saveTokens,
    refreshTokens,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};