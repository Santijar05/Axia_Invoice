"use client";

import React, { useState }  from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginScheme } from "../../../schemes/loginScheme";
import Input from "../../../components/atoms/Input";
import CustomButton from "../../../components/atoms/CustomButton";
import { loginUser } from "@/lib/api_services";

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

      if (!response.success) {
        setErrorMessage(response.message);
        return;
      }

      console.log("Inicio de sesión exitoso:", response);
      
      // Redirigir al dashboard
      window.location.href = "/dashboard";
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
