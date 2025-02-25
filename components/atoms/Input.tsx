import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputProps = {
  placeholder: string;
  type?: string;
  disable?: boolean; 
} 

export default function Input({ 
  placeholder, 
  type, 
  disable = false
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full flex items-center border border-gray-300 rounded px-4 py-2 mb-2">

      <input
        type={type === "password" && !showPassword ? "password" : type}
        placeholder={placeholder}
        className={`flex-1 outline-none bg-transparent text-black ${
          disable ? "input-disable text-gray-500" : ""
        }`}
        disabled={disable}
      />

      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-gray-500 ml-2"
        >
          {showPassword ? (
            <Eye color="black" size={25}/>
          ) : (
            <EyeOff color="black" size={20}/>
          )}
        </button>
      )}
    </div>
  );
}