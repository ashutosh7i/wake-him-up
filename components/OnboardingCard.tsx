import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";

interface OnboardingStep {
  title: string;
  content: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    title: "Welcome to Wake Them Up!",
    content: "This app helps you wake up your partner remotely. Let's go through how it works.",
  },
  {
    title: "Step 1: Configure Settings",
    content: "Click on the Settings button to configure your partner's email and set up the connection.",
  },
  {
    title: "Step 2: Connection Status",
    content: "The status indicator shows your connection with your partner. Green means you're connected and ready to wake them up!",
  },
  {
    title: "Step 3: Wake Up Button",
    content: "Once connected, press the big 'Wake Up' button to send a wake-up call to your partner.",
  },
  {
    title: "Step 4: Chat Feature",
    content: "Use the chat button to send messages, make voice calls, or start a video chat with your partner.",
  },
];

interface OnboardingCardProps {
  onClose: () => void;
}

const OnboardingCard: React.FC<OnboardingCardProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  return (
    <Card className="fixed bottom-16 left-4 w-80 z-50">
      <CardBody>
        <h3 className="text-lg font-bold">{onboardingSteps[currentStep].title}</h3>
        <p>{onboardingSteps[currentStep].content}</p>
      </CardBody>
      <CardFooter className="justify-between">
        <Button size="sm" variant="light" onClick={onClose}>
          Close
        </Button>
        <Button size="sm" color="primary" onClick={handleNext}>
          {currentStep < onboardingSteps.length - 1 ? "Next" : "Finish"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OnboardingCard;