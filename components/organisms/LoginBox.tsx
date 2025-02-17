import React from "react";
import LoginForm from "../molecules/LoginForm";

const LoginBox: React.FC = () => {
    return (
        <div className="flex flex-col items-center w-full max-w-md ">
            <h1 className="font-bold" style={{ marginBottom: '5%', fontSize: '250%' }}>Welcome back</h1>
            <LoginForm />
        </div>
    );
};

export default LoginBox;