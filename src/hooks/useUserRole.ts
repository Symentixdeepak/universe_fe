import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/authApi";

/**
 * Custom hook to access user role globally
 * This makes it easy to conditionally render components based on user role
 * 
 * @example
 * ```tsx
 * const { role, isUser, isSuperconnector } = useUserRole();
 * 
 * if (isUser) {
 *   return <UserSidebar />;
 * }
 * 
 * if (isSuperconnector) {
 *   return <SuperconnectorSidebar />;
 * }
 * ```
 */
export function useUserRole() {
  const { user, isAuthenticated, isLoading } = useAuth();

  const role: UserRole | null = user?.role || null;
  const isUser = role === "user";
  const isSuperconnector = role === "superconnector";

  return {
    role,
    isUser,
    isSuperconnector,
    isAuthenticated,
    isLoading,
    user,
  };
}
