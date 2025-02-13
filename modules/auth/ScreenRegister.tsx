import React from "react";
import RegisterBox from "@/components/organisms/RegisterBox";

const ScreenRegister: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
      <RegisterBox />
    </div>
  );
};

export default ScreenRegister;