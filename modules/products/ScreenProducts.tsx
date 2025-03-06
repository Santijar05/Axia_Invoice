'use client'
import { useEffect, useState } from "react";
import CustomTable from "@/components/organisms/CustomTable";
import Toolbar from "@/components/organisms/ToolBar";
import ProductForm from "./ProductForm";
import { getListproducts } from "@/lib/api-products";
import { ProductDAO } from "@/types/Api";

export default function ScreenProducts() {
    const [products, setProducts] = useState<{ [key: string]: string }[]>([]);
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getListproducts();
                if (res && Array.isArray(res)) {
                    const formattedProducts = res.map((product: ProductDAO) => ({
                        id: product.id,
                        name: product.name,
                        supplier: product.supplier.name,
                        tax: product.tax.toString(),
                        stock: product.stock.toString(),
                        purchasePrice: product.purchasePrice.toString(),
                        salePrice: product.salePrice.toString(),
                    }));
                    setProducts(formattedProducts);
                }
            } catch (err) {
                console.log('Error al obtener productos', err);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto">
            <Toolbar
                title="Products"
                formComponent={<ProductForm />}
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