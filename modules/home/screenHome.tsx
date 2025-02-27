import React from "react";
import Navbar from "@/components/organisms/navBar";
import Hero from "@/components/organisms/hero";
import HeroBlur from "@/components/organisms/heroBlur";
import ContentHero from "@/components/organisms/contentHero";
import { PricingSection } from "@/components/organisms/PricingSection";
import { HomeFooter } from '@/components/organisms/HomeFooter';

const ScreenHome: React.FC = () => {
  return (
    <>
    <div className="bg-black">
      <div className="min-h-screen w-full flex bg-black relative">
        <Navbar />
        <Hero />
      </div>

      <div style={{marginTop: "3px"}}> 
        <HeroBlur />
      </div>

      <div style={{marginTop: "3px"}}> 
        <ContentHero />
      </div>

      <div style={{marginTop: "3px"}}> 
        <PricingSection />
      </div>

      <div style={{marginTop: "3px"}}> 
        <HomeFooter /> 
      </div>
    </div>
    </>
  );
};

export default ScreenHome;