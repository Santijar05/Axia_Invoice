import React from "react";
import LoginBox from "../../components/organisms/LoginBox";

const ScreenLogin: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
      <LoginBox />
    </div>
  );
};

export default ScreenLogin;