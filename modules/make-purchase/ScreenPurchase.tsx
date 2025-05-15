"use client";

import { useTranslations } from "next-intl";
import React, { useState } from "react";
import Image from "next/image";

import SearchBarUniversal from "@/components/molecules/SearchBar";
import CustomButton from "@/components/atoms/CustomButton";
import { useShoppingCart } from "@/store/ShoppingCart";
import Input from "@/components/atoms/Input";
import { ProductDAO } from "@/types/Api";

export default function ScreenPurchase() {
  const { cart, addToCart, removeFromCart, clearCart } = useShoppingCart();
  const [selectedProduct, setSelectedProduct] = useState<ProductDAO | null>(null);
  const [purchasePrice, setPurchasePrice] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);
  const t = useTranslations("purchase");

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleAddToCart = (item: any) => {
    const product = item as ProductDAO;
    addToCart({
      id: parseInt(product.id),
      quantity: quantity,
      tax: product.tax,
      name: product.name,
      supplier: product.supplier,
      price: product.salePrice,
      basePrice: product.purchasePrice,
    });
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });
  };

  return (
    <div className="relative w-full min-h-screen text-white flex justify-center">
      <Image 
        src="/Images/fondoHerooo.png" 
        alt="Background Image" 
        fill 
        className="absolute top-0 left-0 w-full h-full object-cover"
        priority
      />

      <div className="relative w-full my-6 bg-blac bg-opacity-50 rounded-lg shadow-lg mt-5">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">{t("title")}</h2>  
        </div>

        <div className="flex flex-row gap-6 flex-wrap mt-12">
        
          <div className="flex-1 min-w-[300px] border border-gray-600 bg-transparent p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-white">{t("addItem")}</h2>
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-white">{t("productLabel")}</label>
                  
                <SearchBarUniversal 
                  onAddToCart={(item) => {
                    const product = item as ProductDAO;
                    setSelectedProduct(product);
                    setPurchasePrice(product.purchasePrice);
                  }} 
                  showResults={true}
                  placeholder={t("productPlaceholder")}
                  searchType="products"
                />
              </div>

              <div className="flex flex-row space-x-7">
                <div className="flex flex-col w-full">
                  <label className="mb-1 text-sm font-medium text-white">{t("quantityLabel")}</label>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                    placeholder={t("quantityPlaceholder")}
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label className="mb-1 text-sm font-medium text-white">{t("purchasePriceLabel")}</label>
                  <Input
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(parseFloat(e.target.value))}
                    placeholder={t("pricePlaceholder")}
                  />
                </div>
              </div>

              <button
                className="px-6 py-2 bg-homePrimary border text-white rounded-md hover:bg-homePrimary-400 disabled:bg-gray-500 transition-colors w-full"
                onClick={() => {
                  if (!selectedProduct) return;
                  handleAddToCart(selectedProduct);
                  setSelectedProduct(null);
                  setQuantity(1);
                  setPurchasePrice(0);
                }}
                disabled={!selectedProduct}
              >
                {t("addProductButton")}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 border border-gray-600 bg-transparent shadow-md rounded-lg p-6 w-full text-white min-h-[600px] max-h-[600px] flex flex-col">
          <h2 className="text-xl font-semibold mb-4 ">{t("purchaseDetailTitle")}</h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">{t("emptyCart")}</p>
          ) : (
            <>
            <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr className="text-left">
                    <th className="px-4 py-2">{t("product")}</th>
                    <th className="px-4 py-2">{t("quantity")}</th>
                    <th className="px-4 py-2">{t("basePrice")}</th>
                    <th className="px-4 py-2">{t("tax")}</th>
                    <th className="px-4 py-2">{t("priceWithTax")}</th>
                    <th className="px-4 py-2">{t("subtotal")}</th>
                    <th className="px-4 py-2">{t("action")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2">{formatCurrency(item.basePrice)}</td>
                      <td className="px-4 py-2">{item.tax}%</td>
                      <td className="px-4 py-2">{formatCurrency(item.price)}</td>
                      <td className="px-4 py-2">{formatCurrency(item.quantity * item.price)}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-600 px-3 py-1 rounded hover:bg-red-900/30 transition-colors"
                        >
                          {t("delete")}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between mt-4">
                <span className="text-lg font-bold text-white">{t("total")}: ${total}</span>
                <CustomButton
                  text={t("clearCart")}
                  onClickButton={clearCart}
                  style="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
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

