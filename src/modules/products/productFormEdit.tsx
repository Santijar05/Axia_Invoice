"use client";

import React, { forwardRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/schemes/productSheme";
import Input from "@/src/components/atoms/Input";
import CustomButton from "@/src/components/atoms/CustomButton";
import { updateProduct } from "@/lib/api-products-status";
import { ProductDAO, SupplierDAO } from "@/types/Api";
import Cookies from "js-cookie"; 
import { jwtDecode } from "jwt-decode";

type ProductFormData = {
  id: string;
  supplierId: string;
  name: string;
  stock: number;
  tax: number;
  purchasePrice: number;
  salePrice: number;
};

export interface ProductFormProps {
    product?: ProductDAO; 
    onSuccess?: () => void;
    onClose?: () => void;
    supplier?: string ;
  }

const ProductFormEdit = forwardRef<HTMLFormElement, ProductFormProps>(({ product, supplier, onSuccess, onClose }, ref) => {
    const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
    } = useForm<ProductFormData>({
      resolver: zodResolver(productSchema),
    });

    const [selectedSupplier, setSelectedSupplier] = useState<SupplierDAO>();

    useEffect(() => {
        if (product) {
            reset({
                ...product,
            });
        }
    }, [product, reset]);

    const onSubmit = async (data: ProductFormData) => {
      const authToken = Cookies.get("authToken");
      if (!authToken) {
        console.error("No hay authToken");
        throw new Error("Authentication token is missing");
      }
      
      const decoded: any = jwtDecode(authToken);
      const tenantId = decoded.tenantId;

      try {
        const productData: ProductDAO = {
          ...data,
          tenantId,
          supplier: selectedSupplier || ({} as SupplierDAO),
          id: product?.id || "",
        };

        const response = await updateProduct(productData, product?.id || "");

        if (response.ok) {
          alert(`Producto ${product?.id ? "actualizado" : "creado"} exitosamente`);
          reset();
          onSuccess?.();
        } else {
          const errorData = await response.json();
          console.error(`Error al ${product?.id ? "actualizar" : "crear"} el producto:`, errorData);
          alert(`Error al ${product?.id ? "actualizar" : "crear"} el producto`);
        }
      } catch (error) {
        console.error("Error en onSubmit:", error);
        alert("Error de conexión. Inténtalo nuevamente.");
      }
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <div>
          <label className="text-sm font-semibold text-gray-500">
            Code
          </label>
          <Input
            placeholder="AUTOGENERADO"
            type="text"
            disabled={true}
            {...register("id")}
          />
        </div>

        <div>
        <label className="text-sm font-semibold text-gray-500">
            Proveedor
        </label>
        <Input
            placeholder="Proveedor"
            type="text"
            disabled={true}
            value={selectedSupplier?.name || product?.supplier?.name || ""}
            onChange={(e) => setSelectedSupplier({ ...selectedSupplier, name: e.target.value } as SupplierDAO)}
        />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-500">
            Nombre
          </label>
          <Input
            placeholder="Ej. MOUSE RAZER"
            type="text"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-500">
            Stock
          </label>
          <Input
            placeholder="EJ. 10"
            type="number"
            {...register("stock", { valueAsNumber: true })}
          />
          {errors.stock && (
            <p className="text-red-500 text-xs">{errors.stock.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-500">
            Impuesto
          </label>
          <Input
            placeholder="EJ. 19%"
            type="number"
            {...register("tax", { valueAsNumber: true })}
          />
          {errors.tax && (
            <p className="text-red-500 text-xs">{errors.tax.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-500">
            Precio de compra
          </label>
          <Input
            placeholder="EJ. 1.00"
            type="number"
            {...register("purchasePrice", { valueAsNumber: true })}
          />
          {errors.purchasePrice && (
            <p className="text-red-500 text-xs">
              {errors.purchasePrice.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-500">
            Precio de venta
          </label>
          <Input
            placeholder="EJ. 1.00"
            type="number"
            {...register("salePrice", { valueAsNumber: true })}
          />
          {errors.salePrice && (
            <p className="text-red-500 text-xs">
              {errors.salePrice.message}
            </p>
          )}
        </div>

        <div className="col-span-2 flex justify-end gap-2 mt-4">
          <CustomButton 
            text="Cerrar" 
            style="border text-white bg-homePrimary hover:bg-blue-500" 
            typeButton="button" 
            onClickButton={onClose || onSuccess}  
          />
          <CustomButton 
            text={product?.id ? 'Actualizar Producto' : 'Crear Producto'} 
            style="border text-white bg-homePrimary hover:bg-blue-500" 
            typeButton="submit" 
          />
        </div>    
      </form>
    );
  }
);

ProductFormEdit.displayName = "ProductFormEdit";
export default ProductFormEdit;