"use client";

import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import Image from "next/image";

import SearchBarUniversal from "@/components/molecules/SearchBar";
import { Compra, ProductDAO, SaleItemForAPI } from "@/types/Api";
import CustomButton from "@/components/atoms/CustomButton";
import { useShoppingCart } from "@/store/ShoppingCart";
import { crearCompra } from "@/lib/api-purchase";
import Input from "@/components/atoms/Input";

export default function ScreenPurchase() {
  const { user } = useAuth();
  
  const [selectedProduct, setSelectedProduct] = useState<ProductDAO | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<any | null>(null);
  const { cart, addToCart, removeFromCart, clearCart } = useShoppingCart();
  const [purchasePrice, setPurchasePrice] = useState<number>(0);
  const [searchResetKey, setSearchResetKey] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const isSupplierDisabled = cart.length > 0;
  const t = useTranslations("purchase");

  const total = cart.reduce((acc, item) => acc + item.purchasePrice * item.quantity, 0);

  const handleAddToCart = (item: any) => {
    const product = item as ProductDAO;
    addToCart({
      id: product.id,
      quantity: quantity,
      tax: product.tax,
      name: product.name,
      supplier: product.supplier,
      salePrice: product.salePrice,
      purchasePrice: product.purchasePrice,
      tenantId: user?.tenantId || '',
      stock: product.stock
    });
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });
  };

  const handleConfirmPurchase = async () => {
    const productsForAPI: SaleItemForAPI[] = cart.map(item => ({
      tenantId: user?.tenantId || '', 
      productId: item.id.toString() || '',
      quantity: item.quantity
    }));

    try {
      const compra: Compra = {
        tenantId: user?.tenantId || '',
        supplierId: cart[0]?.supplier?.id, 
        totalPrice: total,
        electronicBill: false,
        products: productsForAPI
      };

      const created = await crearCompra(compra);
      console.log("Compra creada:", created);
      clearCart();
      alert("¡Compra realizada con éxito!");
    } catch (error) {
      console.error("Error al crear la compra:", error);
      alert("Hubo un error al realizar la compra.");
    }
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

              <div className="flex flex-col w-full">
                <label className="mb-1 text-sm font-medium text-white">{t("supplierLabel")}</label>
                  
                <SearchBarUniversal 
                  onAddToCart={(item) => {
                    const supplier = item as any; 
                    setSelectedSupplier(supplier.id);
                    clearCart(); 
                  }} 
                  showResults={true}
                  placeholder={t("supplierPlaceholder")}
                  searchType="suppliers"
                  disabled={isSupplierDisabled}
                />
              </div>

              <div className="flex flex-row space-x-7">

                <div className="flex flex-col w-full">
                  <label className="mb-1 text-sm font-medium text-white">{t("productLabel")}</label>
                    
                  <SearchBarUniversal 
                    resetTrigger={searchResetKey}
                    onAddToCart={(item) => {
                      const product = item as ProductDAO;
                      setSelectedProduct(product);
                      setPurchasePrice(product.purchasePrice);
                    }} 
                    showResults={true}
                    placeholder={t("productPlaceholder")}
                    searchType="products"
                    supplierIdFilter={selectedSupplier}
                  />

                </div>

                <div className="flex flex-col w-full">
                  <label className="mb-1 text-sm font-medium text-white">{t("quantityLabel")}</label>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                    placeholder={t("quantityPlaceholder")}
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
                  setSearchResetKey(prev => prev + 1);
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
                      <td className="px-4 py-2">{formatCurrency(item.purchasePrice)}</td>
                      <td className="px-4 py-2">{item.tax}%</td>
                      <td className="px-4 py-2">{formatCurrency(item.salePrice)}</td>
                      <td className="px-4 py-2">{formatCurrency(item.quantity * item.salePrice)}</td>
                      <td className="px-4 py-2 flex space-x-2">
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

        <CustomButton
          text={t("confirmPurchase")}
          onClickButton={handleConfirmPurchase}
          style={`px-6 py-2 bg-homePrimary border text-white rounded-md hover:bg-homePrimary-400 disabled:bg-gray-500 transition-colors w-full`}
          typeButton="button"
          disabled={cart.length === 0}
        />

      </div>
    </div>
  );
};

