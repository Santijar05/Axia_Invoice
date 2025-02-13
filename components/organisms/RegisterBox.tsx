import React from "react";
import RegisterForm from "../molecules/RegisterForm";

const RegisterBox: React.FC = () => {
    return (
        <div className="flex flex-col items-center w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-lg font-bold">Welcome to ContaNova</h1>
            <p className="text-gray-500 mb-4">Register</p>
            <RegisterForm />
        </div>
    );
};

export default RegisterBox;