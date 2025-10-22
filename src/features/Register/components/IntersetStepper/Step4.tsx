import React from 'react';
import Step from './components/Step';

interface Step4Props {
  onNext: () => void;
  onBack: () => void;
}

const Step4: React.FC<Step4Props> = ({ onNext, onBack }) => {
  return (
    <Step
      stepNumber={4}
      onNext={onNext}
      onBack={onBack}
    />
  );
};

export default Step4;