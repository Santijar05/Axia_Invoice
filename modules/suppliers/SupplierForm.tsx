import React, { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supplierSchema } from "@/schemes/supplierSchema";
import Input from "@/components/atoms/Input";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { createSupplier } from "@/lib/api-suppliers";
import CustomButton from "@/components/atoms/CustomButton";

type SupplierFormData = {
    id: string;
    tenantId: string;
    nit: string;
    name: string;
    phone: string;
    address: string;
};

interface SupplierFormProps {
    onSuccess?: () => void;
    onClose?: () => void;
}

const SupplierForm = forwardRef<HTMLFormElement, SupplierFormProps>(({ onSuccess, onClose }, ref) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SupplierFormData>({
        resolver: zodResolver(supplierSchema),
    });

    const onSubmit = async (data: SupplierFormData) => {
        const authToken = Cookies.get("authToken");
        if (!authToken) {
            console.error("No hay authToken");
            throw new Error("Authentication token is missing");
        }
        
        const decoded: any = jwtDecode(authToken);
        const tenantId = decoded.tenantId;
        
        const formData = {
            ...data,
            tenantId,
            id: "", 
        };
        console.log("Datos enviados:", formData);
        
        try {                
            const response = await createSupplier(formData);
            console.log("Respuesta del servidor:", response);

            if (response.status === 201) {
                const responseData = await response.json();
                alert("Proveedor creado exitosamente");
                console.log("Proveedor creado:", responseData);
                reset();
                onSuccess?.();
                onClose?.();
            } else {
                const errorData = await response.json();
                console.log("Error al crear el proveedor:", errorData);
                alert(errorData.message || "Error al crear el proveedor");
            }
        } catch (error) {
            console.error("Error en onSubmit:", error);
            alert("Error de conexión. Inténtalo nuevamente.");
        }   
    };

    return (
        <form ref={ref} onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
            <div>
                <label className="text-sm font-semibold text-gray-500">Código</label>
                <Input placeholder="AUTOGENERADO" type="text" disabled={true} />
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Nombre del Proveedor</label>
                <Input 
                    className="text-homePrimary-200 bg-transparent" 
                    placeholder="Ej. Proveedora S.A." 
                    type="text" 
                    {...register("name")}
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">NIT</label>
                <Input 
                    className="text-homePrimary-200 bg-transparent" 
                    placeholder="Ej. 123456789-0" 
                    type="text" 
                    {...register("nit")}
                />
                {errors.nit && <p className="text-red-500 text-xs">{errors.nit.message}</p>}
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Teléfono</label>
                <Input 
                    className="text-homePrimary-200 bg-transparent" 
                    placeholder="Ej. 987654321" 
                    type="text" 
                    {...register("phone")}
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
            </div>


            <div>
                <label className="text-sm font-semibold text-gray-500">Dirección</label>
                <Input 
                    className="text-homePrimary-200 bg-transparent" 
                    placeholder="Ej. Calle 123 #45-67" 
                    type="text" 
                    {...register("address")}
                />
                {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
            </div>

            <div className="col-span-2 flex justify-end gap-2 mt-4">
            <div className="col-span-2 flex justify-end gap-2 mt-4">
                <CustomButton text="Cerrar" style="border text-white bg-homePrimary hover:bg-blue-500" typeButton="button" onClickButton={onSuccess}  />
                <CustomButton text={ 'Crear Proveedor'} style="border text-white bg-homePrimary hover:bg-blue-500" typeButton="submit" />
            </div>   
            </div>
        </form>
    );
});

SupplierForm.displayName = "SupplierForm";
export default SupplierForm;