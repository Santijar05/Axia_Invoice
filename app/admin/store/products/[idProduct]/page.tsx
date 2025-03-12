import { Metadata } from "next";
import { getProductById } from "@/lib/api-products";
import ProductDetailServer from "@/modules/products/ProductDetail/ProductDetailServer";

interface ProductPageProps {
    params: { idProduct: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    try {
        const { idProduct } = await params;
        const product = await getProductById(idProduct);
        
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

// Optional: Pre-render common product pages
export async function generateStaticParams() {
    return [];
}

export default async function ProductDetailAdmin({ params }: ProductPageProps) {
    const { idProduct } = await params;
    return <ProductDetailServer productId={idProduct} />;
}