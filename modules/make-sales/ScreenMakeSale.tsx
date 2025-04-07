// ScreenMakeSale.tsx
'use client';

import { useState } from 'react';
import ProductSearch from './ProductSearch';
import CustomModalNoButton from '@/components/organisms/CustomModalNoButton';
import InvoiceModal from './InvoiceModal';

interface SaleItem {
  id: number;
  name: string;
  quantity: number;
  stock: number;
  tax: number;
  price: number;
  basePrice: number;
  productId: string;
}

export default function ScreenMakeSale() {
  const [items, setItems] = useState<SaleItem[]>([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState(0);
  const [tax, setTax] = useState(0);
  const [nextId, setNextId] = useState(1);
  const [productId, setProductId] = useState('');
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

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
        alert(`No hay suficiente stock. Disponible: ${stock}`);
        return;
      }
      existingItem.quantity += quantity;
      updatedItems[existingIndex] = existingItem;
      setItems(updatedItems);
    } else {
      if (quantity > stock) {
        alert(`No hay suficiente stock. Disponible: ${stock}`);
        return;
      }

      const newItem: SaleItem = {
        id: nextId,
        name,
        quantity,
        stock,
        price: priceWithTax,
        basePrice: basePriceValue,
        tax,
        productId,
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

  const handleCompleteSale = () => {
    if (items.length === 0) {
      alert('Agrega productos antes de completar la venta.');
      return;
    }
    setIsInvoiceModalOpen(true);
  };

  const handleSuccessSale = () => {
    resetSaleForm();
    alert('Venta completada con éxito.');
    window.location.reload();
    setIsInvoiceModalOpen(false);
  };

  return (
    <div className="w-full px-4 -mt-[20px] relative">
      <h1 className="text-2xl font-bold text-white mb-4">Nueva venta</h1>

      <div className="w-full space-y-6">
        <div className="shadow-md rounded-lg mt-8 w-full">
          <h2 className="text-xl font-semibold mb-4 text-white">Añadir Items</h2>

          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex flex-col flex-1 min-w-[200px]">
              <label className="mb-1 text-sm font-medium text-white">Producto</label>
              <ProductSearch
                onSelect={(product) => {
                  setName(product.name);
                  setPrice(product.price.toString());
                  setStock(product.stock);
                  setTax(product.tax);
                  setProductId(product.id);
                }}
                value={name}
                onChange={setName}
              />
            </div>

            <div className="flex flex-col min-w-[100px]">
              <label className="mb-1 text-sm font-medium text-white">Cantidad</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                min="1"
                className="px-3 py-2 border border-gray-600 rounded-md w-full bg-gray-900 text-white"
              />
            </div>

            <div className="flex flex-col min-w-[150px]">
              <label className="mb-1 text-sm font-medium text-white">Precio sin impuesto</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="px-3 py-2 border border-gray-600 rounded-md w-full bg-gray-900 text-white"
                placeholder="Precio base"
              />
            </div>

            <button
              onClick={handleAddItem}
              disabled={!name}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-500 transition-colors min-w-[180px]"
            >
              Añadir producto
            </button>
          </div>
        </div>

        <div className="bg-gray-800 shadow-md rounded-lg p-6 w-full text-white min-h-[600px] max-h-[600px] flex flex-col">
          <div className="overflow-x-auto border-b border-gray-700 flex-grow">
            {items.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr className="text-left">
                    <th className="px-4 py-2">Producto</th>
                    <th className="px-4 py-2">Cantidad</th>
                    <th className="px-4 py-2">Precio sin imp.</th>
                    <th className="px-4 py-2">Impuesto %</th>
                    <th className="px-4 py-2">Precio c/imp.</th>
                    <th className="px-4 py-2">Subtotal</th>
                    <th className="px-4 py-2">Acción</th>
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
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400 italic py-20">No hay productos aún.</p>
              </div>
            )}
          </div>

          <div className="pt-4 space-y-2 text-right">
            <div className="flex justify-between">
              <span className="font-medium">Subtotal:</span>
              <span>{formatCurrency(calculateSubtotal())}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Total Impuestos:</span>
              <span>{formatCurrency(calculateTaxTotal())}</span>
            </div>
            <div className="flex justify-between text-lg font-bold mt-2">
              <span>Total a pagar:</span>
              <span>{formatCurrency(calculateTotal())}</span>
            </div>

            <button
              onClick={handleCompleteSale}
              disabled={items.length === 0}
              className="w-full px-6 py-3 mt-4 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-500 transition-colors text-lg font-medium"
            >
              Finalizar venta
            </button>
          </div>
        </div>
      </div>

      <CustomModalNoButton
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        title="Confirmar Venta"
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