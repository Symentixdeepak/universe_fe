import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { useMediaQuery, useTheme } from "@mui/material";
import Head from "next/head";
import { Loader, ProtectedRoute } from "@/components";
import LayoutWrapper from "@/components/LayoutWrapper";
import MyUniverse from "@/features/User/MyUniverse";

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
