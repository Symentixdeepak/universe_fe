"use client";

import SignUpPage from "@/features/Register";
import { AuthRedirect } from "@/components";
import Head from "next/head";

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Universe Club - Register</title>
      </Head>
      <AuthRedirect>
        <SignUpPage />
      </AuthRedirect>
    </>
  );
}
