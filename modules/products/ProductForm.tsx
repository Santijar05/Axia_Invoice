import React, { useState } from "react";
import Switch from "react-switch";
import { ProductFormProps } from "@/types/Api";

import Input from "@/components/atoms/Input";
import Dropdown from "@/components/molecules/Dropdown";
import Select from "@/components/atoms/select";

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        setTimeout(() => {
            if (onSuccess) {
                onSuccess();
            }
            
            setIsSubmitting(false);
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

    const proveedores = [
        { value: "ODA8580BDS08", label: "ODA8580BDS08" },
        { value: "ABC1234XYZ56", label: "ABC1234XYZ56" },
        { value: "XYZ9876ABC12", label: "XYZ9876ABC12" },
        { value: "123PQRS456TU", label: "123PQRS456TU" }
      ];

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
                <label className="text-sm font-semibold text-gray-500">Code</label>
                <Input placeholder="AUTOGENERADO" type="text" disable={true} />
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Proveedor</label>
                <Select 
                    className="text-black" 
                    placeholder="Seleccionar proveedor" 
                    options={proveedores} 
                />
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