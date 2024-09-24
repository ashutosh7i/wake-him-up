import { useState, useEffect } from 'react';
import { Head } from "./head";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import OnboardingCard from "@/components/OnboardingCard";
import OnboardingButton from "@/components/OnboardingButton";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
      localStorage.setItem('hasSeenOnboarding', 'true');
    }
  }, []);

  const handleShowOnboarding = () => {
    setShowOnboarding(true);
  };

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Head />
      <Navbar />
      <main className="flex-grow container mx-auto max-w-7xl px-6 flex flex-col">
        {children}
      </main>
      <Footer />
      {showOnboarding && <OnboardingCard onClose={handleCloseOnboarding} />}
      <OnboardingButton onShowOnboarding={handleShowOnboarding} />
    </div>
  );
}
