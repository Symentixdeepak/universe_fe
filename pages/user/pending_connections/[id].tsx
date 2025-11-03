import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from "next/head";
import { ProtectedRoute } from '@/components';
import LayoutWrapper from "@/components/LayoutWrapper";
import MyUniverse from '@/features/User/PendingConnections';

interface MyUniversePageProps {
  userId: string;
}

function MyUniversePage({ userId }: MyUniversePageProps) {
  const router = useRouter();
  
  // Handle loading state
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Pending Connections - Universe Club</title>
      </Head>
      <LayoutWrapper showNavbar={false}>
        <MyUniverse selectedUserId={userId} />
      </LayoutWrapper>
    </>
  );
}

// Wrap the page with ProtectedRoute and specify allowed roles
(MyUniversePage as any).getLayout = function getLayout(page: ReactElement) {
  return (
    <ProtectedRoute requireProfileComplete={true} allowedRoles={["user"]}>
      {page}
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