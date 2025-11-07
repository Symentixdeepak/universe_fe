import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { useMediaQuery, useTheme } from "@mui/material";
import Head from "next/head";
import { createAsyncComponent, LoaderConfigs } from '@/components/AsyncWrapper';

// Dynamic imports for better performance
const ProtectedRoute = createAsyncComponent(
  () => import("@/components/ProtectedRoute"),
  LoaderConfigs.component
);
const LayoutWrapper = createAsyncComponent(
  () => import("@/components/LayoutWrapper"),
  LoaderConfigs.component
);
const MyUniverse = createAsyncComponent(
  () => import("@/features/User/MyUniverse"),
  LoaderConfigs.page
);

function MyUniverseIndex() {
  return (
    <>
      <Head>
        <title>My Universe - Universe Club</title>
      </Head>
      <LayoutWrapper showNavbar={false}>
        <MyUniverse />
      </LayoutWrapper>
    </>
  );
}

// Wrap the page with ProtectedRoute and specify allowed roles
(MyUniverseIndex as any).getLayout = function getLayout(page: ReactElement) {
  return (
    <ProtectedRoute requireProfileComplete={true} allowedRoles={["user"]}>
      {page}
    </ProtectedRoute>
  );
};

export default MyUniverseIndex;
