import React, { forwardRef, useState } from "react";
import { PasswordNoVisibleIcon, PasswordVisibleIcon } from "./icons";

type InputProps = {
  placeholder: string;
  type?: string;
  icon?: React.ElementType;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, type = "text", icon: IconComponent, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="w-full flex items-center border border-gray-300 rounded px-4 py-2 mb-2">
        {IconComponent && <IconComponent className="text-gray-500 mr-2" />}
        
        <input
          ref={ref}
          type={type === "password" && !showPassword ? "password" : "text"}
          placeholder={placeholder}
          className="flex-1 outline-none text-black bg-transparent"
          {...rest}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500 ml-2"
          >
            {showPassword ? (
              <PasswordNoVisibleIcon color="white" />
            ) : (
              <PasswordVisibleIcon color="white" />
            )}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
