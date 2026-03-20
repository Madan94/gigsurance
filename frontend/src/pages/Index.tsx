import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { TrustLogos } from "@/components/landing/TrustLogos";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Coverage } from "@/components/landing/Coverage";
import { Cities } from "@/components/landing/Cities";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <TrustLogos />
      <Features />
      <HowItWorks />
      <Coverage />
      <Cities />
      <Footer />
    </div>
  );
};

export default Index;
