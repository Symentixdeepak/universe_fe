import React from 'react';
import Step from './components/Step';

interface Step9Props {
  onNext: () => void;
  onBack: () => void;
}

const Step9: React.FC<Step9Props> = ({ onNext, onBack }) => {
  return (
    <Step
      stepNumber={9}
      onNext={onNext}
      onBack={onBack}
    />
  );
};

export default Step9;