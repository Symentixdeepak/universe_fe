import { ReactElement } from "react";
import { Box, Typography, Container } from "@mui/material";
import { useUserRole } from "@/hooks";
import { createAsyncComponent, LoaderConfigs } from '@/components/AsyncWrapper';

// Dynamic imports for better performance
const ProtectedRoute = createAsyncComponent(
  () => import("@/components/ProtectedRoute"),
  LoaderConfigs.component
);
const LayoutWrapper = createAsyncComponent(
  () => import("@/components/LayoutWrapper"),
  LoaderConfigs.component
);

/**
 * Superconnector Dashboard Page
 * Only accessible by users with "superconnector" role
 */
function SuperconnectorDashboard() {
  const { role, isSuperconnector } = useUserRole();

  return (
    <LayoutWrapper>
      <div>super</div>
    </LayoutWrapper>
  );
}

// Wrap the page with ProtectedRoute
(SuperconnectorDashboard as any).getLayout = function getLayout(page: ReactElement) {
  return (
    <ProtectedRoute
      requireProfileComplete={true}
      allowedRoles={["superconnector"]}
    >
      {page}
    </ProtectedRoute>
  );
};

export default SuperconnectorDashboard;
