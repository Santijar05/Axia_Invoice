import React, { useState } from "react";
import { PasswordNoVisibleIcon, PasswordVisibleIcon } from "./icons";

type InputProps = {
  placeholder: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ElementType;
};

export default function Input({ 
  placeholder, 
  type = "text", 
  value, 
  onChange, 
  icon: IconComponent 
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-80 flex items-center border border-gray-300 rounded px-4 py-2 mb-2">
      {IconComponent && <IconComponent className="text-gray-500 mr-2" />}
      
      <input
        type={type === "password" && !showPassword ? "password" : "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 outline-none text-black bg-transparent"
      />

      {type === "password" && (
        <button 
          type="button" 
          onClick={() => setShowPassword(!showPassword)}
          className="text-gray-500 ml-2"
        >
          {showPassword ? (
								<PasswordNoVisibleIcon color='black' />
							) : (
								<PasswordVisibleIcon color='black' />
					)}
        </button>
      )}
    </div>
  );
}
