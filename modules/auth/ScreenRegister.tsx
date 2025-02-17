import React from "react";
import RegisterBox from "@/components/organisms/RegisterBox";

const ScreenRegister: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-primary">
      <RegisterBox />
    </div>
  );
};

export default ScreenRegister;