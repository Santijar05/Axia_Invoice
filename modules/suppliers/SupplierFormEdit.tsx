import { useForm } from "react-hook-form";
import React, { forwardRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { SupplierDAO } from "@/types/Api";
import Input from "@/components/atoms/Input";
import { updateSupplier } from "@/lib/api-suppliers";
import { supplierSchema } from "@/schemes/supplierSchema";
import CustomButton from "@/components/atoms/CustomButton";

type SupplierFormData = {
    id: string;
    nit: string;
    name: string;
    phone: string;
    address: string;
};

interface SupplierFormProps {
    supplier?: {
        id: string;
        nit: string;
        name: string;
        phone: string;
        address: string;
    };
    onSuccess?: () => void;
    onClose?: () => void;
}

const SupplierFormEdit = forwardRef<HTMLFormElement, SupplierFormProps>(({ onSuccess, onClose, supplier }, ref) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SupplierFormData>({
        resolver: zodResolver(supplierSchema),
    });

    useEffect(() => {
        if (supplier) {
            reset({
                ...supplier,
            });
        }
    }, [supplier, reset]);

    const onSubmit = async (data: SupplierFormData) => {
    
        if (!supplier?.id) {
            alert("ID de cliente no disponible");
            return;
        }
    
        try {
    
            const requestBody: SupplierDAO = {
                id: supplier.id, 
                nit: data.nit,
                name: data.name,
                phone: data.phone,
                address: data.address,
                tenantId: "",
            };
    
            const response = await updateSupplier(requestBody, supplier.id);
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al actualizar el empleado");
            }
    
            alert("Proveedor actualizado correctamente");
            if (onSuccess) onSuccess();
            
        } catch (error) {
            console.error("Error en onSubmit:", error);
        }
    };

    return (
        <form ref={ref} onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
            <div>
                <label className="text-sm font-semibold text-gray-500">Código</label>
                <Input placeholder="AUTOGENERADO" type="text" disabled={true} {...register("id")}/>
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Nombre del Proveedor</label>
                <Input 
                    placeholder="Ej. Proveedora S.A." 
                    type="text" 
                    {...register("name")}
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">NIT</label>
                <Input  
                    placeholder="Ej. 123456789-0" 
                    type="text" 
                    {...register("nit")}
                />
                {errors.nit && <p className="text-red-500 text-xs">{errors.nit.message}</p>}
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Teléfono</label>
                <Input 
                    placeholder="Ej. 987654321" 
                    type="text" 
                    {...register("phone")}
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
            </div>


            <div>
                <label className="text-sm font-semibold text-gray-500">Dirección</label>
                <Input 
                    placeholder="Ej. Calle 123 #45-67" 
                    type="text" 
                    {...register("address")}
                />
                {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
            </div>

            <div className="col-span-2 flex justify-end gap-2 mt-4">
            <div className="col-span-2 flex justify-end gap-2 mt-4">
                <CustomButton text="Cerrar" style="border text-white bg-homePrimary hover:bg-blue-500" typeButton="button" onClickButton={onSuccess}  />
                <CustomButton text={ 'Actualizar Proveedor'} style="border text-white bg-homePrimary hover:bg-blue-500" typeButton="submit" />
            </div>   
            </div>
        </form>
    );
});

SupplierFormEdit.displayName = "SupplierForm";
export default SupplierFormEdit;