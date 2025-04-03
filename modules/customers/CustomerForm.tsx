import React, { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customertSchema } from "@/schemes/customerScheme";
import Input from "@/components/atoms/Input";
import { createCustomer } from "@/request/users";
import Cookies from "js-cookie"; 
import { jwtDecode } from "jwt-decode";
import CustomButton from "@/components/atoms/CustomButton";

type CustomerFormData = {
    tenantId: string;
    identification: string; 
    firstName: string;
    lastName: string;
    email: string; 
};

interface CustomerFormProps {
    onSuccess?: () => void; 
}

const CustomerForm = forwardRef<HTMLFormElement, CustomerFormProps>(({ onSuccess }, ref) => {
        const {
            register,
            handleSubmit,
            reset, 
            formState: { errors },
        } = useForm<CustomerFormData>({
            resolver: zodResolver(customertSchema),
        });

        const onSubmit = async (data: CustomerFormData) => {
            const authToken = Cookies.get("authToken");
            if (!authToken) {
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
            const response = await createCustomer(formData, authToken);

            if (response.status === 201) {
                const responseData = await response.json();
                alert("Cliente creado exitosamente");
                console.log("Usuario creado:", responseData);
                reset(); 
                if (onSuccess) onSuccess();
            } else {
                const errorData = await response.json();
                console.log("Error al crear el cliente:", errorData);
            }
            } catch (error) {
            console.error(error);
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
                    <label className="text-sm font-semibold text-gray-500">Identificacion</label>
                    <Input 
                        className="text-homePrimary-200 bg-transparent" 
                        placeholder="Ej. 123456789" 
                        type="text" 
                        {...register("identification")} 
                    />
                    {errors.identification && <p className="text-red-500 text-xs">{errors.identification.message}</p>}
                </div>

                <div>
                    <label className="text-sm font-semibold text-gray-500">Nombre</label>
                    <Input 
                        className="text-homePrimary-200 bg-transparent" 
                        placeholder="Ej. Juan" 
                        type="text" 
                        {...register("firstName")} 
                    />
                    {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
                </div>

                <div>
                    <label className="text-sm font-semibold text-gray-500">Apellido</label>
                    <Input 
                        className="text-homePrimary-200 bg-transparent" 
                        placeholder="Ej. Pérez" 
                        type="text" 
                        {...register("lastName")} 
                    />
                    {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
                </div>

                <div>
                    <label className="text-sm font-semibold text-gray-500">Email</label>
                    <Input 
                        className="text-homePrimary-200 bg-transparent" 
                        placeholder="Ej. juan.perez@email.com" 
                        type="email" 
                        {...register("email")} 
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>

            <div className="col-span-2 flex justify-end gap-2 mt-4">
                <CustomButton text="Cerrar" style="border text-white bg-homePrimary hover:bg-blue-500" typeButton="button" onClickButton={onSuccess}  />
                <CustomButton text={ 'Crear Cliente'} style="border text-white bg-homePrimary hover:bg-blue-500" typeButton="submit" />
            </div>               
                
            </form>
        );
    }
);

CustomerForm.displayName = "CustomerForm";
export default CustomerForm;