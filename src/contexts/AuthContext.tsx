"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/router";
import { 
  refreshUserToken, 
  shouldRefreshToken, 
  loginUser,
  getLinkedInLoginUrl,
  handleLinkedInCallback,
  UserRole
} from "@/lib/authApi";
import { useLogoutMutation } from "@/hooks/useQuery";
import { FullPageLoader } from "@/components";

interface User {
  id: string;
  email: string;
  full_name: string;
  date_of_birth: string;
  location: string;
  occupation: string;
  profileCompleted: boolean;
  role: UserRole; // Add role to user interface
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
  isLoggingOut: boolean; // Add logout loading state
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  loginWithLinkedIn: () => Promise<{ success: boolean; error?: string }>;
  handleLinkedInLoginCallback: (
    code: string,
    state: string
  ) => Promise<{ success: boolean; error?: string; isNewUser?: boolean }>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setTokens: (tokens: TokenData | null) => void;
  refreshTokens: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<TokenData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!tokens;

  // Initialize auth state from localStorage/cookies
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedTokens = localStorage.getItem("auth-tokens");
        const storedUser = localStorage.getItem("auth-user");

        if (storedTokens && storedUser) {
          const parsedTokens = JSON.parse(storedTokens);
          setTokens(parsedTokens);
          setUser(JSON.parse(storedUser));

          // Set cookie for middleware
          document.cookie = `auth-token=${
            parsedTokens.accessToken
          }; path=/; max-age=${7 * 24 * 60 * 60}`;
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        // Clear invalid data
        localStorage.removeItem("auth-tokens");
        localStorage.removeItem("auth-user");
        localStorage.removeItem("authToken"); // Legacy token key
        document.cookie = "auth-token=; path=/; max-age=0";
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Save tokens to localStorage and cookies
  const saveTokens = useCallback((newTokens: TokenData | null) => {
    console.log("saveTokens called with:", newTokens); // Debug log
    setTokens(newTokens);
    if (newTokens) {
      localStorage.setItem("auth-tokens", JSON.stringify(newTokens));
      localStorage.setItem("authToken", newTokens.accessToken); // For legacy compatibility
      // Also set as cookie for middleware
      document.cookie = `auth-token=${newTokens.accessToken}; path=/; max-age=${
        7 * 24 * 60 * 60
      }`; // 7 days
      console.log(
        "Tokens saved to localStorage:",
        localStorage.getItem("auth-tokens")
      ); // Debug log
    } else {
      localStorage.removeItem("auth-tokens");
      localStorage.removeItem("authToken");
      document.cookie = "auth-token=; path=/; max-age=0";
      console.log("Tokens removed from localStorage"); // Debug log
    }
  }, []);

  // Save user to localStorage
  const saveUser = useCallback((newUser: User | null) => {
    console.log("saveUser called with:", newUser); // Debug log
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("auth-user", JSON.stringify(newUser));
      console.log(
        "User saved to localStorage:",
        localStorage.getItem("auth-user")
      ); // Debug log
    } else {
      localStorage.removeItem("auth-user");
      console.log("User removed from localStorage"); // Debug log
    }
  }, []);

  // Initialize logout mutation hook
  const { mutate: performLogout, isPending: isLoggingOut } = useLogoutMutation(tokens, saveTokens, saveUser);

  // Refresh tokens
  const refreshTokens = useCallback(async (): Promise<boolean> => {
    if (!tokens?.refreshToken) {
      return false;
    }

    try {
      const result = await refreshUserToken(tokens.refreshToken);

      if (result.success && "data" in result) {
        const newTokenData: TokenData = {
          ...result.data.tokens,
          issuedAt: Date.now(),
        };

        saveTokens(newTokenData);
        return true;
      } else {
        console.error("Token refresh failed:", result);
        // If refresh fails, logout user
        logout();
        return false;
      }
    } catch (error) {
      console.error("Token refresh error:", error);
      logout();
      return false;
    }
  }, [tokens?.refreshToken, saveTokens]);

