import React, { forwardRef, useEffect } from "react";
import Input from "@/components/atoms/Input";

interface CustomerFormProps {
    client?: {    
        id?: string;
        identification: string; 
        firstName: string;
        lastName: string;
        email: string; 
    };
    onClose?: () => void;
}

const CustomerFormView = forwardRef<HTMLFormElement, CustomerFormProps>(({ client, onClose }, ref) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            {client?.id && (
                <div className="col-span-2">
                    <label className="text-sm font-semibold text-gray-500">ID</label>
                    <Input type="text" value={client.id} disabled />
                </div>
            )}

            <div>
                <label className="text-sm font-semibold text-gray-500">Identificación</label>
                <Input type="text" value={client?.identification || "N/A"} disabled />
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Nombre</label>
                <Input type="text" value={client?.firstName || "N/A"} disabled />
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Apellido</label>
                <Input type="text" value={client?.lastName || "N/A"} disabled />
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Email</label>
                <Input type="email" value={client?.email || "N/A"} disabled />
            </div>

            <div className="col-span-2 flex justify-end mt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="border px-4 py-2 rounded-md text-white bg-homePrimary hover:bg-blue-500"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
});

CustomerFormView.displayName = "CustomerFormView";
export default CustomerFormView;
