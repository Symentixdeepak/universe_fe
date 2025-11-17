import { ReactElement } from "react";
import Head from "next/head";
import { createAsyncComponent, LoaderConfigs } from "@/components/AsyncWrapper";

// Dynamic imports for better performance
const ProtectedRoute = createAsyncComponent(
  () => import("@/components/ProtectedRoute"),
  LoaderConfigs.component
);
const LayoutWrapper = createAsyncComponent(
  () => import("@/components/LayoutWrapper"),
  LoaderConfigs.component
);
const ContactList = createAsyncComponent(
  () => import("@/features/SuperConnector/Contacts/ContactList/component"),
  LoaderConfigs.component
);

function YourContact() {
  console.log("YourContact component rendered");
  return (
    <>
      <Head>
        <title>Your Contacts - Universe Club</title>
      </Head>
      <ContactList/>
    </>
  );
}

// Wrap the page with ProtectedRoute and specify allowed roles
(YourContact as any).getLayout = function getLayout(page: ReactElement) {
  console.log("getLayout called for make-connection page");
  return (
    <ProtectedRoute
      requireProfileComplete={true}
      allowedRoles={["superconnector"]}
    >
      <LayoutWrapper showIconOnlyNavbar={true}>{page}</LayoutWrapper>
    </ProtectedRoute>
  );
};

export default YourContact;
