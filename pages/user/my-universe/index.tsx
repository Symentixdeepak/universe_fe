import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";
import { Loader, ProtectedRoute } from '@/components';
import LayoutWrapper from "@/components/LayoutWrapper";

const MyUniverseIndex: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the first user's profile by default
    router.replace('/user/my-universe/1');
  }, [router]);

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