"use client";

import Link from "next/link";
import Input from "../atoms/Input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../atoms/CustomButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginScheme } from "../../schemes/loginScheme";
import { AppleIcon, GoogleIcon } from "../atoms/icons";

type RegisterFormData = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

const RegisterForm: React.FC = () => {
  const {
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(loginScheme),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Name:", name);
    console.log("Phone number:", phone);
  };

  return (
    <form
      className="w-full flex flex-col items-center p-6"
      onSubmit={handleSubmit}
    >
      <Input
        placeholder="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

      <Input
        placeholder="Phone number"
        type="number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

      <Input
        placeholder="Email"
        type="email"
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
        text='Create account'
        color='bg-secondary'
        wsize='w-1/2'
        onClickButton={() => {}}
        typeButton='submit'
      />

      <div className="justify-center pt-7 flex flex-row gap-2">
        <p className="text-white text-center">Joined us before?</p>
        <Link href="/login" className="text-tertiary">
          Login
        </Link>
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

export default RegisterForm;
