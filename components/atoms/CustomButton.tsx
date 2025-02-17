import React from "react";

interface CustomButtonProps {
  text: string;
  wsize: string;
  color: string;
  typeButton?: "button" | "submit";
  onClickButton: () => void;
  icon?: React.ElementType; 
  iconColor?: string; 
}

export default function CustomButton({
  text,
  wsize,
  color,
  onClickButton,
  typeButton = "button",
  icon: IconComponent,
  iconColor = "white",
}: CustomButtonProps) {
  return (
    <button
      className={`${wsize} ${color} px-5 py-2 rounded text-center my-2 text-white font-medium flex items-center justify-center gap-2`}
      type={typeButton}
      onClick={onClickButton}
    >
      {IconComponent && <IconComponent className="w-5 h-5" color={iconColor} />}
      {text}
    </button>
  );
}
<<<<<<< HEAD
  
export default function CustomButton({ text, color, onClickButton, typeButton }: CustomButtonProps) {
    return (
        <button     
            className={"bg-blueP p-2 rounded text-center my-2 text-white font-bold w-full"}
            type={`${typeButton || 'button'}`}
        > 
            { text }
        </button>
    )
}
=======
>>>>>>> bead380d7d192809122f60ec546937d80d19652e
