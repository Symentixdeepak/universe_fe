# Role-Based Access Control (RBAC) Documentation

This application implements a role-based access control system to distinguish between different user types and restrict access to specific routes and features.

## User Roles

The application supports two user roles:

1. **`user`** - Regular users who can access the `/user/*` routes
2. **`superconnector`** - Special users with access to `/superconnector/*` routes

## Implementation Overview

### 1. Type Definitions (`src/lib/authApi.ts`)

```typescript
export type UserRole = "user" | "superconnector";
```

The `User` interface includes a `role` property:
```typescript
export interface User {
  // ... other properties
  role: UserRole;
}
```

### 2. Auth Context (`src/contexts/AuthContext.tsx`)

The AuthContext manages user authentication and stores the user's role globally. The role is:
- Stored in localStorage along with user data
- Accessible throughout the app via the `useAuth()` hook
- Currently defaults to `"user"` until the backend API returns role information

**Future API Integration** (commented code ready):
```typescript
// When API returns role, uncomment:
// role: response.data.user.role || "user",
```

### 3. Route Configuration (`src/config/routes.ts`)

Defines which routes are accessible by which roles:

```typescript
export const ROUTE_CONFIG: RouteConfig[] = [
  // User routes
  { path: "/user", allowedRoles: ["user"] },
  { path: "/user/dashboard", allowedRoles: ["user"] },
  { path: "/user/my-universe", allowedRoles: ["user"] },
  
  // Superconnector routes
  { path: "/superconnector", allowedRoles: ["superconnector"] },
  { path: "/superconnector/dashboard", allowedRoles: ["superconnector"] },
  
  // Common routes
  { path: "/interests", allowedRoles: ["user", "superconnector"] },
];
```

**Helper Functions:**
- `canAccessRoute(path, userRole)` - Check if a user can access a specific path
- `getRedirectPath(userRole, profileCompleted)` - Get appropriate redirect based on role and profile status

### 4. Protected Route Component (`src/components/ProtectedRoute.tsx`)

Wraps pages that require authentication and role-based access control.

**Features:**
- Checks user authentication
- Validates user role against route requirements
- Redirects unauthorized users to their appropriate dashboard
- Supports `allowedRoles` prop for explicit role restrictions

**Usage:**
```tsx
// In a page file
PageComponent.getLayout = function getLayout(page: ReactElement) {
  return (
    <ProtectedRoute requireProfileComplete={true} allowedRoles={["user"]}>
      {page}
    </ProtectedRoute>
  );
};
```

### 5. Auth Redirect Component (`src/components/AuthRedirect.tsx`)

Redirects authenticated users away from public pages (like login/register).

**Features:**
- Checks authentication status
- Redirects to role-specific dashboard
- Considers profile completion status

### 6. useUserRole Hook (`src/hooks/useUserRole.ts`)

Custom hook to access user role globally throughout the app.

**Usage:**
```tsx
import { useUserRole } from "@/hooks";

function MyComponent() {
  const { role, isUser, isSuperconnector } = useUserRole();
  
  if (isUser) {
    return <UserSidebar />;
  }
  
  if (isSuperconnector) {
    return <SuperconnectorSidebar />;
  }
}
```

## Route Structure

```
/user/*                    - User-only routes
  /user/dashboard          - User dashboard
  /user/my-universe        - User universe page
  
/superconnector/*          - Superconnector-only routes
  /superconnector/dashboard - Superconnector dashboard
  
/interests                 - Common route (both roles)
/auth/*                    - Public routes (login, register)
```

## How to Use

### 1. Protecting a Page

Add the `getLayout` function to your page component:

```tsx
// pages/user/dashboard.tsx
import { ReactElement } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function UserDashboard() {
  return <div>User Dashboard</div>;
}

UserDashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <ProtectedRoute requireProfileComplete={true} allowedRoles={["user"]}>
      {page}
    </ProtectedRoute>
  );
};
```

### 2. Role-Based Rendering

Use the `useUserRole` hook to conditionally render components:

