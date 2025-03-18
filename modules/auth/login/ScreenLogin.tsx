import React from "react";
import Image from 'next/image';
import LoginBox from "./LoginBox";

const ScreenLogin: React.FC = () => {
  return (
    <div 
      className="min-h-screen w-full flex flex-row items-center justify-between p-4" 
      style={{ backgroundImage: "url('/Images/fondoheroo.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
    > 
      <div className="flex-1 flex justify-center items-center">
        <Image
          src="/Images/logo_blanco.png"
          alt="Logo"
          width={150}
          height={80}
        />
      </div>
      <div className="flex-1 flex justify-center items-center ">
        <LoginBox />
      </div>
    </div>
  );
};

export default ScreenLogin;