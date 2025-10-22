import { 
  QueryClient,
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueries,
  useQueryClient,
  useSuspenseQuery,
  useSuspenseInfiniteQuery,
  useIsFetching,
  useIsMutating,
  useMutationState,
  useIsRestoring,
  // Types
  UseQueryOptions,
  UseMutationOptions,
  UseInfiniteQueryOptions,
    QueriesOptions,
  QueryKey,
  MutationKey,
  InfiniteData,
  QueryFunction,
  MutationFunction,
} from '@tanstack/react-query';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Time in milliseconds to cache data before refetching
      staleTime: 5 * 60 * 1000, // 5 minutes
      // Time in milliseconds before data is considered fresh
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      // Retry failed requests
      retry: 2,
      // Retry delay
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Don't refetch on window focus by default
      refetchOnWindowFocus: false,
      // Don't refetch on reconnect by default
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry failed mutations
      retry: 1,
    },
  },
});

// Query key factory for consistent key generation
export const queryKeys = {
  // Base keys
  all: ['api'] as const,
  
  // Resource-specific keys
  users: () => [...queryKeys.all, 'users'] as const,
  user: (id: string) => [...queryKeys.users(), id] as const,
  userProfile: (id: string) => [...queryKeys.user(id), 'profile'] as const,
  
  // Add more resource keys as needed
  posts: () => [...queryKeys.all, 'posts'] as const,
  post: (id: string) => [...queryKeys.posts(), id] as const,
  
  // Feature-specific keys
  auth: () => [...queryKeys.all, 'auth'] as const,
  currentUser: () => [...queryKeys.auth(), 'current-user'] as const,
} as const;

// Comprehensive Query object with all TanStack Query functionality
export const Query = {
  // Core hooks
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueries,
  useQueryClient,
  
  // Suspense hooks
  useSuspenseQuery,
  useSuspenseInfiniteQuery,
  
  // Status hooks
  useIsFetching,
  useIsMutating,
  useMutationState,
  useIsRestoring,
  
  // Query client instance
  client: queryClient,
  
  // Query keys factory
  keys: queryKeys,
  
  // Utility functions for common patterns
  utils: {
    // Invalidate queries helper
    invalidate: (queryKey: QueryKey) => {
      return queryClient.invalidateQueries({ queryKey });
    },
    
    // Prefetch query helper
    prefetch: <T>(queryKey: QueryKey, queryFn: QueryFunction<T>, options?: UseQueryOptions<T>) => {
      return queryClient.prefetchQuery({
        queryKey,
        queryFn,
        ...options,
      });
    },
    
    // Set query data helper
    setData: <T>(queryKey: QueryKey, data: T | ((oldData: T | undefined) => T)) => {
      return queryClient.setQueryData(queryKey, data);
    },
    
    // Get query data helper
    getData: <T>(queryKey: QueryKey): T | undefined => {
      return queryClient.getQueryData<T>(queryKey);
    },
    
    // Remove queries helper
    remove: (queryKey: QueryKey) => {
      return queryClient.removeQueries({ queryKey });
    },
    
    // Cancel queries helper
    cancel: (queryKey: QueryKey) => {
      return queryClient.cancelQueries({ queryKey });
    },
    
    // Reset queries helper
    reset: (queryKey?: QueryKey) => {
      return queryClient.resetQueries({ queryKey });
    },
    
    // Refetch queries helper
    refetch: (queryKey: QueryKey) => {
      return queryClient.refetchQueries({ queryKey });
    },
    
    // Clear cache helper
    clear: () => {
      return queryClient.clear();
    },
  },
  
  // Common query patterns
  patterns: {
    // Basic GET query pattern
    get: <T>(queryKey: QueryKey, queryFn: QueryFunction<T>, options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>) => {
      return useQuery({
        queryKey,
        queryFn,
        ...options,
      });
    },
    
    // Mutation pattern with optimistic updates
    mutate: <TData, TError, TVariables, TContext>(
      mutationFn: MutationFunction<TData, TVariables>,
      options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>
    ) => {
      return useMutation({
        mutationFn,
        ...options,
      });
    },
    
    // Infinite query pattern for pagination
    infinite: <T, TPageParam = number>(
      queryKey: QueryKey,
      queryFn: QueryFunction<T, QueryKey, TPageParam>,
      options?: Omit<UseInfiniteQueryOptions<T, Error, InfiniteData<T>, QueryKey, TPageParam>, 'queryKey' | 'queryFn'>
    ) => {
      return useInfiniteQuery({
        queryKey,
        queryFn,
        initialPageParam: 1 as TPageParam,
        getNextPageParam: (lastPage: any) => lastPage?.nextPage ?? undefined,
        getPreviousPageParam: (firstPage: any) => firstPage?.prevPage ?? undefined,
        ...options,
      });
    },
    
    // Parallel queries pattern
    parallel: (queries: any[]) => {
      return useQueries({ queries });
    },
    
    // Dependent query pattern
    dependent: <T>(
      queryKey: QueryKey,
      queryFn: QueryFunction<T>,
      enabled: boolean,
      options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn' | 'enabled'>
    ) => {
      return useQuery({
        queryKey,
        queryFn,
        enabled,
        ...options,
      });
    },
  },
} as const;

// Export types for convenience
export type {
  UseQueryOptions,
  UseMutationOptions,
  UseInfiniteQueryOptions,
  QueriesOptions,
  QueryKey,
  MutationKey,
  InfiniteData,
  QueryFunction,
  MutationFunction,
};

















// how to use query with api service

// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { apiService } from '@/lib/api';

// function useCreateUser() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (newUser) => apiService.post('/users', newUser),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['users']);
//     },
//   });
// }

// import { useInfiniteQuery } from '@tanstack/react-query';
// import { apiService } from '@/lib/api';

// function useInfinitePosts() {
//   return useInfiniteQuery({
//     queryKey: ['posts'],
//     queryFn: ({ pageParam = 1 }) =>
//       apiService.get(`/posts?page=${pageParam}`),
//     getNextPageParam: (lastPage, allPages) => {
//       // Example: lastPage.data.nextPage or similar
//       return lastPage.data.nextPage ?? false;
//     },
//   });
// }

// import { useQuery } from '@tanstack/react-query';
// import { apiService } from '@/lib/api';

// function useUsers() {
//   return useQuery({
//     queryKey: ['users'],
//     queryFn: () => apiService.get('/users'),
//   });
// }