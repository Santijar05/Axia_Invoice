"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { ProductDAO } from "@/types/Api";
import CustomButton from "@/components/atoms/CustomButton";

interface ProductDetailClientProps {
    product: ProductDAO;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const router = useRouter();

    return (
    <div className="container mx-auto p-6">
    <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-tertiary">Detalle del producto</h1>
        <CustomButton 
            text="Volver" 
            style="bg-tertiary text-white hover:bg-blue-800"
            onClickButton={() => router.back()}
        />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-bold text-xl mb-2 text-tertiary">{product.name}</h3>
                        <p className="text-sm text-gray-500">ID: {product.id}</p>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                        <p className="text-sm font-semibold text-gray-500">Proveedor</p>
                        <p className="text-black">{product.supplier.name}</p>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                        <p className="text-sm font-semibold text-gray-500">Impuesto</p>
                        <p className="text-black">{product.tax}%</p>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                        <p className="text-sm font-semibold text-gray-500">Stock</p>
                        <p className="text-black">{product.stock} unidades</p>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                        <p className="text-sm font-semibold text-gray-500">Precio de compra</p>
                        <p className="text-black">${product.purchasePrice}</p>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                        <p className="text-sm font-semibold text-gray-500">Precio de venta</p>
                        <p className="text-black">${product.salePrice}</p>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                        <p className="text-sm font-semibold text-gray-500">Margen</p>
                        <p className="text-black">
                            {((product.salePrice - product.purchasePrice) / product.purchasePrice * 100).toFixed(2)}%
                        </p>
                    </div>
                </div>
                    </div>
            </div>
        </div>
);
}
