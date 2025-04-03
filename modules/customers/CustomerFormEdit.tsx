import React, { forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customertSchema } from "@/schemes/customerScheme";
import Input from "@/components/atoms/Input";
import Cookies from "js-cookie"; 
import { updateCustomer } from "@/request/users";
import { ClientDAO } from "@/types/Api";
import CustomButton from "@/components/atoms/CustomButton";

type CustomerFormData = {
    id?: string;
    identification: string; 
    firstName: string;
    lastName: string;
    email: string; 
};

interface CustomerFormProps {
    client?: {    
        id?: string;
        identification: string; 
        firstName: string;
        lastName: string;
        email: string; 
    };
    onSuccess?: () => void; 
    onClose?: () => void;
}

const CustomerFormEdit = forwardRef<HTMLFormElement, CustomerFormProps>(({ onSuccess, onClose, client }, ref) => {
    const {
        register,
        handleSubmit,
        reset, 
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<CustomerFormData>({
        resolver: zodResolver(customertSchema),
    });

    useEffect(() => {
        if (client) {
            const formattedIdentification = client.identification.slice(2); 
            setValue('identification', formattedIdentification);
            setValue('firstName', client.firstName);
            setValue('lastName', client.lastName);
            setValue('email', client.email);
            
            if (client.id) {
                setValue('id', client.id);
            }
        } else {
            reset();
        }
    }, [client, reset, setValue]);      

    const onSubmit = async (data: CustomerFormData) => {
        const authToken = Cookies.get("authToken");
    
        if (!client?.id) {
            alert("ID de cliente no disponible");
            return;
        }
    
        try {
            const requestBody: ClientDAO = {
                id: client.id,
                tenantId: "",
                identification: data.identification,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
            };
    
            const response = await updateCustomer(requestBody, client.id);
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al actualizar el cliente");
            }
    
            alert("Cliente actualizado correctamente");
            if (onSuccess) onSuccess();
            
        } catch (error) {
            console.error("Error en onSubmit:", error);
        }
    };
    

    return (
        <form ref={ref} onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4"> 
            {client?.id && (
                <div className="col-span-2">
                    <label className="text-sm font-semibold text-gray-500">ID</label>
                    <Input 
                        value={client.id}
                        type="text" 
                        disabled={true}
                        placeholder="Ej. 123456789"
                    />
                </div>
            )}

            <div>
                <label className="text-sm font-semibold text-gray-500">Identificación*</label>
                <Input 
                    placeholder="Ej. 123456789" 
                    type="text" 
                    {...register("identification")} 
                    disabled={!!client?.id} 
                />
                {errors.identification && <p className="text-red-500 text-xs">{errors.identification.message}</p>}
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Nombre*</label>
                <Input 
                    placeholder="Ej. Juan" 
                    type="text" 
                    {...register("firstName")} 
                />
                {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Apellido*</label>
                <Input 
                    placeholder="Ej. Pérez" 
                    type="text" 
                    {...register("lastName")} 
                />
                {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Email*</label>
                <Input 
                    placeholder="Ej. juan.perez@email.com" 
                    type="email" 
                    {...register("email")} 
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>
            
            <div className="col-span-2 flex justify-end gap-2 mt-4">
                <CustomButton text="Cerrar" style="border text-white bg-homePrimary hover:bg-blue-500" typeButton="button" onClickButton={onSuccess}  />
                <CustomButton text={isSubmitting ? 'Procesando...' : client?.id ? 'Actualizar Cliente' : 'Crear Cliente'} style="border text-white bg-homePrimary hover:bg-blue-500" typeButton="submit" />
            </div>
        </form>
    );
});

CustomerFormEdit.displayName = "CustomerFormEdit";
export default CustomerFormEdit;