"use client"
import CustomTable from "@/components/organisms/CustomTable"
import HomeBox from "../../components/organisms/HomeBox"
import { useEffect, useState } from "react";
import Toolbar from "@/components/organisms/ToolBar";
import ProductForm from "./ProductForm";

export default function ScreenProducts() {
    const [products, setProducts] = useState<{ [key: string]: string }[]>([]);
    
    useEffect(() => {
        setProducts(
            Array(8).fill({
                barInternal: "Test",
                product: "Test",
                brand: "Test",
                stock: "Test",
                pPurchase: "Test",
                price: "Test",
            })
        );
    }, []);

  return (
    <HomeBox>
        <Toolbar
            title="Products"
            formComponent={<ProductForm/>}
            formTitle="Ingrese producto"
        />
        <CustomTable 
            title= "" 
            headers= {["Bar/Internal", "Product", "Brand", "Stock", "P. Purchase", "Price"]}
            options={true} 
            products={products}
        />
    </HomeBox>
  )
}
