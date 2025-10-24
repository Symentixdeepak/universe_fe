'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import Header from "@/features/Register/components/Header";
import SignUpStep2 from "@/features/Register/components/SignStep2";
import SignUpStep3 from "@/features/Register/components/SignUpStep3";
import { SignUpProvider, useSignUpContext } from "@/features/Register/context/SignUpContext";
import { signupUser } from "@/lib/authApi";
import { useAuth } from "@/contexts/AuthContext";
import { toastService } from "@/lib/toast";

function RegisterPageContent() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { formData, clearFormData } = useSignUpContext();
  const { setTokens, setUser } = useAuth();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && router.isReady) {
      const step = router.query.step;
      const stepNumber = step ? parseInt(step as string, 10) : 2; // Default to step 2 for register

      if (stepNumber >= 2 && stepNumber <= 3) {
        setCurrentStep(stepNumber);
      } else {
        router.replace("/auth/register?step=2");
      }
    }
  }, [router.isReady, router.query.step, router, isMounted]);

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

  const handleSignupComplete = async (step3Data?: any) => {
    if (currentStep === 3) {
      setIsLoading(true);
      
      try {
        // Use passed step3Data if available, otherwise fall back to context
        const step3FormData = step3Data || formData.step3;
        
        // Prepare signup data
        const signupData = {
          email: formData.step2.email,
          password: formData.step2.password,
          password_confirmation: formData.step2.confirmPassword,
          full_name: step3FormData.fullName,
          date_of_birth: step3FormData.dateOfBirth, // Already in YYYY-MM-DD format
          location: step3FormData.location,
          occupation: step3FormData.occupation || '',
        };

        console.log('Signup data:', signupData); // Debug log

        const result = await signupUser(signupData);

        if (result.success && 'data' in result) {
          console.log('Signup successful, saving tokens...'); // Debug log
          
          // Create token data with proper structure
          const tokenData = {
            accessToken: result.data.tokens.accessToken,
            refreshToken: result.data.tokens.refreshToken,
            expiresIn: result.data.tokens.expiresIn,
            issuedAt: Date.now(),
          };
          
          console.log('Token data to save:', tokenData); // Debug log
          
          // Create user object with available fields
          const userData = {
            id: result.data.user.id,
            email: result.data.user.email,
            full_name: result.data.user.full_name || step3FormData.fullName,
            date_of_birth: result.data.user.date_of_birth || step3FormData.dateOfBirth,
            location: result.data.user.location || step3FormData.location,
            occupation: result.data.user.occupation || step3FormData.occupation,
          };
          
          console.log('User data to save:', userData); // Debug log

          // Use AuthContext methods to save tokens and user (this will save to localStorage)
          setTokens(tokenData);
          setUser(userData);

          console.log('Tokens and user saved via AuthContext'); // Debug log

          // Clear form data after successful signup
          clearFormData();

          toastService.success(result.message || 'Registration successful! Welcome to Universe Club!');
          
          // Redirect to interests page
          router.push("/interests");
        } else {
          const error = 'error' in result ? result.error : 'Registration failed';
          toastService.error(error);
          console.error('Signup failed:', result);
        }
      } catch (error) {
        console.error('Signup error:', error);
        toastService.error('An unexpected error occurred. Please try again.');
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
