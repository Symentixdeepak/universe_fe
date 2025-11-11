"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { useGetUserMe } from "@/hooks/useQuery";

// User interfaces
export interface Role {
  id: number;
  name: string;
  description?: string;
}

export interface UserSocialMedia {
  id: string;
  userId: string;
  platform: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Connection {
  id: string;
  userId: string;
  connectedUserId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthSession {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface UserActionToken {
  id: string;
  userId: string;
  token: string;
  action: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface Answer {
  id: string;
  userId: string;
  questionId: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  fullName: string;
  profileId: string;
  roleId: number;
  email: string;
  phone: string;
  passwordHash: string;
  dob: Date;
  location?: string | null;
  occupation?: string | null;
  status: number;
  profileCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date | null;
  summary?: string | null;
  about?: string | null;
  seeking?: string | null;
  totalConnections: number;
  totalUnreadNotifications: number;
  totalUnreadConversations: number;

  // Relations
  role?: Role;
  socialMedia?: UserSocialMedia[];
  sentConnections?: Connection[];
  receivedConnections?: Connection[];
  sessions?: AuthSession[];
  actionTokens?: UserActionToken[];
  answers?: Answer[];
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  error: any;
  refetch: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { isAuthenticated, tokens } = useAuth();

  // Fetch user data using React Query hook
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUserMe(tokens?.accessToken, isAuthenticated);

  const value: UserContextType = {
    user: user?.data || null,
    isLoading,
    isError,
    error,
    refetch,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
