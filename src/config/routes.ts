import { UserRole } from "@/lib/authApi";

/**
 * Route configuration for role-based access control
 * Define which routes are accessible by which roles
 */

export interface RouteConfig {
  path: string;
  allowedRoles: UserRole[];
  exact?: boolean; // For exact path matching
}

// Define route patterns and their allowed roles
export const ROUTE_CONFIG: RouteConfig[] = [
  // User routes - only accessible by "user" role
  {
    path: "/user",
    allowedRoles: ["user"],
  },
  {
    path: "/user/dashboard",
    allowedRoles: ["user"],
  },
  {
    path: "/user/my-universe",
    allowedRoles: ["user"],
  },
    {
    path: "/user/pending_connections",
    allowedRoles: ["user"],
  },
  // Superconnector routes - only accessible by "superconnector" role
  {
    path: "/superconnector",
    allowedRoles: ["superconnector"],
  },
  {
    path: "/superconnector/dashboard",
    allowedRoles: ["superconnector"],
  },
  
  // Common routes - accessible by both roles
  {
    path: "/interests",
    allowedRoles: ["user", "superconnector"],
  },
  
  // Public routes (handled separately, not in protected routes)
  // /auth/login, /auth/register, /redirect-linkedin
];

// Role-based default redirect paths
export const ROLE_REDIRECT_PATHS: Record<UserRole, string> = {
  user: "/user/dashboard",
  superconnector: "/superconnector/dashboard",
};

// Get default redirect path for incomplete profiles
export const PROFILE_INCOMPLETE_REDIRECT = "/interests";

/**
 * Check if a user with a specific role can access a given path
 */
export function canAccessRoute(path: string, userRole: UserRole): boolean {
  // Find matching route configuration
  const matchingRoute = ROUTE_CONFIG.find((route) => {
    if (route.exact) {
      return path === route.path;
    }
    // Check if path starts with the route path
    return path.startsWith(route.path);
  });

  // If no route config found, assume it's a public route
  if (!matchingRoute) {
    return true;
  }

  // Check if user's role is in the allowed roles
  return matchingRoute.allowedRoles.includes(userRole);
}

/**
 * Get the appropriate redirect path for a user based on their role and profile status
 */
export function getRedirectPath(
  userRole: UserRole,
  profileCompleted: boolean
): string {
  // If profile is not completed, redirect to interests page
  if (!profileCompleted) {
    return PROFILE_INCOMPLETE_REDIRECT;
  }

  // Otherwise, redirect to role-specific dashboard
  return ROLE_REDIRECT_PATHS[userRole];
}
