import * as Dialog from "@radix-ui/react-dialog";
import { ClipboardPenLine } from 'lucide-react';
import React, { useState } from "react";
import Switch from "react-switch";

import Input from "../atoms/Input";
import Dropdown from "../molecules/Dropdown";
import CustomButton from "../molecules/CustomButton";

interface CustomModalProps {
    isOpen: boolean;
    onClose?: () => void;
}
  
export default function CustomModal({ isOpen, onClose }: CustomModalProps) {
    const [selectedCategory, setSelectedCategory] = useState("Selecciona una categoría");
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState("Selecciona una marca");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
    const [isVigente, setIsVigente] = useState(true);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const brands = [
        { text: "ABB" },
        { text: "SIEMENS" },
        { text: "DEAXON"},
        { text: "BARATA"},
        { text: "FLASH"},
    ];

    const categories = [
        { text: "CRISTO" },
        { text: "CASES" },
        { text: "AUDIFONOS GAMER JEDEL"},
        { text: "MEMORIAS SSD"},
        { text: "FUENTE DE PODER"},
    ];

    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose && onClose()}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/30" />
                <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4">
                    <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
                        <div className="flex flex-row gap-x-3">
                            <ClipboardPenLine color="black"/>
                            <Dialog.Title className="text-lg font-bold border-b pb-2 mb-4 text-black">Ingresar Producto</Dialog.Title>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-semibold text-gray-500">Código</label>
                                <Input
                                    placeholder="AUTOGENERADO"
                                    type="text"
                                    disable={true}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-500">Barra</label>
                                <Input
                                    placeholder="ODA8580BDS08"
                                    type="text"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="text-sm font-semibold text-gray-500">Producto *</label>
                                <Input
                                    placeholder="EJ. MOUSE RAZER"
                                    type="text"
                                />
                            </div>
                            <div>
                                <div>
                                    <label className="text-sm text-gray-500 font-semibold">Stock</label>
                                    <label className="text-lg text-red-600 font-semibold"> *</label>
                                </div>
                                <Input
                                    placeholder="0.00"
                                    type="number"
                                />
                            </div>
                            <div>
                                <div>
                                    <label className="text-sm text-gray-500 font-semibold">Precio Compra</label>
                                    <label className="text-lg text-red-600 font-semibold"> *</label>
                                </div>
                                <Input
                                    placeholder="EJ. 1.00"
                                    type="number"
                                />
                            </div>
                            <div>
                                <div>
                                    <label className="text-sm text-gray-500 font-semibold">Precio Venta</label>
                                    <label className="text-lg text-red-600 font-semibold"> *</label>
                                </div>
                                <Input
                                    placeholder="0.00"
                                    type="number"
                                />
                            </div>
                            <div>
                                <div>
                                    <label className="text-sm text-gray-500 font-semibold">Categoría</label>
                                    <label className="text-lg text-red-600 font-semibold"> *</label>
                                </div>
                                <Dropdown
                                    style="w-56"
                                    options={categories}
                                    selected={selectedCategory}
                                    onSelect={setSelectedCategory}
                                    isOpen={isCategoryDropdownOpen}
                                    onToggle={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-500 font-semibold">Brand</label>
                                <Dropdown
                                    style="w-56"
                                    options={brands}
                                    selected={selectedBrand}
                                    onSelect={setSelectedBrand}
                                    isOpen={isBrandDropdownOpen}
                                    onToggle={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}
                                />
                            </div>
                            <div className="pt-6 pl-3">
                                <div className="col-span-2 gap-x-3 flex mt-2">
                                    <label className="text-sm text-gray-500 font-semibold py-1">NO PERECEDERO</label>
                                    <Switch checked={isVigente} onChange={setIsVigente} />
                                </div>    
                            </div>

                            <div className="col-span-2"> 
                                <div className="py-2">
                                    <label className="text-sm text-gray-500 font-semibold">Imagen</label>
                                    <label className="text-lg text-red-600 font-semibold"> *</label>
                                </div>

                                <input type="file" onChange={handleImageChange} className="input-file text-gray-400 border p-3 rounded-md border-gray-300" />
                                
                            </div>

                            <div className="col-span-2 flex justify-end gap-2 mt-4">
                                <CustomButton
                                    text="Cerrar" 
                                    style="border text-gray-500 bg-white hover:bg-gray-300"
                                    typeButton="button"
                                    onClickButton={onClose} 
                                />

                                <CustomButton 
                                    text="Guardar" 
                                    style="border bg-white text-gray-500 hover:bg-gray-300" 
                                    typeButton="submit" 
                                    onClickButton={onClose}
                                />
                            </div>

                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
