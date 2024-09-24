import { useState } from 'react';
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

  const handleShowOnboarding = () => {
    setShowOnboarding(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Head />
      <Navbar />
      <main className="flex-grow container mx-auto max-w-7xl px-6 flex flex-col">
        {children}
      </main>
      <Footer />
      {showOnboarding && <OnboardingCard />}
      <OnboardingButton onShowOnboarding={handleShowOnboarding} />
    </div>
  );
}
