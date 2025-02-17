import React from "react";
import LoginForm from "../../../components/molecules/LoginForm";
import Image from "next/image";

const LoginBox: React.FC = () => {
    return (
        <div className="flex flex-col items-center w-full gap-10">
            <Image width={100} height={100} alt="..." className="w-32 h-32 block mb-9|" src="/images/22495.png" />
            <h1 className="text-lg font-semibold text-black mb-9">Welcome to ContaNova</h1>
            <p className="text-gray-500 mb-10">Login</p>
            <LoginForm />
        </div>
    );
};

export default LoginBox;