"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerUser } from "@/lib/api_services";
import Input from "../../../components/atoms/Input";
import { registerScheme } from "@/schemes/registerScheme";
import CustomButton from "../../../components/atoms/CustomButton";
import { AppleIcon, GoogleIcon } from "../../../components/atoms/icons";
import Select from "@/components/atoms/select";

type RegisterFormData = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

const RegisterForm: React.FC = () => {
  const router = useRouter();

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
    <>
    <form
      className="w-full flex flex-col items-center pl-3 pr-3"
      onSubmit={handleSubmit(onSubmit)}
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
            { value: "admin", label: "Administrador" },
            { value: "user", label: "Usuario" },
            { value: "guest", label: "Invitado" },
          ]}
          disabled={false}
        />
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

      <div className="w-full ">
        <CustomButton
          text="Create account"
          style="w-full text-white bg-secondary"
          onClickButton={() => router.replace("/admin")}
          typeButton="submit"
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
