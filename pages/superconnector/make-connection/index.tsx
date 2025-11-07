import { ReactElement } from "react";
import Head from "next/head";
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
const MakeConnection = createAsyncComponent(
  () => import("@/features/SuperConnector/MakeConnection"),
  LoaderConfigs.page
);
function SuperConnectorNewConnection() {
  console.log('SuperConnectorNewConnection component rendered');
  return (
    <>
      <Head>
        <title>Make Connection- Universe Club</title>
      </Head>
      <MakeConnection />
    </>
  );
}

// Wrap the page with ProtectedRoute and specify allowed roles
(SuperConnectorNewConnection as any).getLayout = function getLayout(
  page: ReactElement
) {
  console.log('getLayout called for make-connection page');
  return (
    <ProtectedRoute
      requireProfileComplete={true}
      allowedRoles={["superconnector"]}
    >
      <LayoutWrapper showIconOnlyNavbar={true}>
        {page}
      </LayoutWrapper>
    </ProtectedRoute>
  );
};

export default SuperConnectorNewConnection;
