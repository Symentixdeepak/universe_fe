import Head from 'next/head';
import { createAsyncComponent, LoaderConfigs } from '@/components/AsyncWrapper';

// Dynamic imports for better performance
const SignUpPage = createAsyncComponent(
  () => import('@/features/Register'),
  LoaderConfigs.page
);
const AuthRedirect = createAsyncComponent(
  () => import('@/components/AuthRedirect'),
  LoaderConfigs.component
);

export default function Register() {
  return (
    <>
      <Head>
        <title>Register - Universe Club</title>
      </Head>
      <AuthRedirect>
        <SignUpPage />
      </AuthRedirect>
    </>
  );
}