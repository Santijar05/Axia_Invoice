import React from "react";
import Input from "@/components/atoms/Input";

interface SupplierFormProps {
    onSuccess?: () => void;
}  

export default function SupplierForm({onSuccess} : SupplierFormProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="text-sm font-semibold text-gray-500">Código</label>
                <Input placeholder="AUTOGENERADO" type="text" disable={true} />
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Nombre del Proveedor</label>
                <Input className="text-black" placeholder="Ej. Proveedora S.A." type="text" disable={false} />
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">NIT</label>
                <Input className="text-black" placeholder="Ej. 123456789-0" type="text" />
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Teléfono</label>
                <Input className="text-black" placeholder="Ej. 987654321" type="text" />
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Email</label>
                <Input className="text-black" placeholder="Ej. contacto@proveedora.com" type="email" />
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Dirección</label>
                <Input className="text-black" placeholder="Ej. Calle 123 #45-67" type="text" />
            </div>
        </div>
    );
}
