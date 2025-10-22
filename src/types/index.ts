// Export all TypeScript interfaces and types here
// Example:
// export type { User } from './user';
// export type { Post } from './post';
// export type { ApiResponse } from './api';

// This file serves as the main entry point for all type definitions
// Add type exports as you create them

// Common types that might be used across the application
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  status: number;
  details?: unknown;
}

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}