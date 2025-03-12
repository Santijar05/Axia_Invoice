import Link from "next/link";

export default function ProductNotFound() {
    return (
      <div className="container mx-auto p-6 text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-tertiary mb-4">Producto no encontrado</h1>
          <p className="text-gray-600 mb-8">
            Lo sentimos, el producto que estás buscando no existe o ha sido eliminado.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/employee/store/products" 
              className="bg-tertiary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Ver todos los productos
            </Link>
          </div>
        </div>
      </div>
    );
}