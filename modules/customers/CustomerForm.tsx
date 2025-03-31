import React, { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customertSchema } from "@/schemes/customerScheme";

import Input from "@/components/atoms/Input";

type CustomerFormData = {
    name: string;
    lastName: string;
    phone: string; 
    email: string; 
    address: string; 
    birthDate: string;
};

const CustomerForm = forwardRef<HTMLFormElement>((_, ref) => {
        const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm<CustomerFormData>({
            resolver: zodResolver(customertSchema),
        });

        const onSubmit = (data: CustomerFormData) => {
            console.log("Datos enviados:", data);
            // fetch() a backend
        };

        return (
            <form ref={ref} onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4"> 
                <div>
                    <label className="text-sm font-semibold text-gray-500">Código</label>
                    <Input placeholder="AUTOGENERADO" type="text" disable={true} />
                </div>

                <div>
                    <label className="text-sm font-semibold text-gray-500">Nombre</label>
                    <Input 
                        className="text-homePrimary-200 bg-transparent" 
                        placeholder="Ej. Juan" 
                        type="text" 
                        {...register("name")} 
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="text-sm font-semibold text-gray-500">Apellido</label>
                    <Input 
                        className="text-homePrimary-200 bg-transparent" 
                        placeholder="Ej. Pérez" 
                        type="text" 
                        {...register("lastName")} 
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="text-sm font-semibold text-gray-500">Teléfono</label>
                    <Input 
                        className="text-homePrimary-200 bg-transparent" 
                        placeholder="Ej. 123456789" 
                        type="text" 
                        {...register("phone")} 
                    />
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
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
                
                <div>
                    <label className="text-sm font-semibold text-gray-500">Dirección</label>
                    <Input 
                        className="text-homePrimary-200 bg-transparent" 
                        placeholder="Ej. Calle 123, Ciudad" 
                        type="text" 
                        {...register("address")} 
                    />
                    {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
                </div>
                
                <div>
                    <label className="text-sm font-semibold text-gray-500">Fecha de Nacimiento</label>
                    <Input 
                        className="text-homePrimary-200 bg-transparent" 
                        type="date" 
                        placeholder="Seleccione una fecha" 
                        {...register("birthDate")}
                        max={new Date().toISOString().split("T")[0]} 
                    />
                    {errors.birthDate && <p className="text-red-500 text-xs">{errors.birthDate.message}</p>}
                </div>
            </form>
        );
    }
);

CustomerForm.displayName = "CustomerForm";
export default CustomerForm;