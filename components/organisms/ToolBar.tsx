import React, { useState } from "react";
import { CirclePlus, Printer} from "lucide-react";
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
        <div className="p-4 bg-black shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-homePrimary-200">{title}</h2>

                <div className="flex gap-3">
                    <CustomButton
                        text="Agregar Nuevo/a" 
                        style="px-4 py-2 rounded-lg text-white bg-homePrimary-400 hover:bg-blue-800" 
                        icon={CirclePlus} 
                        onClickButton={() => setIsModalOpen(true)}
                    />

                    <CustomButton 
                        text="Imprimir Reporte" 
                        style="px-4 py-2 rounded-lg text-white bg-homePrimary hover:bg-blue-500" 
                        icon={Printer} 
                    />
                </div>
            </div>

            <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={formTitle}>
                {formComponent} 
            </CustomModal>
        </div>
    );
}
