import React from "react";
import Navbar from "@/components/organisms/navBar";
import { HomeFooter } from "@/components/organisms/HomeFooter";
import ContactUs from "@/components/organisms/contactUs";

const ScreenContactUS: React.FC = () => {
  return (
    <div className="w-full bg-black">
        <Navbar/>   
        <ContactUs/>
        <HomeFooter/>
    </div>
  );
};

export default ScreenContactUS;