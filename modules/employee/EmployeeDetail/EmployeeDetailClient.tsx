"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

import { EmployeeDAO } from "@/types/Api";
import CustomButton from "@/components/atoms/CustomButton";

interface EmployeeDetailClientProps {
    employee: EmployeeDAO;
}

export default function EmployeeDetailClient({ employee }: EmployeeDetailClientProps) {
    const router = useRouter();

    return (
        <div className="relative w-full h-screen text-white flex justify-center items-center">
            <Image 
                src="/Images/fondoHerooo.png" 
                alt="Background Image" 
                fill 
                className="absolute top-0 left-0 w-full h-full object-cover"
                priority
            />
            
            <div className="relative w-full h-full bg-transparent rounded-lg shadow-lg p-4">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-semibold p-4 border-b text-white">Detalle del empleado</h2>
                    <CustomButton 
                        text="Volver" 
                        style="bg-tertiary text-white hover:bg-blue-800"
                        onClickButton={() => router.back()}
                    />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 p-4 bg-transparent rounded-lg">
                            <h3 className="font-bold text-xl mb-2 text-tertiary">{employee.name}</h3>
                            <p className="text-sm text-gray-500">ID: {employee.id}</p>
                        </div>
                        
                        <div className="p-3 border rounded-lg">
                            <p className="text-sm font-semibold text-gray-500">Email</p>
                            <p className="text-black">{employee.email}</p>
                        </div>
                        
                        <div className="p-3 border rounded-lg">
                            <p className="text-sm font-semibold text-gray-500">Teléfono</p>
                            <p className="text-black">{employee.id}</p>
                        </div>
                        
                        <div className="p-3 border rounded-lg">
                            <p className="text-sm font-semibold text-gray-500">Cargo</p>
                            <p className="text-black">{employee.role}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
