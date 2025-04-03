import React, { forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { employeeSchema } from "@/schemes/employeeScheme";
import Input from "@/components/atoms/Input";
import CustomButton from "@/components/atoms/CustomButton";

type EmployeeFormData = {
    id?: string;
    name: string;
    email: string;
    role: string;
};

interface EmployeeFormProps {
    employee?: EmployeeFormData;
    onClose?: () => void;
}

const EmployeeFormView = forwardRef<HTMLFormElement, EmployeeFormProps>(({ employee, onClose }, ref) => {
    const { reset } = useForm<EmployeeFormData>({
        resolver: zodResolver(employeeSchema),
    });

    useEffect(() => {
        if (employee) {
            reset(employee);
        }
    }, [employee, reset]);

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
                <label className="text-sm font-semibold text-gray-500">ID</label>
                <Input type="text" value={employee?.id || "AUTOGENERADO"} disabled />
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Role</label>
                <Input type="text" value={employee?.role || "N/A"} disabled />
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Nombre</label>
                <Input type="text" value={employee?.name || "N/A"} disabled />
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-500">Email</label>
                <Input type="email" value={employee?.email || "N/A"} disabled />
            </div>

            <div className="col-span-2 flex justify-end mt-4">
                <CustomButton text="Cerrar" style="border text-white bg-homePrimary hover:bg-blue-500" typeButton="button" onClickButton={onClose} />
            </div>
        </div>
    );
});

EmployeeFormView.displayName = "EmployeeFormView";
export default EmployeeFormView;
