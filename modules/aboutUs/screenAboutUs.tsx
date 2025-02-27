import React from "react";
import AboutUs from "@/components/organisms/aboutUs";
import Navbar from "@/components/organisms/navBar";
import { HomeFooter } from "@/components/organisms/HomeFooter";
import MisionVision from "@/components/organisms/misionVision";


const ScreenAboutUS: React.FC = () => {
  return (
    <div className="w-full bg-black">
        <Navbar/>   
        <MisionVision/>
        <AboutUs/>
        <HomeFooter/>
    </div>
  );
};

export default ScreenAboutUS;