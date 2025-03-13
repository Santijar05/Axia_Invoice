'use client'
import { useEffect, useState } from "react";
import {useRouter} from "next/navigation";

import SearchBarUniversal from "@/components/molecules/SearchBar";
import CustomTable from "@/components/organisms/CustomTable";
import Toolbar from "@/components/organisms/ToolBar";
import { getListproducts } from "@/lib/api-products";
import { ProductDAO } from "@/types/Api";
import ProductForm from "./ProductForm";

export default function ScreenProducts() {
    const router = useRouter();
    const [products, setProducts] = useState<{ [key: string]: string }[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    
    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () => {
        try {
            const res = await getListproducts();
            if (res && Array.isArray(res)) {
                formatAndSetProducts(res);
            }
        } catch (err) {
            console.log('Error al obtener productos', err);
        }
    };

    const formatAndSetProducts = (productList: ProductDAO[]) => {
        const formattedProducts = productList.map((product: ProductDAO) => ({
            id: product.id,
            name: product.name,
            supplier: product.supplier.name,
            tax: product.tax.toString(),
            stock: product.stock.toString(),
            purchasePrice: product.purchasePrice.toString(),
            salePrice: product.salePrice.toString(),
        }));
        setProducts(formattedProducts);
    };

    const handleProductsFound = (foundProducts: ProductDAO[]) => {
        if (foundProducts.length > 0) {
            formatAndSetProducts(foundProducts);
        } else {
            // Only fetch all products if search is empty
            if (!searchQuery) {
                fetchAllProducts();
            } else {
                setProducts([]);
            }
        }
    };

    const handleRowClick = (productId: string) => {
        router.push(`/admin/store/products/${productId}`);
    }

    return (
        <div className="container mx-auto">
            <Toolbar
                title="Products"
                formComponent={<ProductForm />}
                formTitle="Ingrese producto"
            />
            
            <div className="mb-4 mt-4 w-72">
                <SearchBarUniversal 
                    onProductsFound={handleProductsFound} 
                    showResults={false}
                    placeholder="Buscar por nombre..."
                    onSearchChange={(query: string) => setSearchQuery(query)}
                    />
            </div>
            
            <CustomTable
                title=""
                headers={["Bar/Internal", "Product", "Supplier", "Tax", "Stock", "P. Purchase", "Price"]}
                options={true}
                products={products}
                onRowClick={handleRowClick}
            />
        </div>
    );
}