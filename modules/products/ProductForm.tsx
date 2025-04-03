import React, { useState } from "react";
import Switch from "react-switch";
import { ProductFormProps } from "@/types/Api";

import Input from "@/components/atoms/Input";
import Dropdown from "@/components/molecules/Dropdown";

export default function ProductForm({ onSuccess }: ProductFormProps) {
    const [selectedCategory, setSelectedCategory] = useState("Selecciona una categoría");
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState("Selecciona una marca");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
    const [isVigente, setIsVigente] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    // Función temporal para simular la creación de producto
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulando una llamada API con un retraso
        setTimeout(() => {
            // Si hay un callback onSuccess, lo llamamos
            if (onSuccess) {
                onSuccess();
            }
            
            setIsSubmitting(false);
            // Opcional: mostrar mensaje de éxito
            alert("Producto guardado (simulación)");
        }, 1000);
    };

    const brands = [
        { text: "ABB" }, 
        { text: "SIEMENS" }, 
        { text: "DEAXON" }, 
        { text: "BARATA" }, 
        { text: "FLASH" }
    ];

    const categories = [
        { text: "CRISTO" }, 
        { text: "CASES" }, 
        { text: "AUDIFONOS GAMER JEDEL" }, 
        { text: "MEMORIAS SSD" }, 
        { text: "FUENTE DE PODER" }
    ];

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
                <label className="text-sm font-semibold text-gray-500">Code</label>
                <Input placeholder="AUTOGENERADO" type="text" disable={true} />
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Outside</label>
                <Input className="text-black" placeholder="ODA8580BDS08" type="text" />
            </div>

            <div className="col-span-2">
                <div>
                    <label className="text-sm text-gray-500 font-semibold">Product</label>
                    <label className="text-lg text-red-600 font-semibold"> *</label>
                </div>
                <Input 
                    className="text-black"
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
                    className="text-black"
                    placeholder="0.00" 
                    type="number" 
                />
            </div>

            <div>
                <div>
                    <label className="text-sm text-gray-500 font-semibold">Purchase price</label>
                    <label className="text-lg text-red-600 font-semibold"> *</label>
                </div>
                <Input 
                    className="text-black"
                    placeholder="EJ. 1.00" 
                    type="number" 
                />
            </div>

            <div>
                <div>
                    <label className="text-sm text-gray-500 font-semibold">Sale price</label>
                    <label className="text-lg text-red-600 font-semibold"> *</label>
                </div>
                <Input 
                    className="text-black"
                    placeholder="0.00" 
                    type="number" 
                />
            </div>

            <div>
                <div>
                    <label className="text-sm text-gray-500 font-semibold">Category</label>
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
                    <label className="text-sm text-gray-500 font-semibold py-1">NON-PERISHABLE</label>
                    <Switch checked={isVigente} onChange={setIsVigente} />
                </div>
            </div>

            <div className="col-span-2">
                <div className="py-2">
                    <label className="text-sm text-gray-500 font-semibold">Image</label>
                    <label className="text-lg text-red-600 font-semibold"> *</label>
                </div>
                <input type="file" onChange={handleImageChange} className="input-file text-gray-400 border p-3 rounded-md border-gray-300" />
            </div>

            {/* Botón para enviar el formulario */}
            <div className="col-span-2 flex justify-end mt-4">
                <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
                </button>
            </div>
        </form>
    );
}