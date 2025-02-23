"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../components/atoms/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginScheme } from "../../../schemes/loginScheme"; 
import CustomButton from "../../../components/molecules/CustomButton";
import { AppleIcon, GoogleIcon } from "../../../components/atoms/icons";
import { loginUser } from "@/request/access";

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

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await loginUser(data);

      console.log("Inicio de sesión exitoso:", response);
      
      window.location.href = "/";
    } catch (error) {
      console.log(error)
      setErrorMessage("Error de conexión. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="w-full items-center p-6 mt-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        placeholder="Email"
        {...register("email")}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <Input
        placeholder="Password"
        type="password"
        {...register("password")}
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      
      <CustomButton 
        text={loading ? "Loading..." : "ENTER THE SYSTEM"}
        style="w-full text-white bg-secondary"
        onClickButton={() => {}}
        typeButton='submit'
      />

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
    </form> 
  );
};

export default LoginForm;