```tsx
import { useUserRole } from "@/hooks";

function DynamicSidebar() {
  const { isUser, isSuperconnector } = useUserRole();
  
  if (isUser) {
    return <UserSidebar />;
  }
  
  if (isSuperconnector) {
    return <SuperconnectorSidebar />;
  }
  
  return null;
}
```

### 3. Checking Access Programmatically

```tsx
import { canAccessRoute } from "@/config/routes";
import { useUserRole } from "@/hooks";

function MyComponent() {
  const { role } = useUserRole();
  
  const canAccessUsers = canAccessRoute("/user/dashboard", role);
  
  if (canAccessUsers) {
    // Show user-specific content
  }
}
```

## Future API Integration

When the backend API supports roles, update these locations:

### 1. Remove Default Role Assignment

In `src/contexts/AuthContext.tsx`, uncomment the role from API:

```typescript
// In login function
const userData: User = {
  // ... other fields
  // UNCOMMENT THIS:
  role: response.data.user.role || "user",
  // REMOVE THIS:
  // role: "user" as UserRole,
};
```

### 2. Update API Request Types

In `src/lib/authApi.ts`, uncomment role fields:

```typescript
export interface SignupRequest {
  // ... other fields
  role?: UserRole; // UNCOMMENT THIS
}

export interface LoginRequest {
  // ... other fields
  role?: UserRole; // UNCOMMENT THIS
}
```

## Security Considerations

1. **Backend Validation**: Always validate roles on the backend. Frontend checks are for UX only.
2. **Token Claims**: Roles should be included in JWT tokens for server-side validation.
3. **API Endpoints**: Ensure API endpoints enforce role-based access control.
4. **Route Guards**: All protected routes should use the `ProtectedRoute` component.

## Testing Roles

To test different roles during development, you can manually modify the role in localStorage:

```javascript
// In browser console
const user = JSON.parse(localStorage.getItem('auth-user'));
user.role = 'superconnector'; // or 'user'
localStorage.setItem('auth-user', JSON.stringify(user));
// Refresh the page
```

## Adding New Roles

To add a new role:

1. Update `UserRole` type in `src/lib/authApi.ts`
2. Add routes in `src/config/routes.ts`
3. Add redirect path in `ROLE_REDIRECT_PATHS`
4. Create role-specific pages
5. Update components to handle the new role

## Examples

### Example: Role-Based Dashboard

```tsx
// pages/dashboard.tsx
import { useUserRole } from "@/hooks";

export default function Dashboard() {
  const { isUser, isSuperconnector } = useUserRole();
  
  return (
    <div>
      {isUser && <UserDashboard />}
      {isSuperconnector && <SuperconnectorDashboard />}
    </div>
  );
}
```

### Example: Role-Based Navigation

```tsx
// components/Navigation.tsx
import { useUserRole } from "@/hooks";

export default function Navigation() {
  const { isUser, isSuperconnector } = useUserRole();
  
  return (
    <nav>
      {isUser && (
        <>
          <Link href="/user/dashboard">Dashboard</Link>
          <Link href="/user/my-universe">My Universe</Link>
        </>
      )}
      
      {isSuperconnector && (
        <>
          <Link href="/superconnector/dashboard">Dashboard</Link>
          <Link href="/superconnector/connections">Connections</Link>
        </>
      )}
    </nav>
  );
}
```

## Troubleshooting

### User Can't Access Their Routes

1. Check localStorage for user data: `localStorage.getItem('auth-user')`
2. Verify the user has a valid role
3. Check browser console for ProtectedRoute logs
4. Ensure route is configured in `src/config/routes.ts`

### Redirects Not Working

1. Check profile completion status
2. Verify role-specific redirect paths in `src/config/routes.ts`
3. Check AuthRedirect component logs in console
4. Clear localStorage and login again

### Role Not Updating

1. Logout and login again
2. Clear localStorage: `localStorage.clear()`
3. Check API response includes role field
4. Verify AuthContext is properly saving role
