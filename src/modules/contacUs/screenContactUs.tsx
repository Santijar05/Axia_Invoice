import React from "react";

import ContactUs from "@/src/modules/contacUs/contactUs";
import Navbar from "../home/navBar";
import HomeFooter from "@/src/components/organisms/HomeFooter";

const ScreenContactUS: React.FC = () => {
  return (
    <div className="w-full bg-black">
        <Navbar/>   
        <ContactUs/>
        <HomeFooter
          style="bg-black text-white "
        />
    </div>
  );
};

export default ScreenContactUS;