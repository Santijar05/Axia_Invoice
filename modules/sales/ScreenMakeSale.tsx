'use client';

import Image from "next/image";
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import InvoiceModal from './InvoiceModal';
import Input from '@/components/atoms/Input';
import { ProductDAO, SaleItem } from '@/types/Api';
import SearchBarUniversal from '@/components/molecules/SearchBar';
import CustomModalNoButton from '@/components/organisms/CustomModalNoButton';
import SaleTable from "./SaleComponents/SaleTable";
import SaleSummary from "./SaleComponents/SaleSummary";
import SaleForm from "./SaleComponents/SaleForm";

export default function ScreenMakeSale() {
  const t = useTranslations("makeSale");

  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [tenantIdProduct, settenantIdProduct] = useState('');
  const [items, setItems] = useState<SaleItem[]>([]);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [nextId, setNextId] = useState(1);
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState(0);
  const [name, setName] = useState('');
  const [tax, setTax] = useState(0);

  const resetSaleForm = () => {
    setItems([]);
    setName('');
    setQuantity(1);
    setPrice('');
    setStock(0);
    setTax(0);
    setProductId('');
    setNextId(1);
  };

  const handleAddItem = () => {
    const priceValue = parseFloat(price);
    if (!name || isNaN(priceValue) || priceValue <= 0 || quantity <= 0) return;

    const existingIndex = items.findIndex((item) => item.name === name);
    const basePriceValue = priceValue;
    const priceWithTax = priceValue * (1 + tax / 100);

    if (existingIndex !== -1) {
      const updatedItems = [...items];
      const existingItem = updatedItems[existingIndex];
      if (existingItem.quantity + quantity > stock) {
        alert(`${t("notEnoughStock")} ${stock}`);
        return;
      }
      existingItem.quantity += quantity;
      updatedItems[existingIndex] = existingItem;
      setItems(updatedItems);
    } else {
      if (quantity > stock) {
        alert(`${t("notEnoughStock")} ${stock}`);
        return;
      }

      const newItem: SaleItem = {
        id: nextId,
        tenantId: tenantIdProduct,
        productId: selectedProductId,
        name,
        quantity,
        stock,
        price: priceWithTax,
        basePrice: basePriceValue,
        tax,
      };
      setItems([...items, newItem]);
      setNextId(nextId + 1);
    }

    setName('');
    setQuantity(1);
    setPrice('');
    setStock(0);
    setTax(0);
    setProductId('');
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.basePrice, 0);
  };

  const calculateTaxTotal = () => {
    return items.reduce((total, item) => {
      const taxAmount = (item.price - item.basePrice) * item.quantity;
      return total + taxAmount;
    }, 0);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
  };

  const handleCompleteSale = async () => {
    if (items.length === 0) {
      alert(t("addBeforeComplete"));
      return;
    }

    setIsInvoiceModalOpen(true);
  };

  const handleSuccessSale = () => {
    resetSaleForm();
    alert(t("success"));
    window.location.reload();
    setIsInvoiceModalOpen(false);
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
          <h2 className="text-2xl font-semibold text-white">{t('title')}</h2>  
        </div>

        <div className="flex flex-row gap-6 flex-wrap mt-12">
          <SaleForm
            quantity={quantity}
            price={price}
            name={name}
            setQuantity={setQuantity}
            setName={setName}
            setPrice={setPrice}
            setStock={setStock}
            setTax={setTax}
            setSelectedProductId={setSelectedProductId}
            setTenantIdProduct={settenantIdProduct}
            handleAddItem={handleAddItem}
          />
        </div>

        <div className="mt-6 border border-gray-600 bg-transparent shadow-md rounded-lg p-6 w-full text-white min-h-[600px] max-h-[600px] flex flex-col">
          <SaleTable
            items={items}
            handleRemoveItem={handleRemoveItem}
            formatCurrency={formatCurrency}
          />

          <SaleSummary
            subtotal={calculateSubtotal()}
            taxTotal={calculateTaxTotal()}
            total={calculateTotal()}
            onCompleteSale={handleCompleteSale}
            disabled={items.length === 0}
            formatCurrency={formatCurrency}
          />
        </div>
      </div>

      <CustomModalNoButton
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        title={t('confirmSale')}
      >
        <InvoiceModal
          subtotal={calculateSubtotal()}
          taxTotal={calculateTaxTotal()}
          total={calculateTotal()}
          items={items}
          onSuccess={handleSuccessSale}
          onCancel={() => setIsInvoiceModalOpen(false)}
        />
      </CustomModalNoButton>
    </div>
  );
}