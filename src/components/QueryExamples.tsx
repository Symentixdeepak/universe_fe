import React from 'react';
import { Box, Typography, Button, Stack, Paper, CircularProgress, Alert } from '@mui/material';
import { Query } from '@/lib/react-query';
import { apiService } from '@/lib/api';

// Example interfaces
interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
}

interface PaginatedResponse<T> {
  data: T[];
  page: number;
  totalPages: number;
  nextPage?: number;
}

/**
 * Demo component showcasing Query object usage patterns
 */
export const QueryExamples: React.FC = () => {
  // 1. Basic GET query using Query.useQuery
  const usersQuery = Query.useQuery({
    queryKey: Query.keys.users(),
    queryFn: () => apiService.get<User[]>('/users'),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // 2. Dependent query - only runs when usersQuery has data
  const firstUserQuery = Query.patterns.dependent(
    Query.keys.user(usersQuery.data?.data?.[0]?.id?.toString() || ''),
    () => apiService.get<User>(`/users/${usersQuery.data?.data?.[0]?.id}`),
    !!usersQuery.data?.data?.[0]?.id
  );

  // 3. Mutation using Query.useMutation
  const createUserMutation = Query.useMutation({
    mutationFn: (newUser: Omit<User, 'id'>) => apiService.post<User>('/users', newUser),
    onSuccess: () => {
      // Invalidate and refetch users query
      Query.utils.invalidate(Query.keys.users());
    },
    onError: (error) => {
      console.error('Failed to create user:', error);
    },
  });

  // 4. Infinite query for pagination using Query.useInfiniteQuery
  const postsInfiniteQuery = Query.useInfiniteQuery({
    queryKey: Query.keys.posts(),
    queryFn: ({ pageParam = 1 }) => 
      apiService.get<PaginatedResponse<Post>>(`/posts?page=${pageParam}&limit=10`),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.data.nextPage,
    getPreviousPageParam: (firstPage) => firstPage.data.page > 1 ? firstPage.data.page - 1 : undefined,
  });

  // 5. Parallel queries using Query.useQueries
  const parallelQueries = Query.useQueries({
    queries: [
      {
        queryKey: ['users', 'count'],
        queryFn: () => apiService.get<number>('/users/count'),
      },
      {
        queryKey: ['posts', 'count'],
        queryFn: () => apiService.get<number>('/posts/count'),
      },
      {
        queryKey: ['analytics'],
        queryFn: () => apiService.get<any>('/analytics'),
      },
    ],
  });

  // 6. Using Query.patterns for common scenarios
  const specificUserQuery = Query.patterns.get(
    Query.keys.user('123'),
    () => apiService.get<User>('/users/123'),
    {
      enabled: true,
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );

  // Handlers
  const handleCreateUser = () => {
    createUserMutation.mutate({
      name: 'John Doe',
      email: 'john@example.com',
    });
  };

  const handleLoadMore = () => {
    if (postsInfiniteQuery.hasNextPage && !postsInfiniteQuery.isFetchingNextPage) {
      postsInfiniteQuery.fetchNextPage();
    }
  };

  const handleRefreshUsers = () => {
    Query.utils.refetch(Query.keys.users());
  };

  const handleClearCache = () => {
    Query.utils.clear();
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h1Regular" sx={{ mb: 4, textAlign: 'center' }}>
        React Query Examples
      </Typography>

      <Stack spacing={4}>
        {/* Basic Query Example */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h3Bold" sx={{ mb: 2 }}>
            1. Basic GET Query (Query.useQuery)
          </Typography>
          <Typography variant="bodyRegular" sx={{ mb: 2 }}>
            Status: {usersQuery.status} | Loading: {usersQuery.isLoading.toString()}
          </Typography>
          
          {usersQuery.isLoading && <CircularProgress size={24} />}
          {usersQuery.error && (
            <Alert severity="error">
              Error: {(usersQuery.error as any)?.message || 'Failed to fetch users'}
            </Alert>
          )}
          {usersQuery.data && (
            <Typography variant="bodyLight">
              Loaded {usersQuery.data.data?.length || 0} users
            </Typography>
          )}
          
          <Button onClick={handleRefreshUsers} sx={{ mt: 2 }}>
            Refresh Users
          </Button>
        </Paper>

        {/* Mutation Example */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h3Bold" sx={{ mb: 2 }}>
            2. Mutation (Query.useMutation)
          </Typography>
          <Typography variant="bodyRegular" sx={{ mb: 2 }}>
            Create User Status: {createUserMutation.status}
          </Typography>
          
          <Button 
            onClick={handleCreateUser} 
            disabled={createUserMutation.isPending}
            variant="contained"
          >
            {createUserMutation.isPending ? 'Creating...' : 'Create User'}
          </Button>
          
          {createUserMutation.error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Error: {(createUserMutation.error as any)?.message || 'Failed to create user'}
            </Alert>
          )}
          {createUserMutation.isSuccess && (
            <Alert severity="success" sx={{ mt: 2 }}>
              User created successfully!
            </Alert>
          )}
        </Paper>

        {/* Infinite Query Example */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h3Bold" sx={{ mb: 2 }}>
            3. Infinite Query (Query.useInfiniteQuery)
          </Typography>
          <Typography variant="bodyRegular" sx={{ mb: 2 }}>
            Posts loaded: {postsInfiniteQuery.data?.pages?.length || 0} pages
          </Typography>
          
          {postsInfiniteQuery.isLoading && <CircularProgress size={24} />}
          {postsInfiniteQuery.error && (
            <Alert severity="error">
              Error: {(postsInfiniteQuery.error as any)?.message || 'Failed to fetch posts'}
            </Alert>
          )}
          
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button 
              onClick={handleLoadMore}
              disabled={!postsInfiniteQuery.hasNextPage || postsInfiniteQuery.isFetchingNextPage}
              variant="outlined"
            >
              {postsInfiniteQuery.isFetchingNextPage ? 'Loading...' : 'Load More Posts'}
            </Button>
          </Stack>
        </Paper>

        {/* Parallel Queries Example */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h3Bold" sx={{ mb: 2 }}>
            4. Parallel Queries (Query.useQueries)
          </Typography>
          <Stack spacing={1}>
            {parallelQueries.map((query, index) => (
              <Typography key={index} variant="bodyLight">
                Query {index + 1}: {query.status} 
                {query.isLoading && ' (loading...)'}
                {query.error && ' (error)'}
                {query.isSuccess && ' (success)'}
              </Typography>
            ))}
          </Stack>
        </Paper>

        {/* Utility Functions Example */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h3Bold" sx={{ mb: 2 }}>
            5. Query Utilities (Query.utils)
          </Typography>
          <Typography variant="bodyRegular" sx={{ mb: 2 }}>
            Utility functions for cache management
          </Typography>
          
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Button 
              onClick={() => Query.utils.invalidate(Query.keys.users())}
              variant="outlined"
            >
              Invalidate Users
            </Button>
            <Button 
              onClick={() => Query.utils.prefetch(Query.keys.posts(), () => apiService.get('/posts'))}
              variant="outlined"
            >
              Prefetch Posts
            </Button>
            <Button 
              onClick={handleClearCache}
              variant="outlined"
              color="warning"
            >
              Clear All Cache
            </Button>
          </Stack>
        </Paper>

        {/* Status Information */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h3Bold" sx={{ mb: 2 }}>
            6. Global Status (Query hooks)
          </Typography>
          <Stack spacing={1}>
            <Typography variant="bodyRegular">
              Is Fetching: {Query.useIsFetching().toString()}
            </Typography>
            <Typography variant="bodyRegular">
              Is Mutating: {Query.useIsMutating().toString()}
            </Typography>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
};