"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

import { getListproductsByName } from "@/lib/api-products";
import CustomButton from "../atoms/CustomButton";
import { ProductDAO } from "@/types/Api";
import Input from "../atoms/Input";

interface SearchBarUniversalProps {
  onProductsFound?: (products: ProductDAO[]) => void;
  onAddToCart?: (product: ProductDAO) => void;
  showResults?: boolean;
  placeholder?: string;
  onSearchChange?: (query: string) => void;
}

const useDebounce = (callback: (term: string) => void, delay: number) => {
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  return (term: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      callback(term);
    }, delay);
  };
};

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

  const fetchProducts = async (term: string) => {
    if (!term || term.length < 2) {
      setProducts([]);
      onProductsFound?.([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const fetchedProducts = await getListproductsByName(term);
      setProducts(fetchedProducts || []);
      onProductsFound?.(fetchedProducts || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Error al buscar productos");
      setProducts([]);
      onProductsFound?.([]);
    } finally {
      setIsLoading(false);
    }
  };

  const debounceSearch = useDebounce(fetchProducts, 500);

  useEffect(() => {
    debounceSearch(searchTerm);
  }, [searchTerm, debounceSearch]);

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
