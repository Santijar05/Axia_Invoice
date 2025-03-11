"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById } from "@/lib/api-products";
import { ProductDAO } from "@/types/Api";
import { useEffect, useState } from "react";
import CustomButton from "@/components/atoms/CustomButton";

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const productId = params.idProduct as string;
    
    const [product, setProduct] = useState<ProductDAO | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log('Product ID:', productId);
        if (!productId) {
          return; 
        }
        const fetchProduct = async () => {
          setIsLoading(true);
          setError(null);
      
          try {
            const product = await getProductById(productId);
            setProduct(product);
            console.log('Product:', product);
          } catch (err) {
            console.error("Error fetching product:", err);
            setError("Error al buscar producto");
          } finally {
            setIsLoading(false);
          }
        };
      
        fetchProduct();
      }, [productId]);

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
                {isLoading && <p className="text-gray-500">Cargando...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {product && !isLoading && (
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
                        <p className="text-black">{product.tax * 100}%</p>
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
                )}
            </div>
        </div>
    );
}