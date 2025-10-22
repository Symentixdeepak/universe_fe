import React from 'react';
import Step from './components/Step';

interface Step8Props {
  onNext: () => void;
  onBack: () => void;
}

const Step8: React.FC<Step8Props> = ({ onNext, onBack }) => {
  return (
    <Step
      stepNumber={8}
      onNext={onNext}
      onBack={onBack}
    />
  );
};

export default Step8;