import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getListproducts, getProductById, getPublicProducts } from "@/lib/api-products";
import ProductDetailServer from "@/modules/products/ProductDetail/ProductDetailServer";
import { ProductDAO } from "@/types/Api";
import { envVariables } from "@/utils/config";

interface ProductPageProps {
    params: { productId: string };
}

interface StaticParams {
    productId: string;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    try {
        const { productId } = await params;
        const product = await getProduct(productId);
        
        return {
        title: `Producto: ${product.name}`,
        description: `Detalles del producto ${product.name}`,
        };
    } catch {
        return {
        title: "Producto no encontrado",
        description: "El producto solicitado no existe",
        };
    }
}

const getProduct = async (id: string): Promise<ProductDAO> => {
    try {
        const url = `${envVariables.API_URL}/products/${id}`;
        const cookieStore = await cookies();
        const cookieHeader = cookieStore.getAll()
        .map(c => `${c.name}=${c.value}`)
        .join('; ');
                
        const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookieHeader
        },
        cache: 'no-store',
        });
        
        if (!response.ok) {
        console.error('Response status:', response.status);
        throw new Error(`Error fetching product: ${response.statusText}`);
        }
        
        return response.json();
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        notFound();
    }
};


export const generateStaticParams = async (): Promise<StaticParams[]> => {
    try {
        const products: ProductDAO[] = await getPublicProducts(); 
        
        return products.slice(0, 5).map((product: ProductDAO) => ({ 
            productId: product.id 
        }));
    } catch (error) {
        console.error("Error pre-generando páginas de productos:", error);
        return [];
    }
};


export default async function ProductDetailEmployee({ params }: ProductPageProps) {
    const { productId } = await params;
    return <ProductDetailServer productId={productId} />;
}