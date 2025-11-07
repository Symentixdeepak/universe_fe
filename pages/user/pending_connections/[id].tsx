import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from "next/head";
import { createAsyncComponent, LoaderConfigs } from '@/components/AsyncWrapper';

// Dynamic imports for better performance
const ProtectedRoute = createAsyncComponent(
  () => import('@/components/ProtectedRoute'),
  LoaderConfigs.component
);
const LayoutWrapper = createAsyncComponent(
  () => import("@/components/LayoutWrapper"),
  LoaderConfigs.component
);
const MyUniverse = createAsyncComponent(
  () => import('@/features/User/PendingConnections'),
  LoaderConfigs.page
);

interface MyUniversePageProps {
  userId: string;
}

function MyUniversePage({ userId }: MyUniversePageProps) {
  const router = useRouter();
  
  // Handle loading state
  if (router.isFallback) {
    return <div></div>;
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