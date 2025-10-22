import React from 'react';
import Step from './components/Step';

interface Step10Props {
  onNext: () => void;
  onBack: () => void;
}

const Step10: React.FC<Step10Props> = ({ onNext, onBack }) => {
  return (
    <Step
      stepNumber={10}
      onNext={onNext}
      onBack={onBack}
    />
  );
};

export default Step10;