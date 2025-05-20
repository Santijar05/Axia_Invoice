'use client';

import Image from "next/image";
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import InvoiceModal from './InvoiceModal';
import Input from '@/components/atoms/Input';
import { ProductDAO, SaleItem } from '@/types/Api';
import SearchBarUniversal from '@/components/molecules/SearchBar';
import CustomModalNoButton from '@/components/organisms/CustomModalNoButton';

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
        
          <div className="flex-1 min-w-[300px] border border-gray-600 bg-transparent p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-white">{t('addItems')}</h2>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-white">{t('product')}</label>
                
                <SearchBarUniversal
                  searchType="products"
                  onAddToCart={(item) => {
                    const product = item as ProductDAO;  
                    setName(product.name);
                    setPrice(product.salePrice.toString());
                    setStock(product.stock);
                    setTax(product.tax);
                    setSelectedProductId(product.id);
                    settenantIdProduct(product.tenantId);
                  }}
                  
                  showResults={true}
                  placeholder={t('searchPlaceholder')}
                />

              </div>

              <div className="flex flex-row space-x-7">
                <div className="flex flex-col w-full">
                  <label className="mb-1 text-sm font-medium text-white">{t("quantity")}</label>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                    placeholder={t('quantityPlaceholder')}
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label className="mb-1 text-sm font-medium text-white">{t("apricewTx")}</label>
                  <Input
                    type="number"
                    value={price}
                    disabled={true}
                    placeholder={t('pricePlaceholder')}
                  />
                </div>
              </div>

              <button
                onClick={handleAddItem}
                disabled={!name}
                className="px-6 py-2 bg-homePrimary text-white rounded-md hover:bg-homePrimary-400 disabled:bg-gray-500 transition-colors w-full"
              >
                {t('addProduct')}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 border border-gray-600 bg-transparent shadow-md rounded-lg p-6 w-full text-white min-h-[600px] max-h-[600px] flex flex-col">
          <div className="overflow-x-auto border-b border-gray-700 flex-grow">
            {items.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr className="text-left">
                    <th className="px-4 py-2">{t('table.product')}</th>
                    <th className="px-4 py-2">{t('table.quantity')}</th>
                    <th className="px-4 py-2">{t('table.priceNoTax')}</th>
                    <th className="px-4 py-2">{t('table.tax')}</th>
                    <th className="px-4 py-2">{t('table.priceWithTax')}</th>
                    <th className="px-4 py-2">{t('table.subtotal')}</th>
                    <th className="px-4 py-2">{t('table.action')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2">{formatCurrency(item.basePrice)}</td>
                      <td className="px-4 py-2">{item.tax}%</td>
                      <td className="px-4 py-2">{formatCurrency(item.price)}</td>
                      <td className="px-4 py-2">{formatCurrency(item.quantity * item.price)}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-400 hover:text-red-600 px-3 py-1 rounded hover:bg-red-900/30 transition-colors"
                        >
                          {t('remove')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400 italic py-20">{t('noItems')}</p>
              </div>
            )}
          </div>

          <div className="pt-4 space-y-2 text-right">
            <div className="flex justify-between">
              <span className="font-medium">{t('subtotal')}:</span>
              <span>{formatCurrency(calculateSubtotal())}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">{t('totalTaxes')}:</span>
              <span>{formatCurrency(calculateTaxTotal())}</span>
            </div>
            <div className="flex justify-between text-lg font-bold mt-2">
              <span>{t('totalToPay')}:</span>
              <span>{formatCurrency(calculateTotal())}</span>
            </div>

            <button
              onClick={handleCompleteSale}
              disabled={items.length === 0}
              className="w-full px-6 py-3 mt-4 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-500 transition-colors text-lg font-medium"
            >
              {t('completeSale')}
            </button>
          </div>
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