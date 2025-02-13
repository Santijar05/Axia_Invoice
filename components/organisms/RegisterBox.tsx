import React from "react";
import RegisterForm from "../molecules/RegisterForm";

const RegisterBox: React.FC = () => {
    return (
        <div className="flex flex-row w-full h-screen text-white p-8">
            <div className="my-2 w-1/2 flex flex-col justify-center bg-cover bg-center p-10 rounded-lg shadow-lg text-transparent" style={{ backgroundImage: "url('/images/logoAxia.jpeg')" }}>
                {/*<h1 className="text-5xl font-bold">AMU</h1>
                <p className="mt-4 text-lg">... Capturing Moments, Creating Memories, AXIA ...</p>*/}
            </div>

            <div className="w-1/2 bg-primary flex flex-col justify-center items-center p-10 rounded-lg">
                <h1 className="text-4xl font-bold mb-6">Create an account</h1>
                <RegisterForm />
            </div>
        </div>
    );
};

export default RegisterBox;