"use client"

import React, { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputProps = {
  placeholder: string;
  type?: string;
  icon?: React.ElementType;
  disable?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, type = "text", icon: IconComponent, disable = false, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="w-full flex items-center border border-gray-300 rounded px-4 py-2 mb-2">
        {IconComponent && <IconComponent className="text-gray-500 mr-2" />}

        <input
          ref={ref}
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className={`flex-1 outline-none bg-transparent text-white w-full ${
            disable ? "input-disable text-gray-500" : ""
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
              <Eye color="white" size={25} />
            ) : (
              <EyeOff color="white" size={25} />
            )}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;