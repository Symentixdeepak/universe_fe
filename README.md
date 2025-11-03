# UniVerse Club

A Next.js TypeScript project with role-based access control, Material UI, and React Query.

## Features

- 🔐 **Role-Based Access Control (RBAC)** - Support for multiple user roles (user, superconnector)
- 🎨 **Material UI** - Modern, responsive UI components
- 🔄 **React Query** - Efficient data fetching and caching
- 🛡️ **Protected Routes** - Automatic route protection based on user roles
- 🎭 **Authentication** - Complete auth flow with JWT tokens and refresh tokens
- 📱 **Responsive Design** - Mobile-first approach

## User Roles

The application supports two types of users:

1. **User** - Regular users with access to `/user/*` routes
2. **Superconnector** - Special users with access to `/superconnector/*` routes

For detailed information about role-based access control, see [RBAC_DOCUMENTATION.md](./RBAC_DOCUMENTATION.md).

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
├── pages/                  # Next.js pages
│   ├── user/              # User-specific routes
│   ├── superconnector/    # Superconnector routes
│   ├── auth/              # Authentication pages
│   └── api/               # API routes
├── src/
│   ├── components/        # React components
│   ├── contexts/          # React contexts (Auth, etc.)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities and services
│   ├── config/            # Configuration files
│   └── styles/            # Global styles and themes
└── public/                # Static assets
```

## Role-Based Access Control

### Using the useUserRole Hook

```tsx
import { useUserRole } from "@/hooks";

function MyComponent() {
  const { role, isUser, isSuperconnector } = useUserRole();
  
  if (isUser) {
    return <UserContent />;
  }
  
  if (isSuperconnector) {
    return <SuperconnectorContent />;
  }
}
```

### Protecting Routes

```tsx
// In your page component
PageComponent.getLayout = function getLayout(page: ReactElement) {
  return (
    <ProtectedRoute requireProfileComplete={true} allowedRoles={["user"]}>
      {page}
    </ProtectedRoute>
  );
};
```

See [RBAC_DOCUMENTATION.md](./RBAC_DOCUMENTATION.md) for complete documentation.

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SERVER_URL=your_api_url_here
```

## Documentation

- [RBAC Documentation](./RBAC_DOCUMENTATION.md) - Complete guide to role-based access control
- [Query Usage](./QUERY_USAGE.md) - React Query usage guide

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **UI Library**: Material UI (MUI)
- **State Management**: React Query
- **Authentication**: JWT with refresh tokens
- **Styling**: Emotion (MUI's default)

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

[Your License Here]

