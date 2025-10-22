import React from 'react';
import Step from './components/Step';

interface Step1Props {
  onNext: () => void;
  onBack: () => void;
}

const Step1: React.FC<Step1Props> = ({ onNext, onBack }) => {
  return (
    <Step
      stepNumber={1}
      onNext={onNext}
      onBack={onBack}
    />
  );
};

export default Step1;