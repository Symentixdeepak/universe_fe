import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from "next/head";
import { ProtectedRoute } from '@/components';
import MyUniverse from '@/features/User/MyUniverse';
import LayoutWrapper from "@/components/LayoutWrapper";

interface MyUniversePageProps {
  userId: string;
}

const MyUniversePage: React.FC<MyUniversePageProps> = ({ userId }) => {
  const router = useRouter();
  
  // Handle loading state
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute requireProfileComplete={true}>
      <Head>
        <title>My Universe - Universe Club</title>
      </Head>
      <LayoutWrapper showNavbar={false}>
        <MyUniverse selectedUserId={userId} />
      </LayoutWrapper>
    </ProtectedRoute>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  
  // You can add validation here if needed
  if (!id || typeof id !== 'string') {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      userId: id,
    },
  };
};

export default MyUniversePage;