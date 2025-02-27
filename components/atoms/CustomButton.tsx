import React from "react";

interface CustomButtonProps {
  text: string;
  style?: string;
  typeButton?: "button" | "submit";
  onClickButton?: () => void;
  icon?: React.ElementType; 
  iconColor?: string; 
}

export default function CustomButton({
  text,
  style,
  onClickButton,
  typeButton = "button",
  icon: IconComponent,
  iconColor = "white",
}: CustomButtonProps) {
  return (
    <button
      className={`${style} px-5 py-2 rounded text-center my-2 font-medium flex items-center justify-center gap-2`}
      type={typeButton}
      onClick={onClickButton}
    >
      {IconComponent && <IconComponent className="w-5 h-5" color={iconColor} />}
      {text}
    </button>
  );
}
