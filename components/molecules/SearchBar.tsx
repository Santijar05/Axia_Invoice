"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { getListproductsByName } from "@/lib/api-products";
import { ProductDAO } from "@/types/Api";
import Input from "@/components/atoms/Input";
import CustomButton from "@/components/atoms/CustomButton";

interface SearchBarUniversalProps {
  onProductsFound?: (products: ProductDAO[]) => void;
  onAddToCart?: (product: ProductDAO) => void;
  showResults?: boolean;
  placeholder?: string;
}

const SearchBarUniversal: React.FC<SearchBarUniversalProps> = ({
  onProductsFound,
  onAddToCart,
  showResults = false,
  placeholder = "Buscar productos..."
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<ProductDAO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si el término de búsqueda es muy corto, no hacer nada
    if (!searchTerm || searchTerm.length < 2) {
      setProducts([]);
      if (onProductsFound) onProductsFound([]);
      return;
    }

    // Configurar un temporizador para realizar la búsqueda después de 500ms
    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getListproductsByName(searchTerm);
        const fetchedProducts = response.data; // Assuming the product list is in the 'data' field
        setProducts(fetchedProducts || []);
        if (onProductsFound) onProductsFound(fetchedProducts || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Error al buscar productos");
        setProducts([]);
        if (onProductsFound) onProductsFound([]);
      } finally {
        setIsLoading(false);
      }
    }, 500); // Esperar 500ms antes de realizar la búsqueda

    // Limpiar el temporizador si el término de búsqueda cambia antes de que se complete el tiempo
    return () => clearTimeout(timeoutId);
  }, [searchTerm, onProductsFound]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-full">
      <div className="relative">
        <Input
          icon={Search}
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      
      {showResults && (
        <div className="mt-2">
          {isLoading && <p className="text-gray-500 text-sm">Buscando...</p>}
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          {searchTerm && products.length > 0 ? (
            <ul className="bg-white border border-gray-300 rounded-md shadow-sm max-h-60 overflow-auto">
              {products.map((product) => (
                <li
                  key={product.id}
                  className="flex justify-between items-center p-2 border-b hover:bg-gray-100"
                >
                  <div>
                    <span className="font-medium text-black">{product.name}</span>
                    <div className="text-sm text-gray-500">
                      <span>Precio: ${product.salePrice}</span>
                      <span className="ml-2">Stock: {product.stock}</span>
                    </div>
                  </div>
                  
                  {onAddToCart && (
                    <CustomButton
                      text="Agregar"
                      style="bg-blue-500 text-white hover:bg-blue-600 text-sm px-3 py-1"
                      onClickButton={() => onAddToCart(product)}
                    />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            searchTerm && !isLoading && <p className="text-gray-500 text-sm">No se encontraron productos.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBarUniversal;