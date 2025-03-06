"use client";

import React, { useState } from "react";

import { products } from "./products";
import { useShoppingCart } from "@/store/ShoppingCart";
import CustomButton from "@/components/atoms/CustomButton";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useShoppingCart();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border border-gray-300 rounded w-full mb-4"
      />
      
      {searchTerm && filteredProducts.length > 0 ? (
        <ul>
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center p-2 border-b"
            >
              <span className="text-black">
                {product.name} - ${product.price}
              </span>

              <CustomButton
                text="Agregar"
                style="bg-blue-500 text-white hover:bg-blue-600"
                onClickButton={() => addToCart({ ...product, quantity: 1 })}
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
