"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";

import { getListproductsByName } from "@/lib/api-products";
//import { getListEmployeesByName } from "@/lib/api-employees";
//import { getListSuppliersByName } from "@/lib/api-suppliers";
import { ProductDAO, EmployeeDAO, SupplierDAO } from "@/types/Api";
import Input from "@/components/atoms/Input";
import CustomButton from "@/components/atoms/CustomButton";

interface SearchBarUniversalProps {
  onResultsFound?: (results: ProductDAO[] | EmployeeDAO[] | SupplierDAO[]) => void;
  onAddToCart?: (product: ProductDAO) => void;
  showResults?: boolean;
  placeholder?: string;
  searchType: "employees" | "products"  | "suppliers";
}

function debounce<U extends unknown[], R>(
  func: (...args: U) => R,
  wait: number
): (...args: U) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: U): void => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const SearchBarUniversal: React.FC<SearchBarUniversalProps> = ({
  onResultsFound,
  onAddToCart,
  showResults = false,
  placeholder = "Buscar...",
  searchType
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<(ProductDAO | EmployeeDAO | SupplierDAO)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceSearch = useMemo(
    () =>
      debounce(async (term: string) => {
        if (!term || term.length < 2) {
          setResults([]);
          if (onResultsFound) onResultsFound([]);
          return;
        }

        setIsLoading(true);
        setError(null);

        try {
          let fetchedResults: ProductDAO[] | EmployeeDAO[] | SupplierDAO[] = [];
          
          if (searchType === "products") {
            fetchedResults = await getListproductsByName(term) || [];
          } else if (searchType === "suppliers") {
            //fetchedResults = await getListSuppliersByName(term) || [];
          } else {
            //fetchedResults = await getListEmployeesByName(term) || [];
          }

          setResults(fetchedResults);
          if (onResultsFound) onResultsFound(fetchedResults);
        
        } catch (err) {
          console.error("Error fetching results:", err);
          setError("Error al buscar");
          setResults([]);
          if (onResultsFound) onResultsFound([]);
        
        } finally {
          setIsLoading(false);
        }
      }, 500),
    [onResultsFound, searchType]
  );

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

          {searchTerm && results.length > 0 ? (
            <ul className="bg-white border border-gray-300 rounded-md shadow-sm max-h-60 overflow-auto">
              
              {results.map((item) => (
                
                <li
                 key={(item as ProductDAO).id || (item as EmployeeDAO).id || (item as SupplierDAO).id}
                 className="flex justify-between items-center p-2 border-b hover:bg-gray-100"
                >
                  <div>
                    <span className="font-medium text-black">
                      {(item as ProductDAO).name || (item as EmployeeDAO).name || (item as SupplierDAO).name}
                    </span>

                    <div className="text-sm text-gray-500">

                      {searchType === "products" ? (
                        <>
                          <span>Precio: ${(item as ProductDAO).salePrice}</span>
                          <span className="ml-2">Stock: {(item as ProductDAO).stock}</span>
                        </>
                      ) : searchType === "employees" ? (
                        <>
                          <span>Posición: {(item as EmployeeDAO).position}</span>
                          <span className="ml-2">Email: {(item as EmployeeDAO).email}</span>
                        </>
                      ) : (
                        <>
                          <span>NIT: {(item as SupplierDAO).nit}</span>
                          <span className="ml-2">Teléfono: {(item as SupplierDAO).phone}</span>
                        </>
                      )}

                    </div>
                  </div>

                  {onAddToCart && searchType === "products" && (
                    <CustomButton
                      text="Agregar"
                      style="bg-blue-500 text-white hover:bg-blue-600 text-sm px-3 py-1"
                      onClickButton={() => onAddToCart(item as ProductDAO)}
                    />
                  )}

                </li>
              ))}
            </ul>

          ) : (
            searchTerm && !isLoading && <p className="text-gray-500 text-sm">No se encontraron resultados.</p>
          )}

        </div>
      )}
      
    </div>
  );
};

export default SearchBarUniversal;