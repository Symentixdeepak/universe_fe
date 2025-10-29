import Head from "next/head";
import { ProtectedRoute } from "@/components";
import UserConnector from "@/features/User/UserConnect";

export default function Dashboard() {
  return (
    <ProtectedRoute requireProfileComplete={true}>
      <Head>
        <title>Dashboard - Universe Club</title>
      </Head>
      <UserConnector />
    </ProtectedRoute>
  );
}
