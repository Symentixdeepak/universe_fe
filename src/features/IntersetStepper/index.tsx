import React from 'react';
import { Box } from '@mui/material';
import { InterestStepperProvider, useInterestStepperContext } from './context/InterestStepperContext';

// Import all step components
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';
import Step8 from './Step8';
import Step9 from './Step9';
import Step10 from './Step10';
import Step11 from './Step11';
import Header from '../Register/components/Header';

// Internal component that uses the context
const InterestStepperContent: React.FC = () => {
  const { data, setCurrentStep, getNextStep, getPreviousStep, submitQuestionnaire } = useInterestStepperContext();

  const handleNext = () => {
    const nextStep = getNextStep();
    if (nextStep) {
      setCurrentStep(nextStep);
    } else {
      // Last step completed - submit questionnaire
      submitQuestionnaire();
    }
  };

  const handleBack = () => {
    const prevStep = getPreviousStep();
    if (prevStep) {
      setCurrentStep(prevStep);
    }
  };

  const renderCurrentStep = () => {
    // If completed, show completion message or redirect


    switch (data.currentStep) {
      case 1:
        return <Step1 onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <Step2 onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <Step3 onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <Step4 onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <Step5 onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <Step6 onNext={handleNext} onBack={handleBack} />;
      case 7:
        return <Step7 onNext={handleNext} onBack={handleBack} />;
      case 8:
        return <Step8 onNext={handleNext} onBack={handleBack} />;
      case 9:
        return <Step9 onNext={handleNext} onBack={handleBack} />;
      case 10:
        return <Step10 onNext={handleNext} onBack={handleBack} />;
      case 11:
        return <Step11 onNext={handleNext} onBack={handleBack} />;
      default:
        return <Step1 onNext={handleNext} onBack={handleBack} />;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >     
      <Header />
      <Box
        sx={{
          minHeight: { xs: "calc(100vh - 56px)", md: "100vh" },
          mt: { xs: "56px", md: 0 },
        }}
      >
        {renderCurrentStep()}
      </Box>
    </Box>
  );
};

// Main exported component with provider
const InterestStepper: React.FC = () => {
  return (
    <InterestStepperProvider>
      <InterestStepperContent />
    </InterestStepperProvider>
  );
};

export default InterestStepper;