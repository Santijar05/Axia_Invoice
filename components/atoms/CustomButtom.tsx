import React from "react";

interface CustomButtomProps {
  text: string;
  wsize: string;
  color: string;
  typeButton?: "button" | "submit";
  onClickButton: () => void;
  icon?: React.ElementType; 
  iconColor?: string; 
}

export default function CustomButtom({ text, color, onClickButton, typeButton }: CustomButtomProps) {
    return (
        <button     
            className={"bg-blueP p-2 rounded text-center my-2 text-white font-bold w-full"}
            type={`${typeButton || 'button'}`}
        > 
            { text }
        </button>
    )
}