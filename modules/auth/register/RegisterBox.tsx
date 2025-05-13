import React from "react";
import RegisterForm from "./RegisterForm";


const RegisterBox: React.FC = () => {
    return (
        <div className="flex flex-col items-center w-full max-w-md ">
            <h1 className="text-4xl font-bold mb-6">Create an account</h1>
            <RegisterForm/>
        </div>
    );
};

export default RegisterBox;