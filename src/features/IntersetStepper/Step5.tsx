import React from 'react';
import Step from './components/Step';

interface Step5Props {
  onNext: () => void;
  onBack: () => void;
}

const Step5: React.FC<Step5Props> = ({ onNext, onBack }) => {
  return (
    <Step
      stepNumber={5}
      onNext={onNext}
      onBack={onBack}
    />
  );
};

export default Step5;