import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the signup form data interfaces
export interface Step1Data {
  email: string;
  loginMethod: 'email' | 'linkedin' | null;
}

export interface Step2Data {
  email: string;
  password: string;
  confirmPassword: string;
  signupMethod: 'email' | 'linkedin' | null;
}

export interface Step3Data {
  fullName: string;
  dateOfBirth: string;
  location: string;
  occupation: string;
}

export interface SignUpFormData {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
}

interface SignUpContextType {
  formData: SignUpFormData;
  updateStep1: (data: Partial<Step1Data>) => void;
  updateStep2: (data: Partial<Step2Data>) => void;
  updateStep3: (data: Partial<Step3Data>) => void;
  resetForm: () => void;
  clearFormData: () => void;
  getCurrentStep: () => number;
  isStepValid: (step: number) => boolean;
}

const initialFormData: SignUpFormData = {
  step1: {
    email: '',
    loginMethod: null,
  },
  step2: {
    email: '',
    password: '',
    confirmPassword: '',
    signupMethod: null,
  },
  step3: {
    fullName: '',
    dateOfBirth: '',
    location: '',
    occupation: '',
  },
};

const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

export const useSignUpContext = () => {
  const context = useContext(SignUpContext);
  if (context === undefined) {
    throw new Error('useSignUpContext must be used within a SignUpProvider');
  }
  return context;
};

interface SignUpProviderProps {
  children: ReactNode;
}

export const SignUpProvider: React.FC<SignUpProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<SignUpFormData>(initialFormData);

  const updateStep1 = (data: Partial<Step1Data>) => {
    setFormData(prev => ({
      ...prev,
      step1: { ...prev.step1, ...data }
    }));
  };

  const updateStep2 = (data: Partial<Step2Data>) => {
    setFormData(prev => ({
      ...prev,
      step2: { ...prev.step2, ...data }
    }));
  };

  const updateStep3 = (data: Partial<Step3Data>) => {
    setFormData(prev => ({
      ...prev,
      step3: { ...prev.step3, ...data }
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const clearFormData = () => {
    setFormData(initialFormData);
  };

  const getCurrentStep = (): number => {
    // Logic to determine current step based on form completion
    if (!formData.step1.email) return 1;
    if (!formData.step2.password) return 2;
    if (!formData.step3.fullName) return 3;
    return 3; // All steps completed
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!formData.step1.email && !!formData.step1.loginMethod;
      case 2:
        return !!formData.step2.email && 
               !!formData.step2.password && 
               !!formData.step2.confirmPassword &&
               formData.step2.password === formData.step2.confirmPassword;
      case 3:
        return !!formData.step3.fullName && 
               !!formData.step3.dateOfBirth && 
               !!formData.step3.location;
      default:
        return false;
    }
  };

  const value: SignUpContextType = {
    formData,
    updateStep1,
    updateStep2,
    updateStep3,
    resetForm,
    clearFormData,
    getCurrentStep,
    isStepValid,
  };

  return (
    <SignUpContext.Provider value={value}>
      {children}
    </SignUpContext.Provider>
  );
};