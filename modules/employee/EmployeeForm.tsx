import React, { useState } from "react";
import Input from "@/components/atoms/Input";

export default function EmployeeForm() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="text-sm font-semibold text-gray-500">Código</label>
                <Input placeholder="AUTOGENERADO" type="text" disable={true} />
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Nombre</label>
                <Input className="text-black" placeholder="Ej. Juan" type="text" disable={false}/>
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Apellido</label>
                <Input className="text-black" placeholder="Ej. Pérez" type="text" />
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Teléfono</label>
                <Input className="text-black" placeholder="Ej. 123456789" type="text" />
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Email</label>
                <Input className="text-black" placeholder="Ej. juan.perez@email.com" type="email" />
            </div>

            <div className="col-span-2">
                <div className="py-2">
                    <label className="text-sm text-gray-500 font-semibold">Image</label>
                    <label className="text-lg text-red-600 font-semibold"> *</label>
                </div>
                <input type="file" onChange={handleImageChange} className="input-file text-gray-400 border p-3 rounded-md border-gray-300" />
            </div>
        </div>
    );
}
