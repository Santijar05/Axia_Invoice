"use client";

import React, { forwardRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

type InputProps = {
  placeholder?: string;
  type?: string;
  icon?: React.ElementType;
  disable?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, type = "text", icon: IconComponent, disable = false, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="w-full relative">
        <div className="w-full flex items-center border border-gray-300 rounded-md p-2 focus-within:ring-2 bg-black">
          {IconComponent && <IconComponent className="text-gray-500 mr-2" />}

          <input
            ref={ref}
            type={type === "password" ? (showPassword ? "text" : "password") : type}
            placeholder={placeholder}
            className={`flex-1 outline-none bg-transparent text-white w-full ${
              disable ? "text-gray-500" : ""
            }`}
            disabled={disable}
            {...rest}
          />

          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-gray-500 ml-2"
            >
              {showPassword ? (
                <FaEye color="white" size={20} />
              ) : (
                <FaEyeSlash color="white" size={20} />
              )}
            </button>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
