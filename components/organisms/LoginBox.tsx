import React from "react";
import LoginForm from "../molecules/LoginForm";
import { LoginIcon } from "../atoms/icons";

const LoginBox: React.FC = () => {
    return (
        <div className="flex flex-col items-center w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-lg font-bold">Welcome to ContaNova</h1>
            <p className="text-gray-500 mb-4">Login</p>
            <LoginForm />
        </div>
    );
};

export default LoginBox;