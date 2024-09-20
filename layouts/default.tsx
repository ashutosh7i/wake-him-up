import { Head } from "./head";

import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Head />
      <Navbar />
      <main className="flex-grow container mx-auto max-w-7xl px-6 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}
