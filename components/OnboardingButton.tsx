import React from 'react';
import { Button } from "@nextui-org/button";
import { HelpCircle } from 'lucide-react';

interface OnboardingButtonProps {
  onShowOnboarding: () => void;
}

const OnboardingButton: React.FC<OnboardingButtonProps> = ({ onShowOnboarding }) => {
  return (
    <Button
      isIconOnly
      color="primary"
      variant="light"
      className="fixed bottom-4 left-4 z-50"
      onClick={onShowOnboarding}
    >
      <HelpCircle size={24} />
    </Button>
  );
};

export default OnboardingButton;