import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FieldMapping {
  name: string;
  organization: string;
  designation: string;
  email: string;
  phoneNumber: string;
  linkedinHandle: string;
  notes: string;
}

interface ImportContextType {
  currentStep: number;
  selectedFile: File | null;
  progress: number;
  fieldMapping: FieldMapping;
  availableHeaders: string[];
  isProcessing: boolean;
  setCurrentStep: (step: number) => void;
  setSelectedFile: (file: File | null) => void;
  setProgress: (progress: number) => void;
  setFieldMapping: (mapping: FieldMapping) => void;
  setAvailableHeaders: (headers: string[]) => void;
  setIsProcessing: (processing: boolean) => void;
  handleFileSelect: (file: File) => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleSaveMapping: () => void;
  resetImport: () => void;
}

const ImportContext = createContext<ImportContextType | undefined>(undefined);

export const useImportContext = () => {
  const context = useContext(ImportContext);
  if (!context) {
    throw new Error('useImportContext must be used within ImportProvider');
  }
  return context;
};

interface ImportProviderProps {
  children: ReactNode;
}

export const ImportProvider: React.FC<ImportProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [availableHeaders, setAvailableHeaders] = useState<string[]>([]);
  const [fieldMapping, setFieldMapping] = useState<FieldMapping>({
    name: '',
    organization: '',
    designation: '',
    email: '',
    phoneNumber: '',
    linkedinHandle: '',
    notes: '',
  });

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setCurrentStep(2);
    simulateProgress();
  };

  const simulateProgress = () => {
    setIsProcessing(true);
    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += 10;
      setProgress(progressValue);

      if (progressValue >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsProcessing(false);
          setCurrentStep(3);
        }, 500);
      }
    }, 300);
  };

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveMapping = () => {
    // TODO: Implement API call to save field mapping
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(5); // Move to success step
    }, 2000);
  };

  const resetImport = () => {
    setCurrentStep(1);
    setSelectedFile(null);
    setProgress(0);
    setIsProcessing(false);
    setAvailableHeaders([]);
    setFieldMapping({
      name: '',
      organization: '',
      designation: '',
      email: '',
      phoneNumber: '',
      linkedinHandle: '',
      notes: '',
    });
  };

  const value: ImportContextType = {
    currentStep,
    selectedFile,
    progress,
    fieldMapping,
    availableHeaders,
    isProcessing,
    setCurrentStep,
    setSelectedFile,
    setProgress,
    setFieldMapping,
    setAvailableHeaders,
    setIsProcessing,
    handleFileSelect,
    handleNextStep,
    handlePreviousStep,
    handleSaveMapping,
    resetImport,
  };

  return (
    <ImportContext.Provider value={value}>{children}</ImportContext.Provider>
  );
};
