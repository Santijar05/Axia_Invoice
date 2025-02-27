"use client";

import Link from 'next/link';
import Cookies from "js-cookie"; 
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"; 

import { loginUser } from "@/request/access";
import Input from "../../../components/atoms/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginScheme } from "../../../schemes/loginScheme"; 
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

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await loginUser(data);

      if (response.status === 200) {
        const data = await response.json();
        const token = data.token;
        Cookies.set("authToken", token )

        router.push("/");
      }
      
    } catch (error) {
      console.log(error)
      setErrorMessage("Error de conexión. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        className="w-full items-center pl-3 pr-3 mt-12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full mb-3">
          <Input
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="w-full mb-7">
          <Input
            placeholder="Password"
            type="password"
            {...register("password")}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div className="w-full">
          <CustomButton 
            text={loading ? "Loading..." : "ENTER THE SYSTEM"}
            style="w-full text-white bg-secondary"
            onClickButton={() => router.replace("/employee")}
            typeButton='submit'
          />
        </div>
      </form> 

      <div className="w-full items-center pl-3 pr-3">
        <div className="flex justify-between w-full text-sm text-secondary mt-2">
          <Link rel="stylesheet" href="/register"><p>Create account</p></Link>
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
            style="w-11/12 text-white bg-secondary"
            onClickButton={() => {}}
            typeButton="button"
          />

          <CustomButton
            text="Apple"
            icon={AppleIcon}
            style="w-11/12 text-white bg-secondary"
            onClickButton={() => {}}
            typeButton="button"
          />
        </div>
      </div>
    </>
  );
};

export default LoginForm;
