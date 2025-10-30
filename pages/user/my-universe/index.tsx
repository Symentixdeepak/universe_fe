import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery, useTheme } from '@mui/material';
import Head from "next/head";
import { Loader, ProtectedRoute } from '@/components';
import MyUniverse from '@/features/User/MyUniverse';
import LayoutWrapper from "@/components/LayoutWrapper";

const MyUniverseIndex: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // Only redirect on desktop, not on mobile
    if (!isMobile) {
      router.replace('/user/my-universe/1');
    }
  }, [router, isMobile]);

  // On mobile, show the component without auto-redirect
  if (isMobile) {
    return (
      <ProtectedRoute requireProfileComplete={true}>
        <Head>
          <title>My Universe - Universe Club</title>
        </Head>
        <LayoutWrapper showNavbar={false}>
          <MyUniverse />
        </LayoutWrapper>
      </ProtectedRoute>
    );
  }

  // On desktop, show loader while redirecting
  return (
    <ProtectedRoute requireProfileComplete={true}>
      <Head>
        <title>My Universe - Universe Club</title>
      </Head>
      <LayoutWrapper showNavbar={false}>
         <Loader/>
      </LayoutWrapper>
    </ProtectedRoute>
  );
};

export default MyUniverseIndex;