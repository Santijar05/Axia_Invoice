import React, { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema } from "@/schemes/employeeScheme";
import Input from "@/src/components/atoms/Input";
import Cookies from "js-cookie"; 
import { jwtDecode } from "jwt-decode";
import { createEmployee } from "@/request/users";
import CustomButton from "@/src/components/atoms/CustomButton";

type EmployeeFormData = {
    tenantId: string;
    name: string; 
    email: string; 
    password: string;
    role: string;
    avatar: string; 
};

interface EmployeeFormProps {
    onSuccess?: () => void; 
    onClose?: () => void;  
}

const EmployeeForm = forwardRef<HTMLFormElement, EmployeeFormProps>(({ onSuccess, onClose }, ref) => {
    const {
        register,
        handleSubmit,
        reset, 
        formState: { errors },
    } = useForm<EmployeeFormData>({
        resolver: zodResolver(employeeSchema),
    });

    const onSubmit = async (data: EmployeeFormData) => {
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
            const response = await createEmployee(formData, authToken);
            console.log("Respuesta del servidor:", response);

            if (response.status === 201) {
                const responseData = await response.json();
                alert("Empleado creado exitosamente");
                console.log("Empleado creado:", responseData);
                reset(); 
                onSuccess?.();
                onClose?.();
            } else {
                const errorData = await response.json();
                console.log("Error al crear el empleado:", errorData);
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
                <label className="text-sm font-semibold text-gray-500">Correo electrónico</label>
                <Input 
                    className="text-homePrimary-200 bg-transparent" 
                    placeholder="Ej. Juan@gmail.com" 
                    type="email" 
                    {...register("email")} 
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Contraseña</label>
                <Input 
                    className="text-homePrimary-200 bg-transparent" 
                    placeholder="Contraseña" 
                    type="password" 
                    {...register("password")} 
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Rol</label>
                <Input 
                    className="text-homePrimary-200 bg-transparent" 
                    placeholder="Ej. admin" 
                    type="text" 
                    {...register("role")} 
                />
                {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
            </div>

            <div className="col-span-2 flex justify-end gap-2 mt-4">
                <CustomButton text="Cerrar" style="border text-white bg-homePrimary hover:bg-blue-500" typeButton="button" onClickButton={onSuccess}  />
                <CustomButton text={ 'Crear Cliente'} style="border text-white bg-homePrimary hover:bg-blue-500" typeButton="submit" />
            </div>    
        </form>
    );
});

EmployeeForm.displayName = "EmployeeForm";
export default EmployeeForm;