import React, { forwardRef } from "react";

type SelectProps = {
  options: { value: string; label: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, disabled = false, ...rest }, ref) => {
    return (
      <div className="w-full flex items-center border border-gray-300 rounded px-4 py-2 mb-2 bg-white">
        <select
          ref={ref}
          className={`flex-1 outline-none bg-transparent text-black ${
            disabled ? "text-gray-500 cursor-not-allowed" : "cursor-pointer"
          }`}
          defaultValue="" 
          {...rest}
        >
          <option value="" disabled>
            Selecciona una opción
          </option>

          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-black">
              {option.label}
            </option>
          ))}
          
        </select>
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;
