'use client'
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import CustomTable from "@/components/organisms/CustomTable";
import Toolbar from "@/components/organisms/ToolBar";
import { getListproducts } from "@/lib/api-products";
import { EmployeeDAO, ProductDAO } from "@/types/Api";
import SearchBarUniversal from "@/components/molecules/SearchBar";
import ProductForm from "./ProductForm";

export default function ScreenProducts() {
    const router = useRouter();
    const [products, setProducts] = useState<{ [key: string]: string }[]>([]);
    const [initialProducts, setInitialProducts] = useState<{ [key: string]: string }[]>([]); // Nuevo estado para productos iniciales
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const initialFetchDone = useRef(false);
    
    useEffect(() => {
        if (!initialFetchDone.current) {
            fetchAllProducts();
            initialFetchDone.current = true;
        }
    }, []);

    const fetchAllProducts = async () => {
        if (isLoading) return;
        
        setIsLoading(true);
        try {
            const res = await getListproducts();
            if (res && Array.isArray(res)) {
                formatAndSetProducts(res);
            }
        } catch (err) {
            console.log('Error al obtener productos', err);
        } finally {
            setIsLoading(false);
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
        setInitialProducts(formattedProducts); // Guardar productos iniciales
        setProducts(formattedProducts);
    };

    const handleProductsFound = (results: EmployeeDAO[] | ProductDAO[]) => {
        if (results.length > 0 && "stock" in results[0]) {
            formatAndSetProducts(results as ProductDAO[]);
        } else if (searchQuery) {
            setProducts([]);
        } else {
            setProducts(initialProducts);
        }
    };

    const handleRowClick = (productId: string) => {
        router.push(`/store/products/${productId}`);
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
                    onResultsFound={handleProductsFound} 
                    showResults={false}
                    placeholder="Search by name..."
                    searchType="products"
                />
            </div>
            
            {isLoading && <p className="text-gray-500 text-sm mb-2">Cargando productos...</p>}
            
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