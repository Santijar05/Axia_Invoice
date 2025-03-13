import { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetailPage from "@/modules/products/ProductDetailPage";
import { getListproducts, getProductById } from "@/lib/api-products";
import { ProductDAO } from "@/types/Api";

type ProductPageProps = {
    params: Promise<{ idProduct: string }>;
};

// Generar rutas estáticas (SSG)
export async function generateStaticParams() {
  try {
    const products = await getListproducts();
    return products.map((product: ProductDAO) => ({
      idProduct: product.id,
    }));
  } catch (error) {
    console.error("Error al generar rutas estáticas:", error);
    return [];
  }
}

// Metadatos dinámicos
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    const idProduct = (await params).idProduct
    const product = await getProductById(idProduct);
    return {
      title: `Producto #${product.id} - ${product.name}`,
    };
  } catch {
    return {
      title: "Producto no encontrado",
      description: "Este producto no existe.",
    };
  }
}

// Página de detalle del producto
export default async function ProductDetailEmployee({ params }: ProductPageProps) {
    try {
        const idProduct = (await params).idProduct
        const product = await getProductById(idProduct);

        if (!product) {
            notFound();
        }
        return <ProductDetailPage product={product} />;
    } catch (error) {
        console.error("Error cargando el producto:", error);
        notFound();
    }
}
