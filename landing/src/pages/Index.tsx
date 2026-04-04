import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import LearnSection from "@/components/LearnSection";
import ResultsSection from "@/components/ResultsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <AboutSection />
      <div className="h-px mx-auto max-w-3xl bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <ArchitectureSection />
      <LearnSection />
      <ResultsSection />
      <Footer />
    </div>
  );
};

export default Index;
