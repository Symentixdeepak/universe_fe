# Query Object Documentation

The `Query` object provides a comprehensive wrapper around TanStack Query functionality, allowing you to use it like `Query.useQuery`, `Query.useMutation`, etc.

## Import

```typescript
import { Query } from '@/lib/react-query';
```

## Core Hooks

### Query.useQuery
Basic data fetching hook.

```typescript
const usersQuery = Query.useQuery({
  queryKey: ['users'],
  queryFn: () => apiService.get('/users'),
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

### Query.useMutation
For creating, updating, or deleting data.

```typescript
const createUserMutation = Query.useMutation({
  mutationFn: (newUser) => apiService.post('/users', newUser),
  onSuccess: () => {
    Query.utils.invalidate(['users']);
  },
});

// Usage
createUserMutation.mutate({ name: 'John', email: 'john@example.com' });
```

### Query.useInfiniteQuery
For pagination and infinite scrolling.

```typescript
const postsInfiniteQuery = Query.useInfiniteQuery({
  queryKey: ['posts'],
  queryFn: ({ pageParam = 1 }) => apiService.get(`/posts?page=${pageParam}`),
  initialPageParam: 1,
  getNextPageParam: (lastPage) => lastPage.data.nextPage,
});

// Load more
postsInfiniteQuery.fetchNextPage();
```

### Query.useQueries
For parallel queries.

```typescript
const parallelQueries = Query.useQueries({
  queries: [
    {
      queryKey: ['users'],
      queryFn: () => apiService.get('/users'),
    },
    {
      queryKey: ['posts'],
      queryFn: () => apiService.get('/posts'),
    },
  ],
});
```

## Utility Functions (Query.utils)

### Invalidate Queries
```typescript
Query.utils.invalidate(['users']); // Invalidate users queries
Query.utils.invalidate(['users', '123']); // Invalidate specific user
```

### Prefetch Data
```typescript
Query.utils.prefetch(['user', '123'], () => apiService.get('/users/123'));
```

### Set/Get Cache Data
```typescript
// Set data
Query.utils.setData(['user', '123'], newUserData);

// Get data
const userData = Query.utils.getData(['user', '123']);
```

### Remove from Cache
```typescript
Query.utils.remove(['user', '123']);
```

### Refetch Queries
```typescript
Query.utils.refetch(['users']);
```

### Clear All Cache
```typescript
Query.utils.clear();
```

## Query Patterns (Query.patterns)

### Basic GET Pattern
```typescript
const userQuery = Query.patterns.get(
  ['user', userId],
  () => apiService.get(`/users/${userId}`),
  { enabled: !!userId }
);
```

### Mutation Pattern
```typescript
const updateUserMutation = Query.patterns.mutate(
  (userData) => apiService.put(`/users/${userData.id}`, userData),
  {
    onSuccess: () => Query.utils.invalidate(['users']),
  }
);
```

### Infinite Pattern
```typescript
const postsInfinite = Query.patterns.infinite(
  ['posts'],
  ({ pageParam = 1 }) => apiService.get(`/posts?page=${pageParam}`)
);
```

### Dependent Pattern
```typescript
const userProfileQuery = Query.patterns.dependent(
  ['user', userId, 'profile'],
  () => apiService.get(`/users/${userId}/profile`),
  !!userId // Only runs if userId exists
);
```

## Query Keys Factory (Query.keys)

Centralized query key management:

```typescript
Query.keys.all // ['api']
Query.keys.users() // ['api', 'users']
Query.keys.user('123') // ['api', 'users', '123']
Query.keys.userProfile('123') // ['api', 'users', '123', 'profile']
Query.keys.posts() // ['api', 'posts']
Query.keys.post('456') // ['api', 'posts', '456']
```

## Status Hooks

### Check Global Fetching Status
```typescript
const isFetching = Query.useIsFetching();
const isMutating = Query.useIsMutating();
const isRestoring = Query.useIsRestoring();
```

### Mutation State
```typescript
const mutationState = Query.useMutationState({
  filters: { mutationKey: ['createUser'] },
});
```

## Advanced Patterns

### Optimistic Updates
```typescript
const updateUserMutation = Query.useMutation({
  mutationFn: (userData) => apiService.put(`/users/${userData.id}`, userData),
  onMutate: async (newUser) => {
    // Cancel outgoing refetches
    await Query.utils.cancel(['user', newUser.id]);
    
    // Snapshot previous value
    const previousUser = Query.utils.getData(['user', newUser.id]);
    
    // Optimistically update
    Query.utils.setData(['user', newUser.id], newUser);
    
    return { previousUser };
  },
  onError: (err, newUser, context) => {
    // Rollback on error
    Query.utils.setData(['user', newUser.id], context.previousUser);
  },
  onSettled: (data, error, variables) => {
    // Always refetch after mutation
    Query.utils.invalidate(['user', variables.id]);
  },
});
```

### Background Refetching
```typescript
const userQuery = Query.useQuery({
  queryKey: ['user', userId],
  queryFn: () => apiService.get(`/users/${userId}`),
  refetchInterval: 30000, // Refetch every 30 seconds
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
});
```

### Error Boundaries with Suspense
```typescript
const userQuery = Query.useSuspenseQuery({
  queryKey: ['user', userId],
  queryFn: () => apiService.get(`/users/${userId}`),
});
```

## Custom Hooks Examples

See `/src/hooks/useQuery.ts` for comprehensive examples of:
- Basic query hooks (`useUsers`, `useUser`)
- Mutation hooks (`useCreateUser`, `useUpdateUser`, `useDeleteUser`)
- Infinite query hooks (`usePostsInfinite`)
- Parallel query hooks (`useUsersParallel`)
- Utility hooks (`usePrefetchUser`, `useRefreshUser`)
- Optimistic update patterns (`useOptimisticUpdateUser`)

## Integration with API Service

The Query object works seamlessly with your API service:

```typescript
import { Query } from '@/lib/react-query';
import { apiService } from '@/lib/api';

// Use with toast notifications
const createUser = Query.useMutation({
  mutationFn: (userData) => apiService.post('/users', userData, { 
    showSuccessToast: true,
    showErrorToast: true 
  }),
});

// File uploads
const uploadAvatar = Query.useMutation({
  mutationFn: ({ userId, file }) => apiService.upload(`/users/${userId}/avatar`, file),
});
```

This approach gives you a centralized, type-safe way to handle all your data fetching needs while maintaining the full power and flexibility of TanStack Query.