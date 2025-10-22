"use client";

import { Box } from "@mui/material";
import SignUpStep1 from "@/features/Register/components/SignUpStep1";
import { SignUpProvider } from "@/features/Register/context/SignUpContext";
import Header from "@/features/Register/components/Header";
import { AuthRedirect } from "@/components";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function LoginPage() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/auth/register?step=2");
  };

  const handleBack = () => {
    // Could redirect to home or previous page
    window.location.href = "/";
  };

  return (
    <>
 
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
