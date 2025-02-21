import React from "react";
import { ChevronDown } from "lucide-react";

interface Option {
    text: string;
    icon?: React.ReactNode;
}

interface DropdownProps {
    options: Option[];
    selected?: string;
    style?: string;
    onSelect?: (value: string) => void;
    useIconButton?: boolean;
    icon?: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}

export default function Dropdown({ options, selected, style, onSelect, useIconButton = false, icon, isOpen, onToggle }: DropdownProps) {
    const handleSelect = (option: string) => {
        if (onSelect) onSelect(option);
        onToggle(); 
    };

    return (
        <div className="relative">
            <button 
                onClick={onToggle} 
                className={`p-2 rounded-md ${useIconButton ? "" : "flex justify-between items-center w-full border text-black bg-white shadow-sm"}`}
            >
                {useIconButton ? icon : (
                    <>
                        {selected} <ChevronDown className="w-4 h-4" />
                    </>
                )}
            </button>

            {isOpen && (
                <div className={` ${style} absolute mt-2 bg-white border shadow-lg rounded-lg z-50 max-h-32 overflow-y-auto`}>
                    {options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelect(option.text)}
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
