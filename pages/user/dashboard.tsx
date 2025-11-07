import { ReactElement } from "react";
import Head from "next/head";
import { createAsyncComponent, LoaderConfigs } from '@/components/AsyncWrapper';

// Dynamic imports for better performance
const ProtectedRoute = createAsyncComponent(
  () => import("@/components/ProtectedRoute"),
  LoaderConfigs.component
);
const UserConnector = createAsyncComponent(
  () => import("@/features/User/UserConnect"),
  LoaderConfigs.page
);

function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard - Universe Club</title>
      </Head>
      <UserConnector />
    </>
  );
}

// Wrap the page with ProtectedRoute and specify allowed roles
(Dashboard as any).getLayout = function getLayout(page: ReactElement) {
  return (
    <ProtectedRoute requireProfileComplete={true} allowedRoles={["user"]}>
      {page}
    </ProtectedRoute>
  );
};

export default Dashboard;
