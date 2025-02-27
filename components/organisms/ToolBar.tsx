import React, { useState } from "react";
import { CirclePlus, Printer} from "lucide-react";

import SearchBar from "../molecules/SearchBar";
import CustomButton from "../atoms/CustomButton";
import CustomModal from "@/components/organisms/CustomModal";

interface ToolbarProps {
    title: string, 
    formComponent: React.ReactNode,
    formTitle: string,
}

export default function Toolbar({title, formComponent, formTitle}: ToolbarProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-4 bg-white shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">{title}</h2>

                <div className="flex gap-3">
                    <CustomButton
                        text="Agregar Nuevo/a" 
                        style="px-4 py-2 rounded-lg text-white bg-tertiary hover:bg-blue-800" 
                        icon={CirclePlus} 
                        onClickButton={() => setIsModalOpen(true)}
                    />

                    <CustomButton 
                        text="Imprimir Reporte" 
                        style="px-4 py-2 rounded-lg text-white bg-blue-400 hover:bg-blue-500" 
                        icon={Printer} 
                    />
                </div>

            </div>

            <div className="flex justify-between items-center">
                <div className="flex items-center rounded-lg py-1 w-72">
                    <SearchBar/>
                </div>
            </div>

            <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={formTitle}>
                {formComponent} 
            </CustomModal>
        </div>
    );
}
