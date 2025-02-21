import React from "react";
import { Menu } from "lucide-react";

interface Option {
    text: string;
    icon: React.ReactNode;
}
  
interface DropdownMenuProps {
    options: Option[];
    isOpen: boolean;
    onToggle: () => void;
}

export default function DropdownMenu({ options, isOpen, onToggle }: DropdownMenuProps) {
    return (
        <div className="relative">
            <button onClick={onToggle} className="p-2 rounded-md">
                <Menu color="black" size={25}/>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded-lg z-50">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            className="flex items-center w-full text-left p-2 hover:bg-gray-100 text-black"
                        >
                            {option.icon}
                            <span className="ml-2">{option.text}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
