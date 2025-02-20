"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerUser } from "@/lib/api_services";
import { registerScheme } from "@/schemes/registerScheme";
import CustomButton from "../../../components/atoms/CustomButton";
import { AppleIcon, GoogleIcon } from "../../../components/atoms/icons";
import Input from "../../../components/atoms/Input";

type RegisterFormData = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerScheme),
  });

  const onSubmit = async (data: RegisterFormData) => {
    console.log("Submitting form with data:", data);

    try {
      const response = await registerUser({
        email: data.email,
        name: data.name,
        password: data.password,
        phone: data.phone,
      });

      if (response.success) {
        console.log("Register successful:", response);
      } else {
        console.error("Register failed:", response.message);
        alert(`Register failed: ${response.message}`);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <form
      className="w-full flex flex-col items-center p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input placeholder="Name" type="text" {...register("name")} />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}

      <Input
        placeholder="Phone number"
        type="number"
        {...register("phone")}
      />
      {errors.phone && (
        <p className="text-red-500 text-sm">{errors.phone.message}</p>
      )}

      <Input
        placeholder="Email"
        type="email"
        {...register("email")}
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <Input
        placeholder="Password"
        type="password"
        {...register("password")}
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      <CustomButton
        text="Create account"
        color="bg-secondary"
        wsize="w-full"
        onClickButton={() => {}}
        typeButton="submit"
      />

      <div className="justify-center pt-7 flex flex-row gap-2">
        <p className="text-sm text-center">Joined us before?</p>
        <Link href="/login" className="text-tertiary">
          Login
        </Link>
      </div>

      <div className="flex flex-row space-x-5 mt-2">
        <CustomButton
          text="Google"
          icon={GoogleIcon}
          color="bg-secondary"
          wsize="w-11/12"
          onClickButton={() => {}}
          typeButton="button"
        />

        <CustomButton
          text="Apple"
          icon={AppleIcon}
          color="bg-secondary"
          wsize="w-11/12"
          onClickButton={() => {}}
          typeButton="button"
        />
      </div>
    </form>
  );
};

export default RegisterForm;
