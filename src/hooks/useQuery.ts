import { Query } from '@/lib/react-query';
import { apiService } from '@/lib/api';

// Example interfaces
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: string;
}

interface CreateUserDto {
  name: string;
  email: string;
}

interface UpdateUserDto extends Partial<CreateUserDto> {
  id: number;
}

// ===== QUERY HOOKS =====

/**
 * Fetch all users
 */
export const useUsers = () => {
  return Query.useQuery({
    queryKey: Query.keys.users(),
    queryFn: () => apiService.get<User[]>('/users'),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Fetch a specific user by ID
 */
export const useUser = (userId: string, enabled = true) => {
  return Query.patterns.get(
    Query.keys.user(userId),
    () => apiService.get<User>(`/users/${userId}`),
    {
      enabled: enabled && !!userId,
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );
};

/**
 * Fetch user profile (dependent on user ID)
 */
export const useUserProfile = (userId?: string) => {
  return Query.patterns.dependent(
    Query.keys.userProfile(userId || ''),
    () => apiService.get<User>(`/users/${userId}/profile`),
    !!userId
  );
};

/**
 * Infinite query for posts with pagination
 */
export const usePostsInfinite = (limit = 10) => {
  return Query.useInfiniteQuery({
    queryKey: Query.keys.posts(),
    queryFn: ({ pageParam = 1 }) => 
      apiService.get<{
        data: Post[];
        nextPage?: number;
        hasMore: boolean;
      }>(`/posts?page=${pageParam}&limit=${limit}`),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => lastPage.data.nextPage,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Fetch posts by user ID
 */
export const useUserPosts = (userId: string) => {
  return Query.useQuery({
    queryKey: [...Query.keys.user(userId), 'posts'],
    queryFn: () => apiService.get<Post[]>(`/users/${userId}/posts`),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Search users with debouncing
 */
export const useSearchUsers = (searchTerm: string, enabled = true) => {
  return Query.useQuery({
    queryKey: ['users', 'search', searchTerm],
    queryFn: () => apiService.get<User[]>(`/users/search?q=${encodeURIComponent(searchTerm)}`),
    enabled: enabled && searchTerm.length >= 2,
    staleTime: 30 * 1000, // 30 seconds
  });
};

// ===== MUTATION HOOKS =====

/**
 * Create a new user
 */
export const useCreateUser = () => {
  return Query.useMutation({
    mutationFn: (userData: CreateUserDto) => 
      apiService.post<User>('/users', userData, { showSuccessToast: true }),
    onSuccess: () => {
      // Invalidate users list to refetch
      Query.utils.invalidate(Query.keys.users());
    },
    onError: (error) => {
      console.error('Failed to create user:', error);
    },
  });
};

/**
 * Update an existing user
 */
export const useUpdateUser = () => {
  return Query.useMutation({
    mutationFn: ({ id, ...userData }: UpdateUserDto) => 
      apiService.put<User>(`/users/${id}`, userData, { showSuccessToast: true }),
    onSuccess: (data, variables) => {
      // Update specific user in cache
      Query.utils.setData(Query.keys.user(variables.id.toString()), data.data);
      // Invalidate users list
      Query.utils.invalidate(Query.keys.users());
    },
  });
};

/**
 * Delete a user
 */
export const useDeleteUser = () => {
  return Query.useMutation({
    mutationFn: (userId: string) => 
      apiService.delete(`/users/${userId}`, { showSuccessToast: true }),
    onSuccess: (_, userId) => {
      // Remove user from cache
      Query.utils.remove(Query.keys.user(userId));
      // Invalidate users list
      Query.utils.invalidate(Query.keys.users());
    },
  });
};

/**
 * Upload user avatar
 */
export const useUploadAvatar = () => {
  return Query.useMutation({
    mutationFn: ({ userId, file }: { userId: string; file: File }) => 
      apiService.upload<{ url: string }>(`/users/${userId}/avatar`, file),
    onSuccess: (data, variables) => {
      // Update user data with new avatar URL
      const userData = Query.utils.getData<User>(Query.keys.user(variables.userId));
      if (userData) {
        Query.utils.setData(Query.keys.user(variables.userId), {
          ...userData,
          avatar: data.data.url,
        });
      }
    },
  });
};

// ===== BULK OPERATIONS =====

/**
 * Fetch multiple users by IDs in parallel
 */
export const useUsersParallel = (userIds: string[]) => {
  return Query.useQueries({
    queries: userIds.map(id => ({
      queryKey: Query.keys.user(id),
      queryFn: () => apiService.get<User>(`/users/${id}`),
      staleTime: 10 * 60 * 1000,
    })),
  });
};

/**
 * Bulk delete users
 */
export const useBulkDeleteUsers = () => {
  return Query.useMutation({
    mutationFn: (userIds: string[]) => 
      apiService.post('/users/bulk-delete', { userIds }, { showSuccessToast: true }),
    onSuccess: (_, userIds) => {
      // Remove all deleted users from cache
      userIds.forEach(id => {
        Query.utils.remove(Query.keys.user(id));
      });
      // Invalidate users list
      Query.utils.invalidate(Query.keys.users());
    },
  });
};

// ===== UTILITY HOOKS =====

/**
 * Prefetch user data
 */
export const usePrefetchUser = () => {
  return (userId: string) => {
    Query.utils.prefetch(
      Query.keys.user(userId),
      () => apiService.get<User>(`/users/${userId}`)
    );
  };
};

/**
 * Get cached user data without triggering a fetch
 */
export const useGetCachedUser = (userId: string) => {
  return Query.utils.getData<User>(Query.keys.user(userId));
};

/**
 * Force refresh specific user data
 */
export const useRefreshUser = () => {
  return (userId: string) => {
    Query.utils.refetch(Query.keys.user(userId));
  };
};

// ===== OPTIMISTIC UPDATES EXAMPLE =====

/**
 * Update user with optimistic updates
 */
export const useOptimisticUpdateUser = () => {
  const queryClient = Query.useQueryClient();
  
  return Query.useMutation({
    mutationFn: ({ id, ...userData }: UpdateUserDto) => 
      apiService.put<User>(`/users/${id}`, userData),
    
    // Optimistic update
    onMutate: async (variables) => {
      // Cancel any outgoing refetches
      await Query.utils.cancel(Query.keys.user(variables.id.toString()));
      
      // Snapshot the previous value
      const previousUser = Query.utils.getData<User>(Query.keys.user(variables.id.toString()));
      
      // Optimistically update to the new value
      if (previousUser) {
        Query.utils.setData(Query.keys.user(variables.id.toString()), {
          ...previousUser,
          ...variables
        } as User);
      }
      
      // Return a context object with the snapshotted value
      return { previousUser };
    },
    
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, variables, context) => {
      if (context?.previousUser) {
        Query.utils.setData(Query.keys.user(variables.id.toString()), context.previousUser);
      }
    },
    
    // Always refetch after error or success
    onSettled: (data, error, variables) => {
      Query.utils.invalidate(Query.keys.user(variables.id.toString()));
    },
  });
};