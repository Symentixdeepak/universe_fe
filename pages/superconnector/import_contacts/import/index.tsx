import { ReactElement } from "react";
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
const ImportContact = createAsyncComponent(
  () => import("@/features/SuperConnector/Contacts/Import"),
  LoaderConfigs.page
);
function ImportContacts() {
  console.log('ImportContacts component rendered');
  return (
    <>
      <Head>
        <title>Import Contacts - Universe Club</title>
      </Head>
      <ImportContact />
    </>
  );
}

// Wrap the page with ProtectedRoute and specify allowed roles
(ImportContacts as any).getLayout = function getLayout(
  page: ReactElement
) {
  console.log('getLayout called for make-connection page');
  return (
    <ProtectedRoute
      requireProfileComplete={true}
      allowedRoles={["superconnector"]}
    >
      <LayoutWrapper showIconOnlyNavbar={true}>
        {page}
      </LayoutWrapper>
    </ProtectedRoute>
  );
};

export default ImportContacts;
