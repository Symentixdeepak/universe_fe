import { ReactElement } from "react";
import Head from "next/head";
import { ProtectedRoute } from "@/components";
import UserConnector from "@/features/User/UserConnect";

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
