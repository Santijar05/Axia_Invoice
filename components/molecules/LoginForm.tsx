"use client";

import React, { useState }  from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginScheme } from "../../schemes/loginScheme";
import Input from "../atoms/Input";
import CustomButton from "../atoms/CustomButton";
import { AppleIcon, GoogleIcon } from "../atoms/icons";

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
          text='Create account'
          color='bg-secondary'
          wsize='w-full'
          onClickButton={() => {}}
          typeButton='submit'
        />
      </div>

      <div className="flex justify-between w-full text-sm text-secondary mt-2">
        <a href="/register">Create account</a>
        <a href="#">Forgot password?</a>
      </div>

      <div className="relative flex items-center w-full my-4">
        <span className="flex-grow border-t border-gray-300"></span>
        <span className="px-2 text-gray-500 text-sm">or continue with</span>
        <span className="flex-grow border-t border-gray-300"></span>
      </div>

      <div className="flex flex-row space-x-5 mt-2">
        <CustomButton 
          text='Google'
          icon={GoogleIcon}
          color='bg-secondary'
          wsize='w-11/12'
          onClickButton={() => {}}
          typeButton='submit'
        />
      
        <CustomButton 
          text='Apple'
          icon={AppleIcon}
          color='bg-secondary'
          wsize='w-11/12'
          onClickButton={() => {}}
          typeButton='submit'
        />
      </div>
    </form>
  );
};

export default LoginForm;
