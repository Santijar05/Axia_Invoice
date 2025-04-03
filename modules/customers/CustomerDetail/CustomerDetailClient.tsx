"use client"

import React from "react";
import { useRouter } from "next/navigation";

import { ClientDAO } from "@/types/Api";
import CustomButton from "@/components/atoms/CustomButton";

interface CustomerDetailClientProps {
    customer: ClientDAO;
}

export default function CustomerDetailClient({ customer }: CustomerDetailClientProps) {
    const router = useRouter();

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-tertiary">Detalle del cliente</h1>
                    <CustomButton 
                        text="Volver" 
                        style="bg-tertiary text-white hover:bg-blue-800"
                        onClickButton={() => router.back()}
                    />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-bold text-xl mb-2 text-tertiary">{customer.firstName}</h3>
                            <p className="text-sm text-gray-500">ID: {customer.id}</p>
                        </div>
                        
                        <div className="p-3 border rounded-lg">
                            <p className="text-sm font-semibold text-gray-500">Email</p>
                            <p className="text-black">{customer.email}</p>
                        </div>
                        
                        <div className="p-3 border rounded-lg">
                            <p className="text-sm font-semibold text-gray-500">Teléfono</p>
                            <p className="text-black">{customer.identification}</p>
                        </div>
                        
                        <div className="p-3 border rounded-lg">
                            <p className="text-sm font-semibold text-gray-500">Dirección</p>
                            <p className="text-black">{customer.lastName}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
