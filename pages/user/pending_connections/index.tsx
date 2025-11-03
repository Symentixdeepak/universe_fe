import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery, useTheme } from '@mui/material';
import Head from "next/head";
import { Loader, ProtectedRoute } from '@/components';
import MyUniverse from '@/features/User/PendingConnections';
import LayoutWrapper from "@/components/LayoutWrapper";

function MyUniverseIndex() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // useEffect(() => {
  //   // Only redirect on desktop, not on mobile
  //   if (!isMobile) {
  //     router.replace('/user/pending_connections/1');
  //   }
  // }, [router, isMobile]);

  // On mobile, show the component without auto-redirect
  // if (isMobile) {
    return (
      <>
        <Head>
        <title>Pending Connections - Universe Club</title>
        </Head>
        <LayoutWrapper showNavbar={false}>
          <MyUniverse />
        </LayoutWrapper>
      </>
    );
  

  // // On desktop, show loader while redirecting
  // return (
  //   <>
  //     <Head>
  //       <title>My Universe - Universe Club</title>
  //     </Head>
  //     <LayoutWrapper showNavbar={false}>
  //        <Loader/>
  //     </LayoutWrapper>
  //   </>
  // );
};

// Wrap the page with ProtectedRoute and specify allowed roles
(MyUniverseIndex as any).getLayout = function getLayout(page: ReactElement) {
  return (
    <ProtectedRoute requireProfileComplete={true} allowedRoles={["user"]}>
      {page}
    </ProtectedRoute>
  );
};

export default MyUniverseIndex;