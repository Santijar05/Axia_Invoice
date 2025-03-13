"use client";

import React, { useState } from "react";
import { products } from "./products";
import { useShoppingCart } from "@/store/ShoppingCart";
import CustomButton from "@/components/atoms/CustomButton";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useShoppingCart();

  // Filtrar productos basados en el término de búsqueda
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manejar el cambio en el input de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Manejar la adición de un producto al carrito
  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2 border border-gray-300 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      {/* Resultados de la búsqueda */}
      {searchTerm && (
        <div>
          {filteredProducts.length > 0 ? (
            <ul>
              {filteredProducts.map((product) => (
                <li
                  key={product.id}
                  className="flex justify-between items-center p-2 border-b hover:bg-gray-200 transition-colors"
                >
                  <span className="text-black">
                    {product.name} - ${product.price}
                  </span>

                  <CustomButton
                    text="Agregar"
                    style="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded"
                    onClickButton={() => handleAddToCart(product)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No se encontraron productos.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;