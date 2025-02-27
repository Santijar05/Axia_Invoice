"use client"

import { useEffect, useState } from "react";

import CustomTable from "@/components/organisms/CustomTable"
import Toolbar from "@/components/organisms/ToolBar";
import ProductForm from "./ProductForm";

export default function ScreenProducts() {
    const [products, setProducts] = useState<{ [key: string]: string }[]>([]);
    
    useEffect(() => {
        setProducts([
            { barInternal: "001", product: "Apple", brand: "Brand A", stock: "100", pPurchase: "1.00", price: "1.50" },
            { barInternal: "002", product: "Banana", brand: "Brand B", stock: "150", pPurchase: "0.80", price: "1.20" },
            { barInternal: "003", product: "Orange", brand: "Brand C", stock: "120", pPurchase: "1.10", price: "1.60" },
            { barInternal: "004", product: "Grapes", brand: "Brand D", stock: "80", pPurchase: "2.00", price: "2.50" },
            { barInternal: "005", product: "Peach", brand: "Brand E", stock: "60", pPurchase: "1.50", price: "2.00" },
            { barInternal: "006", product: "Mango", brand: "Brand F", stock: "90", pPurchase: "1.70", price: "2.30" },
            { barInternal: "007", product: "Pineapple", brand: "Brand G", stock: "50", pPurchase: "2.50", price: "3.00" },
            { barInternal: "008", product: "Strawberry", brand: "Brand H", stock: "70", pPurchase: "1.80", price: "2.20" },
            { barInternal: "009", product: "Blueberry", brand: "Brand I", stock: "40", pPurchase: "3.00", price: "3.50" },
            { barInternal: "010", product: "Kiwi", brand: "Brand J", stock: "85", pPurchase: "1.90", price: "2.40" },
            { barInternal: "011", product: "Papaya", brand: "Brand K", stock: "95", pPurchase: "2.10", price: "2.70" },
            { barInternal: "012", product: "Cherry", brand: "Brand L", stock: "65", pPurchase: "2.80", price: "3.30" },
            { barInternal: "013", product: "Plum", brand: "Brand M", stock: "110", pPurchase: "1.60", price: "2.10" },
            { barInternal: "014", product: "Watermelon", brand: "Brand N", stock: "30", pPurchase: "3.20", price: "3.80" },
            { barInternal: "015", product: "Cantaloupe", brand: "Brand O", stock: "55", pPurchase: "2.60", price: "3.10" }
        ]);
    }, []);

  return (
    <div>
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
    </div>
  )
}