  // Auto-refresh tokens when needed
  useEffect(() => {
    if (!tokens) return;

    const checkAndRefreshToken = () => {
      console.log("Checking token refresh..."); // Debug log
      console.log("Token expires in:", tokens.expiresIn, "seconds"); // Debug log
      console.log("Token issued at:", new Date(tokens.issuedAt)); // Debug log

      if (shouldRefreshToken(tokens.expiresIn, tokens.issuedAt)) {
        console.log("Token needs refresh, refreshing..."); // Debug log
        refreshTokens();
      } else {
        const now = Date.now();
        const expiryTime = tokens.issuedAt + tokens.expiresIn * 1000;
        const timeLeft = Math.floor((expiryTime - now) / 1000);
        console.log("Token still valid, expires in:", timeLeft, "seconds"); // Debug log
      }
    };

    // Don't check immediately, wait a bit to avoid immediate refresh
    const initialDelay = setTimeout(checkAndRefreshToken, 5000); // Check after 5 seconds

    // Check every 30 seconds instead of every hour for shorter tokens
    const interval = setInterval(checkAndRefreshToken, 30 * 1000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [tokens, refreshTokens, shouldRefreshToken]);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const response = await loginUser({ email, password });

      console.log("Login API response:", response); // Debug log

      if (response.success && "data" in response) {
        console.log("Login successful, saving tokens..."); // Debug log

        const tokenData: TokenData = {
          accessToken: response.data.tokens.accessToken,
          refreshToken: response.data.tokens.refreshToken,
          expiresIn: response.data.tokens.expiresIn,
          issuedAt: Date.now(),
        };

        console.log("Token data to save:", tokenData); // Debug log

        // Create user object with available fields
        const userData: User = {
          id: response.data.user.id,
          email: response.data.user.email,
          full_name: response.data.user.full_name || "", // Will be updated when profile is completed
          date_of_birth: response.data.user.date_of_birth || "",
          location: response.data.user.location || "",
          occupation: response.data.user.occupation || "",
          profileCompleted: response.data.user.profile_completed || false,
          // FUTURE: When API returns role, uncomment this line
          // role: response.data.user.role || "user",
          // TEMPORARY: Default to "user" role until API supports it
          role: "user" as UserRole,
        };

        console.log("User data to save:", userData); // Debug log
        console.log("profileCompleted from API:", response.data.user.profile_completed); // Debug log
        console.log("profileCompleted in userData:", userData.profileCompleted); // Debug log
        console.log("User role:", userData.role); // Debug log

        // Save tokens and user data
        saveTokens(tokenData);
        saveUser(userData);

        console.log("Tokens and user saved to localStorage"); // Debug log

        return { success: true };
      } else {
        const error =
          "error" in response ? response.error : "Invalid credentials";
        return { success: false, error };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: "Login failed. Please check your credentials.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithLinkedIn = async () => {
    try {
      setIsLoading(true);

      const response = await getLinkedInLoginUrl();

      if (response.success && "data" in response) {
        // Redirect to LinkedIn login URL
        window.location.href = response.data.url;
        return { success: true };
      } else {
        const error =
          "error" in response ? response.error : "Failed to get LinkedIn login URL";
        return { success: false, error };
      }
    } catch (error) {
      console.error("LinkedIn login error:", error);
      return {
        success: false,
        error: "LinkedIn login failed. Please try again.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkedInLoginCallback = async (code: string, state: string) => {
    try {
      setIsLoading(true);

      const response = await handleLinkedInCallback({ code, state });

      if (response.success && "data" in response) {
        console.log("LinkedIn login successful, saving tokens..."); // Debug log
        console.log("LinkedIn response data:", response.data); // Debug log

        const tokenData: TokenData = {
          accessToken: response.data.tokens.accessToken,
          refreshToken: response.data.tokens.refreshToken,
          expiresIn: response.data.tokens.expiresIn,
          issuedAt: Date.now(),
        };

        const userData: User = {
          id: response.data.user.id,
          email: response.data.user.email,
          full_name: response.data.user.full_name || "",
          date_of_birth: response.data.user.date_of_birth || "",
          location: response.data.user.location || "",
          occupation: response.data.user.occupation || "",
          profileCompleted: response.data.user.profile_completed || false,
          // FUTURE: When API returns role, uncomment this line
          // role: response.data.user.role || "user",
          // TEMPORARY: Default to "user" role until API supports it
          role: "user" as UserRole,
        };

        // Save tokens and user data
        saveTokens(tokenData);
        saveUser(userData);

        console.log("LinkedIn tokens and user saved to localStorage"); // Debug log
        console.log("LinkedIn user role:", userData.role); // Debug log

        return { 
          success: true, 
          isNewUser: response.data.isNewUser 
        };
      } else {
        const error =
          "error" in response ? response.error : "LinkedIn login failed";
        return { success: false, error };
      }
    } catch (error) {
      console.error("LinkedIn callback error:", error);
      return {
        success: false,
        error: "LinkedIn login failed. Please try again.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Call the React Query mutation hook
    // Only clears data and redirects on API success
    performLogout();
  };

  const value: AuthContextType = {
    user: user ? {...user, role: user.role || "user" as UserRole} : null,
    tokens,
    isLoading,
    isLoggingOut,
    isAuthenticated,
    login,
    loginWithLinkedIn,
    handleLinkedInLoginCallback,
    logout,
    setUser: saveUser,
    setTokens: saveTokens,
    refreshTokens,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {/* Full page loader during logout */}
      <FullPageLoader open={isLoggingOut} message="Logging out..." />
    </AuthContext.Provider>
  );
};
