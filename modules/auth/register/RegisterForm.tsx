"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerUser } from "@/request/access";
import Input from "../../../components/atoms/Input";
import { registerScheme } from "@/schemes/registerScheme";
import CustomButton from "../../../components/atoms/CustomButton";
import { AppleIcon, GoogleIcon } from "../../../components/atoms/icons";
import Select from "@/components/atoms/select";

type RegisterFormData = {
  name: string;
  role: string;
  email: string;
  password: string;
};

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerScheme),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      console.log("Iniciando petición al servidor...");
      const response = await registerUser(data);
      console.log("Respuesta recibida:", response.status);

      if (response.status === 201) {
        const responseData = await response.json();
        console.log("Registro exitoso:", responseData);
        router.push("/login");
      } else {
        const errorData = await response.json().catch(() => ({
          message: "Error desconocido en el servidor"
        }));
        console.error("Registro fallido:", errorData);
        setSubmitError(errorData.message || response.statusText);
      }
    } catch (error) {
      console.error("Error inesperado:", error);
      setSubmitError("Ocurrió un error inesperado. Por favor intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = (errors: any) => {
    console.error("Errores de validación:", errors);
  };

  return (
    <>
      <form
        className="w-full flex flex-col items-center pl-3 pr-3"
        onSubmit={(e) => {
          console.log("Evento submit del formulario");
          e.preventDefault();
          handleSubmit(onSubmit, onError)();
        }}
        noValidate
      >
        <div className="w-full mb-3">
          <Input placeholder="Name" type="text" {...register("name")} />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="w-full mb-3">
          <Select
            options={[
              { value: "ADMIN", label: "Administrador" },
              { value: "USER", label: "Usuario" },
              { value: "EDITOR", label: "Invitado" },
            ]}
            disabled={false}
            {...register("role")}
          />
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>

        <div className="w-full mb-3">
          <Input
            placeholder="Email"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="w-full mb-3">
          <Input
            placeholder="Password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {submitError && (
          <div className="w-full mb-3">
            <p className="text-red-500 text-sm">{submitError}</p>
          </div>
        )}

        <div className="w-full">
          <CustomButton
            text={isSubmitting ? "Enviando..." : "Create account"}
            style="w-full text-white bg-secondary"
            typeButton="submit"
            disabled={isSubmitting}
          />
        </div>
      </form>

      <div className="w-full items-center pl-3 pr-3">
        <div className="justify-center pt-7 flex flex-row gap-2">
          <p className="text-sm text-center">Joined us before?</p>
          <Link href="/login" className="text-secondary">
            <p className="text-sm text-center">
              Login
            </p>
          </Link>
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

export default RegisterForm;