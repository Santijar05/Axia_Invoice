import React, { forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customertSchema } from "@/schemes/customerScheme";
import Input from "@/components/atoms/Input";
import Cookies from "js-cookie"; 
import { updateCustomer } from "@/request/users";
import { ClientDAO } from "@/types/Api";

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
            setValue('identification', client.identification);
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
        if (!authToken) {
            alert("Token de autenticación no encontrado");
            return;
        }
    
        if (!client?.id) {
            alert("ID de cliente no disponible");
            return;
        }
    
        try {
            const tenantId = ''
    
            const requestBody: ClientDAO = {
                id: client.id, 
                tenantId,     
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
            
            <div className="col-span-2 flex justify-between mt-4">
                <button
                    type="button"
                    onClick={() => {
                        if (onClose) onClose();
                        if (onSuccess) onSuccess();
                    }}
                    className="border px-4 rounded-md ext-white bg-homePrimary border text-white bg-homePrimary hover:bg-blue-500"
                    disabled={isSubmitting}
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md border text-white bg-homePrimary hover:bg-blue-500"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Procesando...' : client?.id ? 'Actualizar Cliente' : 'Crear Cliente'}
                </button>
            </div>
        </form>
    );
});

CustomerFormEdit.displayName = "CustomerFormEdit";
export default CustomerFormEdit;