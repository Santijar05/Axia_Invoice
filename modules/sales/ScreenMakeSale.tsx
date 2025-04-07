'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";

import Input from '@/components/atoms/Input';
import { getListClients } from '@/lib/api-clients';
import { ClientDAO, SaleItem, Venta } from '@/types/Api';
import { crearFacturaVenta } from '@/lib/api-saleInvoce';
import SearchBarUniversal from '@/components/molecules/SearchBar';

export default function ScreenMakeSale() {
  const [selectedProductId, setSelectedProductId] = useState('');
  const [tenantIdProduct, settenantIdProduct] = useState('');
  const [clientes, setClientes] = useState<ClientDAO[]>([]);
  const [items, setItems] = useState<SaleItem[]>([]);
  const [clientId, setClientId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [nextId, setNextId] = useState(1);
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState(0);
  const [name, setName] = useState('');
  const [tax, setTax] = useState(0);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await getListClients();
        if (res && Array.isArray(res)) {
          setClientes(res);
        }
      } catch (err) {
        console.error('Error al obtener clientes:', err);
      }
    };

    fetchClients();
  }, []);

  const handleAddItem = () => {
    const priceValue = parseFloat(price);
    if (!name || isNaN(priceValue) || priceValue <= 0 || quantity <= 0) return;

    const existingIndex = items.findIndex(item => item.name === name);
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
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.quantity * item.basePrice), 0);
  };

  const calculateTaxTotal = () => {
    return items.reduce((total, item) => {
      const taxAmount = (item.price - item.basePrice) * item.quantity;
      return total + taxAmount;
    }, 0);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
  };

  const handleCompleteSale = async () => {
    if (items.length === 0) {
      alert('Agrega productos antes de completar la venta.');
      return;
    }

    const venta: Venta = {
      clientId,
      electronicBill: false,
      products: items.map(item => ({
        tenantId: item.tenantId,
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    try {
      const factura = await crearFacturaVenta(venta);
      alert(`Venta completada. ID factura: ${factura.id}`);
      setItems([]);
    } catch (error) {
      alert('Error al procesar la venta.');
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
          <h2 className="text-2xl font-semibold text-white">Nueva venta</h2>  
        </div>

        <div className="flex flex-row gap-6 flex-wrap mt-12">
        
          <div className="flex-1 min-w-[300px] border border-gray-600 bg-transparent p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-white">Añadir Items</h2>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-white">Producto</label>
                <SearchBarUniversal
                  onAddToCart={(product) => {
                    setName(product.name);
                    setPrice(product.salePrice.toString());
                    setStock(product.stock);
                    setTax(product.tax);
                    setSelectedProductId(product.id); 
                    settenantIdProduct(product.tenantId);
                  }}
                  showResults={true}
                  placeholder="Buscar productos para comprar..."
                  searchType="products"
                />
              </div>

              <div className="flex flex-row space-x-7">
                <div className="flex flex-col w-full">
                  <label className="mb-1 text-sm font-medium text-white">Cantidad</label>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                    placeholder="Ingrese la cantidad"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label className="mb-1 text-sm font-medium text-white">Precio sin impuesto</label>
                  <Input
                    type="number"
                    value={price}
                    disabled={true}
                    placeholder="Ingrese el precio"
                  />
                </div>
              </div>

              <button
                onClick={handleAddItem}
                disabled={!name}
                className="px-6 py-2 bg-homePrimary text-white rounded-md hover:bg-homePrimary-400 disabled:bg-gray-500 transition-colors w-full"
              >
                Añadir producto
              </button>
            </div>
          </div>
  
          <div className="flex-1 min-w-[300px] border border-gray-600 bg-transparent p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-white">Cliente</h2>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-white">Selecciona un cliente</label>
              <SearchBarUniversal
                searchType="clients"
                showResults={true}
                onAddToCart={(cliente) => {
                  setClientId(cliente.id);
                }}
                placeholder="Selecciona un cliente"
              />

            </div>
          </div>
        </div>

        <div className="mt-6 border border-gray-600 bg-transparent shadow-md rounded-lg p-6 w-full text-white min-h-[600px] max-h-[600px] flex flex-col">
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
    </div>
  );
}