import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box } from "@mui/material";
import { createAsyncComponent, LoaderConfigs } from '@/components/AsyncWrapper';

// Dynamic imports for better performance
const SignUpStep1 = createAsyncComponent(
  () => import('@/features/Register/components/SignUpStep1'),
  LoaderConfigs.component
);
const Header = createAsyncComponent(
  () => import('@/features/Register/components/Header'),
  LoaderConfigs.component
);
const AuthRedirect = createAsyncComponent(
  () => import('@/components/AuthRedirect'),
  LoaderConfigs.component
);

// Import SignUpProvider directly as it's a context provider
import { SignUpProvider } from '@/features/Register/context/SignUpContext';

export default function Login() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/auth/register?step=2");
  };

  const handleBack = () => {
    // Could redirect to home or previous page
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Login - Universe Club</title>
      </Head>
      <AuthRedirect>
        <SignUpProvider>
          <Box
            sx={{
              minHeight: "100vh",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Header />
            <SignUpStep1 onNext={handleNext} onBack={handleBack} />
          </Box>
        </SignUpProvider>
      </AuthRedirect>
    </>
  );
}