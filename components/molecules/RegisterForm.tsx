"use client";

import React, { useState }  from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginScheme } from "../../schemes/loginScheme";
import Input from "../atoms/Input";
import CustomButton from "../atoms/CustomButton";

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
        text='Registrarse'
        color='bg-danger'
        onClickButton={() => {}}
        typeButton='submit'
      />
    </form>
  );
};

export default RegisterForm;
