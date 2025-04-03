'use client'
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import CustomTable from "@/components/organisms/CustomTable";
import Toolbar from "@/components/organisms/ToolBar";
import { getListproducts } from "@/lib/api-products"; // Añadida función deleteProduct
import { ClientDAO, EmployeeDAO, ProductDAO, SupplierDAO } from "@/types/Api";
import SearchBarUniversal from "@/components/molecules/SearchBar";
import ProductForm from "./ProductForm";

export default function ScreenProducts() {
    const router = useRouter();
    const [products, setProducts] = useState<{ [key: string]: string }[]>([]);
    const [initialProducts, setInitialProducts] = useState<{ [key: string]: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const initialFetchDone = useRef(false);
    
    useEffect(() => {
        if (!initialFetchDone.current) {
            const fetchAllProducts = async () => {
                setIsLoading(true);
                try {
                    const res = await getListproducts();
                    if (res && Array.isArray(res)) {
                        formatAndSetProducts(res);
                    }
                } catch (err) {
                    console.error('Error al obtener productos:', err);
                } finally {
                    setIsLoading(false);
                }
            };
    
            fetchAllProducts();
            initialFetchDone.current = true;
        }
    }, []);        

    const formatAndSetProducts = (productList: ProductDAO[]) => {
        const formattedProducts = productList.map((product: ProductDAO) => ({
            código: product.id,
            producto: product.name,
            proveedor: product.supplier?.name || 'N/A',
            impuesto: product.tax?.toString() || '0',
            stock: product.stock?.toString() || '0',
            "p. compra": product.purchasePrice?.toString() || '0',
            "p. venta": product.salePrice?.toString() || '0',
        }));
        setInitialProducts(formattedProducts);
        setProducts(formattedProducts);
    };

    const handleProductsFound = (results: ClientDAO[] | EmployeeDAO[] | ProductDAO[] | SupplierDAO[]) => {
        // Type guard para filtrar solo ProductDAO
        const productResults = results.filter((result): result is ProductDAO => 
            'name' in result && 'stock' in result
        );
        
        if (productResults.length > 0) {
            formatAndSetProducts(productResults);
        } else {
            setProducts(initialProducts);
        }
    };

    const handleRowClick = (productId: string) => {
        router.push(`/store/products/${productId}`);
    };

    // Función para manejar la eliminación de productos
    const handleDeleteProduct = async (productId: string) => {

    };

    return (
        <div className="container mx-auto">
            <Toolbar
                title="Gestión de Productos"
                formComponent={<ProductForm />}
                formTitle="Nuevo Producto"
            />
            
            <div className="mb-4 mt-4 w-72">
                <SearchBarUniversal 
                    onResultsFound={handleProductsFound} 
                    showResults={false}
                    placeholder="Buscar productos..."
                    searchType="products"
                />
            </div>
            
            {isLoading && <p className="text-gray-500 text-sm mb-2">Cargando productos...</p>}
            
            <CustomTable
                title="Lista de Productos"
                headers={["Código", "Producto", "Proveedor", "Impuesto", "Stock", "P. Compra", "P. Venta"]}
                options={true}
                data={products}
                contextType="products"
                onRowClick={handleRowClick}
                customActions={{
                    delete: handleDeleteProduct,
                    edit: (id) => router.push(`/store/products/edit/${id}`),
                    view: handleRowClick
                }}
                actionLabels={{
                    delete: "Eliminar",
                    edit: "Editar",
                    view: "Ver Detalles"
                }}
            />
        </div>
    );
}