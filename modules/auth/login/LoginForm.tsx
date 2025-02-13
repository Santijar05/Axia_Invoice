"use client";

import React, { useState }  from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginScheme } from "../../../schemes/loginScheme";
import Input from "../../../components/atoms/Input";
import CustomButton from "../../../components/atoms/CustomButton";

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
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

      <CustomButton 
        text='ENTER THE SYSTEM'
        color='bg-danger'
        onClickButton={() => {}}
        typeButton='submit'
      />

      <div className="flex justify-between w-full text-sm text-blue-500 mt-2">
        <a href="#">Create account</a>
        <a href="#">Forgot password?</a>
      </div>
    </form>
  );
};

export default LoginForm;
