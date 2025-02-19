"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginScheme } from "../../../schemes/loginScheme"; // Ajusta la ruta según la ubicación real
import Input from "../../../components/atoms/Input";
import CustomButton from "../../../components/atoms/CustomButton";
import { AppleIcon, GoogleIcon } from "../../../components/atoms/icons";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginScheme),
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log(data);
  };

  return (
    <>
      <form className="w-full flex flex-col items-center p-6" onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Email" {...register("email")} />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <Input placeholder="Password" type="password" {...register("password")} />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <CustomButton
          text="ENTER THE SYSTEM"
          color="bg-secondary"
          wsize="w-full"
          typeButton="submit"
          onClickButton={() => {}}
        />
      </form>

      <div className="flex justify-between w-full text-sm text-blueP mt-2">
        <a href="#">Create account</a>
        <a href="#">Forgot password?</a>
      </div>

      <div className="relative flex items-center w-full my-4">
        <span className="flex-grow border-t border-gray-300"></span>
        <span className="px-2 text-gray-500 text-sm">or continue with</span>
        <span className="flex-grow border-t border-gray-300"></span>
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
    </>
  );
};

export default LoginForm;
