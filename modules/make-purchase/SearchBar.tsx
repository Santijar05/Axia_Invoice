"use client";

import React, { useState } from "react";
import { useShoppingCart } from "@/store/ShoppingCart";
import CustomButton from "@/components/atoms/CustomButton";
import { ProductDAO } from "@/types/Api";

const mockProducts: ProductDAO[] = [
  // Add mock products here as needed
];

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useShoppingCart();

  // Use the mock products array instead of importing products
  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddToCart = (product: ProductDAO) => {
    addToCart({ 
      id: Number(product.id), 
      name: product.name,
      price: product.salePrice, 
      quantity: 1 
    });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2 border border-gray-300 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      {searchTerm && filteredProducts.length > 0 ? (
        <ul>
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center p-2 border-b"
            >
              <span className="text-black">
                {product.name} - ${product.salePrice}
              </span>

              <CustomButton
                text="Agregar"
                style="bg-blue-500 text-white hover:bg-blue-600"
                onClickButton={() => addToCart({ 
                  id: Number(product.id), 
                  name: product.name,
                  price: product.salePrice, 
                  quantity: 1 
                })}
              />

            </li>
          ))}
        </ul>
      ) : (
        searchTerm && <p className="text-gray-500">No se encontraron productos.</p>
      )}
    </div>
  );
};

export default SearchBar;