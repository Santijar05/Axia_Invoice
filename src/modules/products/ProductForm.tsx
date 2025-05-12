"use client";

import React, { forwardRef, useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie"; 

import CustomButton from "@/src/components/atoms/CustomButton";
import { createProduct } from "@/lib/api-products-status";
import { getListSuppliers } from "@/lib/api-suppliers";
import { productSchema } from "@/schemes/productSheme";
import Input from "@/src/components/atoms/Input";
import Select from "@/src/components/atoms/select";
import { 
  ProductDAO, 
  ProductFormProps, 
  Supplier, 
  SupplierDAO 
} from "@/types/Api";

type ProductFormData = {
  id: string;
  supplier: Supplier;
  name: string;
  stock: number;
  tax: number;
  purchasePrice: number;
  salePrice: number;
};

const ProductForm = forwardRef<HTMLFormElement, ProductFormProps>(
  ({ onSuccess }, ref) => {
    const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
    } = useForm<ProductFormData>({
      resolver: zodResolver(productSchema),
    });

    const [proveedores, setProveedores] = useState<SupplierDAO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [selectedSupplier, setSelectedSupplier] = useState<SupplierDAO>();

    useEffect(() => {
      async function fetchProveedores() {
        try {
          const data = await getListSuppliers();
          setProveedores(data);
        } catch (err: any) {
          setError(err.message || "Error inesperado");
        } finally {
          setLoading(false);
        }
      }
      fetchProveedores();
    }, []);

    if (loading) return <div>Cargando proveedores...</div>;
    if (error) return <div>{error}</div>;

    const handleSupplierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedId = event.target.value;
      const selectedSupplier = proveedores.find((p) => p.id === selectedId);
      if (selectedSupplier) {
        setSelectedSupplier(selectedSupplier); 
      }
    };

    const onSubmit = async (data: ProductFormData) => {
      console.log("onSubmit", data);
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
          supplier: selectedSupplier ?? ({} as Supplier),
          id: "", 
        };

        const response = await createProduct(productData);

        if (response.status === 201) {
          alert("Producto creado exitosamente");
          reset();
          onSuccess?.();
        } else {
          const errorData = await response.json();
          console.error("Error al crear el producto:", errorData);
          alert("Error al crear el producto");
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
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-500">
            Proveedor
          </label>
          <Select
            className="text-homePrimary-200"
            placeholder="Seleccionar proveedor"
            options={proveedores.map((proveedor) => ({
              value: proveedor.id,
              label: proveedor.name,
            }))}
            onChange={handleSupplierChange}
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
          <CustomButton text="Cerrar" style="border text-white bg-homePrimary hover:bg-blue-500" typeButton="button" onClickButton={onSuccess}  />
          <CustomButton text={ 'Crear Producto'} style="border text-white bg-homePrimary hover:bg-blue-500" typeButton="submit" />
        </div>    
      </form>
    );
  }
);

ProductForm.displayName = "ProductForm";
export default ProductForm;
