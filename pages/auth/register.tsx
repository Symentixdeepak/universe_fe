import Head from 'next/head';
import SignUpPage from '@/features/Register';
import { AuthRedirect } from '@/components';

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