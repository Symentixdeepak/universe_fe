import { ReactElement } from "react";
import Head from "next/head";
import { ProtectedRoute } from "@/components";
import LayoutWrapper from "@/components/LayoutWrapper";
import MyConnection from "@/features/SuperConnector/MyConnections";

function SuperconnectorConnectionsPage() {
  return (
    <>
      <Head>
        <title>My Connections- Universe Club</title>
      </Head>
      <LayoutWrapper showNavbar={false}>
        <MyConnection />
      </LayoutWrapper>
    </>
  );
}

// Wrap the page with ProtectedRoute and specify allowed roles
(SuperconnectorConnectionsPage as any).getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <ProtectedRoute
      requireProfileComplete={true}
      allowedRoles={["superconnector"]}
    >
      {page}
    </ProtectedRoute>
  );
};

export default SuperconnectorConnectionsPage;
