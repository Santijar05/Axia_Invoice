import React, { forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema } from "@/schemes/employeeScheme";
import Input from "@/components/atoms/Input";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { EmployeeDAO } from "@/types/Api";
import { updateEmployee } from "@/request/users";
import CustomButton from "@/components/atoms/CustomButton";

type EmployeeFormData = {
    id?: string;
    tenantId: string;
    name: string;
    email: string;
    password?: string;
    role: string;
    avatar: string;
};

interface EmployeeFormProps {
    employee?: {
        id?: string;
        name: string;
        email: string;
        role: string;
    };
    onSuccess?: () => void;
}

const EmployeeFormEdit = forwardRef<HTMLFormElement, EmployeeFormProps>(({ employee, onSuccess }, ref) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<EmployeeFormData>({
        resolver: zodResolver(employeeSchema),
    });

    useEffect(() => {
        if (employee) {
            reset({
                ...employee,
                password: "",
                tenantId: "", 
                avatar: "", 
            });
        }
    }, [employee, reset]);

    const onSubmit = async (data: EmployeeFormData) => {
        const authToken = Cookies.get("authToken");
    
        if (!employee?.id) {
            alert("ID de cliente no disponible");
            return;
        }
    
        try {
    
            const requestBody: EmployeeDAO = {
                id: employee.id, 
                name: data.name,
                role: data.role,
                email: data.email,
            };
    
            const response = await updateEmployee(requestBody, employee.id);
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al actualizar el empleado");
            }
    
            alert("Empleado actualizado correctamente");
            if (onSuccess) onSuccess();
            
        } catch (error) {
            console.error("Error en onSubmit:", error);
        }
    };


    return (
        <form ref={ref} onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
                <label className="text-sm font-semibold text-gray-500">ID</label>
                <Input
                    placeholder="AUTOGENERADO"
                    type="text"
                    disabled
                    {...register("id")}
                />
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Role</label>
                <Input 
                    placeholder="Ej. admin" 
                    type="text" 
                    disabled
                    {...register("role")} 
                />
                {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Nombre</label>
                <Input 
                    placeholder="Ej. Juan" 
                    type="text" 
                    {...register("name")} 
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Email*</label>
                <Input 
                    placeholder="Ej. juan@example.com" 
                    type="email" 
                    {...register("email")} 
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">
                    {employee?.id ? "Nueva Contraseña" : "Contraseña*"}
                </label>
                <Input 
                    placeholder={"Contraseña"} 
                    type="password" 
                    {...register("password")} 
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            <div className="col-span-2 flex justify-end gap-2 mt-4">
                <CustomButton text="Cerrar" style="border text-white bg-homePrimary hover:bg-blue-500" typeButton="button" onClickButton={onSuccess}  />
                <CustomButton text={employee?.id ? 'Actualizar Empleado' : 'Crear Empleado'} style="border text-white bg-homePrimary hover:bg-blue-500" typeButton="submit" />
            </div>
        </form>
    );
});

EmployeeFormEdit.displayName = "EmployeeFormEdit";
export default EmployeeFormEdit;