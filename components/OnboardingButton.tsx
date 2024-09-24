import React from "react";
import { Button } from "@nextui-org/button";
import { HelpCircle } from "lucide-react";

interface OnboardingButtonProps {
  onShowOnboarding: () => void;
}

const OnboardingButton: React.FC<OnboardingButtonProps> = ({
  onShowOnboarding,
}) => {
  return (
    <Button
      isIconOnly
      className="fixed bottom-4 left-4 z-50"
      color="primary"
      variant="light"
      onClick={onShowOnboarding}
    >
      <HelpCircle size={24} />
    </Button>
  );
};

export default OnboardingButton;
