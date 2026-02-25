import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Benefits from "@/components/Benefits";
import Services from "@/components/Services";
import Instructors from "@/components/Instructors";
import Schedule from "@/components/Schedule";
import Pricing from "@/components/Pricing";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import SEO from "@/components/SEO";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen">
      <SEO />
      {isLoading && <PageLoader onLoadComplete={handleLoadComplete} />}
      
      <div className={`transition-all duration-700 ${isLoading ? "opacity-0" : "opacity-100"}`}>
        <Header />
        <Hero />
        <About />
        <Benefits />
        <Services />
        <Instructors />
        <Schedule />
        <Pricing />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
