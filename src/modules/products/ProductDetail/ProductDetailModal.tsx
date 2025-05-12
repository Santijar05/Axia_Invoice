"use client";
import React from "react";

import { ProductDAO } from "@/types/Api";
import CustomButton from "@/src/components/atoms/CustomButton";

interface ProductDetailModalProps {
  product: ProductDAO | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({ 
  product, 
  isOpen, 
  onClose 
}: ProductDetailModalProps) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative w-full max-w-2xl bg-black bg-opacity-90 rounded-lg shadow-lg p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Detalle del producto</h2>
          <CustomButton
            text="Cerrar"
            style="bg-tertiary text-white hover:bg-blue-800"
            onClickButton={onClose}
          />
        </div>
        
        <div className="bg-black bg-opacity-30 p-6 rounded-lg border border-gray-800">
          <h3 className="font-bold text-2xl mb-3 text-tertiary text-center">{product.name}</h3>
          <p className="text-sm text-gray-300 text-center mb-10">ID: {product.id}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 border border-gray-600 rounded-lg">
              <p className="text-sm font-semibold text-gray-400 mb-2">Proveedor</p>
              <p className="text-white">{product.supplier.name}</p>
            </div>
            <div className="p-4 border border-gray-600 rounded-lg">
              <p className="text-sm font-semibold text-gray-400 mb-2">Impuesto</p>
              <p className="text-white">{product.tax}%</p>
            </div>
            <div className="p-4 border border-gray-600 rounded-lg">
              <p className="text-sm font-semibold text-gray-400 mb-2">Stock</p>
              <p className="text-white">{product.stock} unidades</p>
            </div>
            <div className="p-4 border border-gray-600 rounded-lg">
              <p className="text-sm font-semibold text-gray-400 mb-2">Precio de compra</p>
              <p className="text-white">${product.purchasePrice}</p>
            </div>
            <div className="p-4 border border-gray-600 rounded-lg">
              <p className="text-sm font-semibold text-gray-400 mb-2">Precio de venta</p>
              <p className="text-white">${product.salePrice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}