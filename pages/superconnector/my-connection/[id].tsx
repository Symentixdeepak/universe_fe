import { ReactElement } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { ProtectedRoute } from "@/components";
import LayoutWrapper from "@/components/LayoutWrapper";
import MyConnection from "@/features/SuperConnector/MyConnections";

function SuperconnectorConnectionDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Connection Details - Universe Club</title>
      </Head>
      <LayoutWrapper showNavbar={false}>
        <MyConnection selectedUserId={id as string} />
      </LayoutWrapper>
    </>
  );
}

// Wrap the page with ProtectedRoute and specify allowed roles
(SuperconnectorConnectionDetailPage as any).getLayout = function getLayout(
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

export default SuperconnectorConnectionDetailPage;