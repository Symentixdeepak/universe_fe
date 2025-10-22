'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
import toast from 'react-hot-toast';
import Header from "@/features/Register/components/Header";
import SignUpStep2 from "@/features/Register/components/SignStep2";
import SignUpStep3 from "@/features/Register/components/SignUpStep3";
import { SignUpProvider, useSignUpContext } from "@/features/Register/context/SignUpContext";
import { signupUser } from "@/lib/authApi";
import { useAuth } from "@/contexts/AuthContext";

function RegisterPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { formData, clearFormData } = useSignUpContext();
  const { setTokens, setUser } = useAuth();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const step = searchParams.get("step");
      const stepNumber = step ? parseInt(step, 10) : 2; // Default to step 2 for register

      if (stepNumber >= 2 && stepNumber <= 3) {
        setCurrentStep(stepNumber);
      } else {
        router.replace("/auth/register?step=2");
      }
    }
  }, [searchParams, router, isMounted]);

  const handleNextStep = () => {
    if (currentStep === 2) {
      router.push("/auth/register?step=3");
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 3) {
      router.push("/auth/register?step=2");
    } else {
      // Go back to login
      router.push("/auth/login");
    }
  };

  const handleSignupComplete = async () => {
    if (currentStep === 3) {
      setIsLoading(true);
      
      try {
        // Prepare signup data
        const signupData = {
          email: formData.step2.email,
          password: formData.step2.password,
          password_confirmation: formData.step2.confirmPassword,
          full_name: formData.step3.fullName,
          date_of_birth: formData.step3.dateOfBirth, // Already in YYYY-MM-DD format
          location: formData.step3.location,
          occupation: formData.step3.occupation || '',
        };

        console.log('Signup data:', signupData); // Debug log

        const result = await signupUser(signupData);

        if (result.success && 'data' in result) {
          // Save tokens and user data
          setTokens({
            accessToken: result.data.tokens.accessToken,
            refreshToken: result.data.tokens.refreshToken,
            expiresIn: result.data.tokens.expiresIn,
            issuedAt: Date.now(),
          });
          
          setUser(result.data.user);

          // Clear form data after successful signup
          clearFormData();

          toast.success('Registration successful! Welcome to Universe Club!');
          
          // Redirect to interests page
          router.push("/interests");
        } else {
          const error = 'error' in result ? result.error : 'Registration failed';
          toast.error(error);
          console.error('Signup failed:', result);
        }
      } catch (error) {
        console.error('Signup error:', error);
        toast.error('An unexpected error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      handleNextStep();
    }
  };

  const renderCurrentStep = () => {
    if (!isMounted || currentStep === null) return null;
    
    switch (currentStep) {
      case 2:
        return <SignUpStep2 onNext={handleSignupComplete} onBack={handlePreviousStep} />;
      case 3:
        return <SignUpStep3 onNext={handleSignupComplete} onBack={handlePreviousStep} isLoading={isLoading} />;
      default:
        return null;
    }
  };

  // Don't render anything until mounted to prevent hydration issues
  if (!isMounted || currentStep === null) {
    return null;
  }

  return (
    <Box sx={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <Header currentStep={currentStep - 1} btnName="Join the UniVerse Club" totalSteps={2} />
      {renderCurrentStep()}
    </Box>
  );
}

export default function RegisterPage() {
  return (
    <SignUpProvider>
      <RegisterPageContent />
    </SignUpProvider>
  );
}
