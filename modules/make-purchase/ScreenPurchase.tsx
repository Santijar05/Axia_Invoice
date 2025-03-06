"use client";

import React from "react";

import { useShoppingCart } from "@/store/ShoppingCart";
import CustomButton from "@/components/atoms/CustomButton";
import SearchBar from "./SearchBar";

export default function ScreenPurchase() {
  const { cart, removeFromCart, clearCart } = useShoppingCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="w-full mx-auto mt-8 p-10">
      <h1 className="text-3xl font-bold mb-6 text-black">Tienda</h1>
      
      <div className="grid grid-cols-2 gap-8">
        <SearchBar />
        
        <div className="bg-white rounded-lg shadow-md p-4 mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-black">Detalle de Compra</h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">El carrito está vacío.</p>
          ) : (
            <>
              <ul>
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between items-center p-2 border-b">
                    <span className="text-black">{item.name} x {item.quantity}</span>
                    <CustomButton
                      text="Eliminar"
                      onClickButton={() => removeFromCart(item.id)}
                      style="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      typeButton="button"
                    />
                  </li>
                ))}
              </ul>

              <div className="flex justify-between mt-4">
                <span className="text-xl font-bold text-black">Total: ${total}</span>
                <CustomButton
                  text="Vaciar Carrito"
                  onClickButton={clearCart}
                  style="bg-red-600 text-white rounded hover:bg-red-700"
                  typeButton="button"
                />
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  );
};

