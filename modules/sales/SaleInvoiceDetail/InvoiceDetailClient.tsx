"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import CustomButton from "@/components/atoms/CustomButton";
import { Invoice } from "@/types/Api";

interface InvoiceDetailClientProps {
    invoice: Invoice;
}

export default function InvoiceDetailClient({ invoice }: InvoiceDetailClientProps) {
    const router = useRouter();

    return (
        <div className="relative w-full min-h-screen text-white flex justify-center">
            <Image 
                src="/Images/fondoHerooo.png" 
                alt="Background Image" 
                fill 
                className="absolute top-0 left-0 w-full h-full object-cover"
                priority
            />

            <div className="relative w-full max-w-4xl bg-blac bg-opacity-50 rounded-lg shadow-lg mt-20">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-tertiary">Detalle de la factura</h1>
                    <CustomButton 
                        text="Volver" 
                        style="bg-tertiary text-white hover:bg-blue-800"
                        onClickButton={() => router.back()}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Información general de la factura */}
                    <div className="p-4 border border-gray-600 rounded-lg">
                        <p className="text-sm text-gray-400 mb-2">ID de Factura</p>
                        <p>{invoice.id}</p>
                    </div>

                    <div className="p-4 border border-gray-600 rounded-lg">
                        <p className="text-sm text-gray-400 mb-2">Fecha</p>
                        <p>{new Date(invoice.date).toLocaleString()}</p>
                    </div>

                    <div className="p-4 border border-gray-600 rounded-lg">
                        <p className="text-sm text-gray-400 mb-2">Factura electrónica</p>
                        <p>{invoice.electronicBill ? "Sí" : "No"}</p>
                    </div>

                    <div className="p-4 border border-gray-600 rounded-lg">
                        <p className="text-sm text-gray-400 mb-2">Total</p>
                        <p>${invoice.totalPrice?.toFixed(2)}</p>
                    </div>

                    {/* Cliente */}
                    <div className="md:col-span-2 bg-transparent border border-gray-600 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3 text-tertiary">Cliente</h3>
                        <p>Nombre: {invoice.client.firstName} {invoice.client.lastName}</p>
                        <p>Identificación: {invoice.client.identification}</p>
                        <p>Email: {invoice.client.email}</p>
                        <p>ID Cliente: {invoice.client.id}</p>
                    </div>

                    {/* Empresa / Tenant */}
                    <div className="md:col-span-2 bg-transparent border border-gray-600 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3 text-tertiary">Empresa</h3>
                        <p>Nombre: {invoice.tenant.name}</p>
                        <p>NIT: {invoice.tenant.nit}</p>
                        <p>Dirección: {invoice.tenant.address}</p>
                        <p>Teléfono: {invoice.tenant.phone}</p>
                    </div>

                    <div className="md:col-span-2 bg-transparent border border-gray-600 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3 text-tertiary">Productos</h3>
                        {invoice.invoiceProducts.length === 0 ? (
                            <p>No hay productos asociados.</p>
                        ) : (
                            <ul className="list-disc pl-5 space-y-2">
                            {invoice.invoiceProducts.map((item) => (
                                <li key={item.id}>
                                <p><span className="text-gray-400">Producto:</span> {item.product?.name}</p> 
                                <p><span className="text-gray-400">Cantidad:</span> {item.quantity}</p>
                                </li>
                            ))}
                            </ul>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
