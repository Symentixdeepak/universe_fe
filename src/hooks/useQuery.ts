import appService from "@/lib/appService";
import {
  MutationOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";

export const useLogoutMutation = (
  tokens: { accessToken: string } | null,
  setTokens: (tokens: any) => void,
  setUser: (user: any) => void
) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      if (!tokens?.accessToken) {
        throw new Error('No authentication token available');
      }

      return await appService({
        method: 'POST',
        url: '/auth/logout',
        headerCred: {
          authorization: `Bearer ${tokens.accessToken}`,
        },
        showSuccessMsg: true,
      });
    },
    onSuccess: () => {
      // Only logout on API success
      // Clear all local data
      setTokens(null);
      setUser(null);
      sessionStorage.removeItem('questionnaire-data');
      
      console.log('Logout successful');
      
      // Redirect to login page
      router.push('/auth/login');
    },
    onError: (error: any) => {
      console.error('Logout API failed:', error);
      // Don't logout user if API fails - keep them logged in
    },
  });
};

// Get User Me hook - fetches current user data
export const useGetUserMe = (token: string | undefined, enabled: boolean) => {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: async () => {
      if (!token) {
        throw new Error('No authentication token available');
      }

      const response = await appService({
        method: 'GET',
        url: '/user/me',
        headerCred: {
          authorization: `Bearer ${token}`,
        },
        showSuccessMsg: false,
      });

      return response;
    },
    enabled: enabled && !!token, // Only fetch when authenticated and token exists
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 1, // Retry once on failure
  });
};

