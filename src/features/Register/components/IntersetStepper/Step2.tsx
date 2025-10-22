import React from 'react';
import Step from './components/Step';

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
}

const Step2: React.FC<Step2Props> = ({ onNext, onBack }) => {
  return (
    <Step
      stepNumber={2}
      onNext={onNext}
      onBack={onBack}
    />
  );
};

export default Step2;