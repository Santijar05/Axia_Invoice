'use client'
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import CustomTable from "@/components/organisms/CustomTable";
import Toolbar from "@/components/organisms/ToolBar";
import { getListproducts } from "@/lib/api-products";
import { ClientDAO, EmployeeDAO, ProductDAO, ProductFormProps, SupplierDAO } from "@/types/Api";
import SearchBarUniversal from "@/components/molecules/SearchBar";
import ProductForm from "./ProductForm";
import TableFilter from "@/components/molecules/TableFilter";
import EmptyState from '@/components/molecules/EmptyState';
import CustomModalNoButton from "@/components/organisms/CustomModalNoButton";
import { deleteProduct } from "@/lib/api-products-status";
import ProductFormEdit from "./productFormEdit";
import ProductDetailModal from "./ProductDetail/ProductDetailModal";

export default function ScreenProducts({ onSuccess }: ProductFormProps) {
    const router = useRouter();

    const [currentSort, setCurrentSort] = useState<{field: string, direction: 'asc' | 'desc'} | null>(null);
    const [initialProducts, setInitialProducts] = useState<{ [key: string]: string }[]>([]);
    const [currentProduct, setCurrentProduct] = useState<ProductDAO | null>(null);
    const [products, setProducts] = useState<{ [key: string]: string }[]>([]);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const initialFetchDone = useRef(false);
    
    const fieldMapping: { [key: string]: string } = {
        'código': 'id',
        'producto': 'name',
        'proveedor': 'supplier',
        'impuesto': 'tax',
        'stock': 'stock',
        'p. compra': 'purchasePrice',
        'p. venta': 'salePrice'
    };
    
    useEffect(() => {
        if (!initialFetchDone.current) {
            fetchAllProducts();
            initialFetchDone.current = true;
        }
    }, []);

    // Crea una función separada para el formateo inicial
    const formatAndSetInitialProducts = (productList: ProductDAO[]) => {
        const formattedProducts = productList.map((product: ProductDAO) => ({
            id: product.id,
            código: product.id,
            producto: product.name,
            proveedor: product.supplier?.name || 'N/A',
            impuesto: product.tax?.toString() || '0',
            stock: product.stock?.toString() || '0',
            'p. compra': product.purchasePrice?.toString() || '0',
            'p. venta': product.salePrice?.toString() || '0',
        }));
        setInitialProducts(formattedProducts);
        setProducts(formattedProducts);
    };

    // Modifica la función actual para trabajar solo con 'products'
    const formatAndSetProducts = (productList: ProductDAO[]) => {
        const formattedProducts = productList.map((product: ProductDAO) => ({
            id: product.id,
            código: product.id,
            producto: product.name,
            proveedor: product.supplier?.name || 'N/A',
            impuesto: product.tax?.toString() || '0',
            stock: product.stock?.toString() || '0',
            'p. compra': product.purchasePrice?.toString() || '0',
            'p. venta': product.salePrice?.toString() || '0',
        }));
        setProducts(formattedProducts);
    };

    // Actualiza fetchAllProducts para usar la función correcta
    const fetchAllProducts = async (sortParams?: { sortBy: string, order: 'asc' | 'desc' }) => {
        if (isLoading) return;
        
        setIsLoading(true);
        try {
            const res = await getListproducts(sortParams);
            if (res && Array.isArray(res)) {
                formatAndSetInitialProducts(res); // Usamos la nueva función aquí
            }
        } catch (err) {
            console.error('Error al obtener productos:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Mejora handleProductsFound para ser más explícito sobre cuándo regresar a initialProducts
    const handleProductsFound = (results: ClientDAO[] | EmployeeDAO[] | ProductDAO[] | SupplierDAO[]) => {
        const productResults = results.filter((result): result is ProductDAO => 
            'name' in result && 'stock' in result
        );
        
        if (productResults.length > 0) {
            formatAndSetProducts(productResults);
        } else if (searchTerm && searchTerm.length >= 2) {
            // Create a "no results" row for products
            setProducts([{
                id: "no-results",
                código: "",
                producto: `No se encontraron productos para: "${searchTerm}"`,
                proveedor: "",
                impuesto: "",
                stock: "",
                'p. compra': "",
                'p. venta': "",
            }]);
        } else {
            setProducts(initialProducts);
        }
    };

    // Función para manejar el ordenamiento de productos
    const handleSort = (field: string, direction: 'asc' | 'desc') => {
        setCurrentSort({ field, direction });
        
        if (fieldMapping[field]) {
            fetchAllProducts({ 
                sortBy: fieldMapping[field], 
                order: direction 
            });
        } else {
            const sortedProducts = [...products].sort((a, b) => {
                // Convertir a número si el campo es numérico
                if (field === 'impuesto' || field === 'stock' || field === 'p. compra' || field === 'p. venta') {
                    const aValue = parseFloat(a[field] || '0');
                    const bValue = parseFloat(b[field] || '0');
                    return direction === 'asc' ? aValue - bValue : bValue - aValue;
                } 
                // Ordenar como texto para campos no numéricos
                else {
                    if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
                    if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
                    return 0;
                }
            });
            setProducts(sortedProducts);
        }
    };

    const handleRowClick = (productId: string) => {
        const productToView = initialProducts.find(product => product.id === productId);
        if (productToView) {
            setCurrentProduct({
                id: productToView.id,
                name: productToView["producto"],
                salePrice: parseFloat(productToView["p. venta"] || "0"),
                purchasePrice: parseFloat(productToView["p. compra"] || "0"),
                tax: parseFloat(productToView["impuesto"] || "0"),
                stock: parseFloat(productToView["stock"] || "0"),
                tenantId: "", 
                supplier: {
                    name: productToView.proveedor,
                } as SupplierDAO,
            });
            setIsViewModalOpen(true);
        }
    };

    const handleDeleteProduct = async (productId: string) => {
            try {
                await deleteProduct(productId);
                fetchAllProducts();
            } catch (err) {
                console.error("Error al eliminar producto:", err);
                alert("No se pudo eliminar el producto");
            }
    };

    const handleEditProduct = (productId: string) => {
        const productToEdit = products.find(product => product.id === productId);
        if (productToEdit) {
            setCurrentProduct({
                id: productToEdit.id,
                name: productToEdit.producto,
                supplier: { name: productToEdit.proveedor } as SupplierDAO,
                tax: parseFloat(productToEdit.impuesto),
                stock: parseInt(productToEdit.stock),
                purchasePrice: parseFloat(productToEdit['p. compra']),
                salePrice: parseFloat(productToEdit['p. venta']),
                tenantId: "",
            });
            setIsEditModalOpen(true);
        }
    };

    const tableHeaders = ["Código", "Producto", "Proveedor", "Impuesto", "Stock", "P. Compra", "P. Venta"];

    return (
        <div className="container mx-auto">
            <Toolbar
            title="Gestión de Productos"
            onAddNew={() => setIsAddModalOpen(true)}
            />

            <CustomModalNoButton 
                isOpen={isAddModalOpen}
                onClose={() => {
                    setIsAddModalOpen(false);
                    currentSort ? fetchAllProducts({ sortBy: currentSort.field, order: currentSort.direction }) : fetchAllProducts();
                }}
                title="Nuevo Producto"
                >
                <ProductForm 
                    onSuccess={() => {
                    setIsAddModalOpen(false);
                    currentSort ? fetchAllProducts({ sortBy: currentSort.field, order: currentSort.direction }) : fetchAllProducts();
                    }}
                />
            </CustomModalNoButton>
            
            <div className="flex justify-between items-center mb-4 mt-4">
                <div className="w-72">
                    <SearchBarUniversal 
                        onResultsFound={handleProductsFound} 
                        showResults={false}
                        placeholder="Buscar productos..."
                        searchType="products"
                        onSearchTermChange={setSearchTerm}
                    />
                </div>
                <TableFilter 
                    headers={tableHeaders} 
                    onSort={handleSort} 
                />
            </div>
            
            {isLoading && <p className="text-gray-500 text-sm mb-2">Cargando productos...</p>}
            
            {/* Show empty state when search has no results */}
            {searchTerm && searchTerm.length >= 2 && products.length === 1 && products[0].id === "no-results" ? (
                <EmptyState 
                    message="No se encontraron productos" 
                    searchTerm={searchTerm} 
                />
            ) : (
                <CustomTable
                    title="Lista de Productos"
                    headers={tableHeaders}
                    options={true}
                    data={products.filter(p => p.id !== "no-results")}
                    contextType="products"
                    onRowClick={handleRowClick}
                    customActions={{
                        delete: handleDeleteProduct,
                        edit: handleEditProduct,
                        view: handleRowClick
                    }}
                    actionLabels={{
                        delete: "Eliminar",
                        edit: "Editar",
                        view: "Ver Detalles"
                    }}
                />
            )}

            <CustomModalNoButton 
                isOpen={isEditModalOpen} 
                onClose={() => {
                    setIsEditModalOpen(false); 
                    setTimeout(() => fetchAllProducts(), 0);
                }}
                title="Editar Producto"
            >
                <ProductFormEdit 
                    product={currentProduct || undefined}
                    onSuccess={() => {
                        fetchAllProducts();
                        setIsEditModalOpen(false);
                    }} 
                />
            </CustomModalNoButton>
                
            <ProductDetailModal
                product={currentProduct}
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
            />
        </div>
    );
}