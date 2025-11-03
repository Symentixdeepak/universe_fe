import { useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useThemeColors } from "@/hooks";
import Loader from "./Loader";
import { canAccessRoute, getRedirectPath } from "@/config/routes";
import { UserRole } from "@/lib/authApi";

interface ProtectedRouteProps {
  children: ReactNode;
  requireProfileComplete?: boolean; // If true, redirects to interests if profile incomplete
  allowedRoles?: UserRole[]; // Optional: Specific roles allowed for this route
}

export default function ProtectedRoute({
  children,
  requireProfileComplete = false,
  allowedRoles,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const themeColors = useThemeColors();

  useEffect(() => {
    if (isLoading) return; // Wait for auth to load

    if (!isAuthenticated) {
      console.log(
        "ProtectedRoute: User not authenticated, redirecting to login"
      );
      router.replace("/auth/login");
      return;
    }

    if (!user) return; // Wait for user data

    // Check if profile completion is required
    if (requireProfileComplete && !user.profileCompleted) {
      console.log(
        "ProtectedRoute: Profile incomplete, redirecting to interests"
      );
      router.replace("/interests");
      return;
    }

    // Check role-based access
    const currentPath = router.pathname;
    const userRole = user.role as UserRole;

    // If specific roles are provided, check against them
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      console.log(
        `ProtectedRoute: User role "${userRole}" not allowed for this route. Allowed roles:`,
        allowedRoles
      );
      // Redirect to appropriate dashboard based on user's role
      const redirectPath = getRedirectPath(userRole, user.profileCompleted);
      console.log(`ProtectedRoute: Redirecting to ${redirectPath}`);
      router.replace(redirectPath);
      return;
    }

    // Check against route configuration
    if (!canAccessRoute(currentPath, userRole)) {
      console.log(
        `ProtectedRoute: User role "${userRole}" cannot access path "${currentPath}"`
      );
      // Redirect to appropriate dashboard based on user's role
      const redirectPath = getRedirectPath(userRole, user.profileCompleted);
      console.log(`ProtectedRoute: Redirecting to ${redirectPath}`);
      router.replace(redirectPath);
      return;
    }

    console.log(
      `ProtectedRoute: User role "${userRole}" has access to path "${currentPath}"`
    );
  }, [isAuthenticated, isLoading, user, router, requireProfileComplete, allowedRoles]);

  // Show loading spinner while checking authentication
  if (isLoading || !isAuthenticated) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          gap: 2,
        }}
      >
        <Loader />
      </Box>
    );
  }

  // If we need profile completion but it's not complete, don't render
  if (requireProfileComplete && user && !user.profileCompleted) {
    return null;
  }

  return <>{children}</>;
}
