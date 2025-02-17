"use client";

import React, { useState }  from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginScheme } from "../../../schemes/loginScheme";
import Input from "../../../components/atoms/Input";
import CustomButton from "../../../components/atoms/CustomButton";
import Image from 'next/image';

type LoginFormData = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const {
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginScheme),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <form
      className="w-full items-center p-6 mt-10"
      onSubmit={handleSubmit}
    >
      <div className="mb-4 w-full">
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <div className="mb-4 w-full">
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

      <div className="mb-4 w-full">
        <CustomButton 
          text='ENTER THE SYSTEM'
          wsize='10px'
          color='bg-danger'
          onClickButton={() => {}}
          typeButton='submit'
        />
      </div>

      <div className="flex justify-between w-full text-sm text-blueP mt-2">
        <a href="#">Create account</a>
        <a href="#">Forgot password?</a>
      </div>

      <div className="relative flex items-center w-full my-4">
        <span className="flex-grow border-t border-gray-300"></span>
        <span className="px-2 text-gray-500 text-sm">or continue with</span>
        <span className="flex-grow border-t border-gray-300"></span>
      </div>

      <div className="btn-wrapper text-center">
        <button className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center hover:font-bold text-xs ease-linear transition-all duration-150" type="button">
          <Image width={50} height={50} alt="..." className="w-5 mr-1" src="https://demos.creative-tim.com/notus-js/assets/img/github.svg" /> Github
        </button>
        <button className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center hover:font-bold text-xs ease-linear transition-all duration-150" type="button" >
          <Image width={50} height={50} alt="..." className="w-5 mr-1" src="/Images/logoapple.com.png" /> Apple
        </button>

      </div>
    </form>
  );
};

export default LoginForm;
