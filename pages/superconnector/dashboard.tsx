import { ReactElement } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Box, Typography, Container } from "@mui/material";
import { useUserRole } from "@/hooks";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import LayoutWrapper from "@/components/LayoutWrapper";

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
