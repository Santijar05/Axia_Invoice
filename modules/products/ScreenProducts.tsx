"use client"

import { useEffect, useState } from "react";

import CustomTable from "@/components/organisms/CustomTable"
import Toolbar from "@/components/organisms/ToolBar";
import ProductForm from "./ProductForm";
import { getListproducts } from "@/lib/api-products";
import { ProductDAO } from "@/types/Api";

export default function ScreenProducts() {
    const [products, setProducts] = useState<{ [key: string]: string }[]>([]);

    useEffect(() => {
        getListproducts().then((res) => {
            if (res.data) {
                // Transform ProductDAO array into the format expected by CustomTable
                const formattedProducts = res.data.map((product: ProductDAO) => ({
                    id: product.id,
                    name: product.name,
                    supplier: product.supplier, 
                    tax: product.tax.toString(),
                    stock: product.stock.toString(),
                    purchasePrice: product.purchasePrice.toString(),
                    salePrice: product.salePrice.toString(),
                }));
                setProducts(formattedProducts);
            }
        });
    }, []);

    return (
        <div>
            <Toolbar
                title="Products"
                formComponent={<ProductForm/>}
                formTitle="Ingrese producto"
            />
            <CustomTable 
                title="" 
                headers={["Bar/Internal", "Product", "Supplier", "Tax", "Stock", "P. Purchase", "Price"]}
                options={true} 
                products={products}
            />
        </div>
    );
}
