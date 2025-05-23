"use client";

import Link from 'next/link';
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
        const responseData = await response.json();
        const userRole = responseData.user?.role;

        // Redirigir según el rol del usuario
        if (userRole === "ADMIN" || userRole === "SUPERADMIN") {
          router.push("/admin");
        } else if (userRole === "USER") {
          router.push("/employee");
        }else {
          router.push("/");
        }
      } else {
        // Manejar respuesta de error
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Error de autenticación");
      }
    } catch (error) {
      console.error(error);
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
            placeholder="Correo electrónico"
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="w-full mb-7">
          <Input
            placeholder="Contraseña"
            type="password"
            {...register("password")}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {errorMessage && (
          <div className="w-full mb-4">
            <p className="text-red-500 text-sm">{errorMessage}</p>
          </div>
        )}

        <div className="w-full">
          <CustomButton 
            text={loading ? "Loading..." : "INGRESAR"}
            style="w-full text-white bg-homePrimary"
            typeButton='submit'
            disabled={loading}
          />
        </div>
      </form> 

      <div className="w-full items-center pl-3 pr-3">
        <div className="flex justify-between w-full text-sm text-white mt-2">
          <Link href="/register">olvidaste tu contraseña?</Link>
        </div>

        <div className="relative flex items-center w-full my-4">
          <span className="flex-grow border-t border-gray-300"></span>
          <span className="px-2 text-white text-sm">o continuar con</span>
          <span className="flex-grow border-t border-gray-300"></span>
        </div>

        <div className="flex flex-row space-x-5 mt-2">
          <CustomButton
            text="Google"
            icon={GoogleIcon}
            style="w-11/12 text-white bg-homePrimary"
            onClickButton={() => {}}
            typeButton="button"
          />

          <CustomButton
            text="Apple"
            icon={AppleIcon}
            style="w-11/12 text-white bg-homePrimary"
            onClickButton={() => {}}
            typeButton="button"
          />
        </div>
      </div>
    </>
  );
};

export default LoginForm;
