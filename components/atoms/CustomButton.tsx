import React from "react";

interface CustomButtonProps {
  text: string;
  wsize?: string;
  color: string;
  typeButton?: "button" | "submit";
  onClickButton: () => void;
  icon?: React.ElementType; 
  disabled?: boolean;
  iconColor?: string; 
}

export default function CustomButton({
  text,
  wsize,
  color,
  onClickButton,
  typeButton = "button",
  icon: IconComponent,
  disabled = false,
  iconColor = "white",
}: CustomButtonProps) {
  return (
    <button
      className={`${wsize} ${color} px-5 py-2 rounded text-center my-2 text-white font-medium flex items-center justify-center gap-2 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
      type={typeButton}
      onClick={onClickButton}
    >
      {IconComponent && <IconComponent className="w-5 h-5" color={iconColor} />}
      {text}
    </button>
  );
}