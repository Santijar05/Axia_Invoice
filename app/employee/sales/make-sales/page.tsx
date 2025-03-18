'use client';

import { useState } from 'react';

interface SaleItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export default function EmployeeMakeSalesPage() {
  const [items, setItems] = useState<SaleItem[]>([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('');
  const [nextId, setNextId] = useState(1);

  const handleAddItem = () => {
    if (name && price) {
      const priceValue = parseFloat(price);
      if (!isNaN(priceValue) && priceValue > 0 && quantity > 0) {
        const newItem: SaleItem = {
          id: nextId,
          name,
          quantity,
          price: priceValue
        };
        setItems([...items, newItem]);
        setNextId(nextId + 1);
        setName('');
        setQuantity(1);
        setPrice('');
      }
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  const handleCompleteSale = () => {
    if (items.length > 0) {
      alert(`Venta completada! Total: $${calculateTotal().toFixed(2)}`);
      setItems([]);
    } else {
      alert('Por favor agregue productos a la venta.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Crear Venta</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Form to add items */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-medium mb-3">Agregar Producto</h2>
          
          <div className="space-y-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Nombre del producto"
            />
            
            <div className="flex gap-2">
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                min="1"
                className="w-1/2 p-2 border rounded"
                placeholder="Cantidad"
              />
              
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                step="0.01"
                className="w-1/2 p-2 border rounded"
                placeholder="Precio"
              />
            </div>
            
            <button
              onClick={handleAddItem}
              className="w-full p-2 bg-blue-600 text-white rounded"
            >
              Agregar
            </button>
          </div>
        </div>
        
        {/* Current sale */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-medium mb-3">Venta Actual</h2>
          
          {items.length > 0 ? (
            <>
              <div className="max-h-60 overflow-y-auto">
                <table className="w-full mb-4">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left">Producto</th>
                      <th className="text-right">Cant</th>
                      <th className="text-right">Precio</th>
                      <th className="text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-1">{item.name}</td>
                        <td className="text-right">{item.quantity}</td>
                        <td className="text-right">${item.price.toFixed(2)}</td>
                        <td className="text-right">${(item.quantity * item.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="border-t pt-2 flex justify-between items-center">
                <span className="font-bold">TOTAL:</span>
                <span className="font-bold text-lg">${calculateTotal().toFixed(2)}</span>
              </div>
              
              <button
                onClick={handleCompleteSale}
                className="w-full mt-4 p-2 bg-green-600 text-white rounded"
              >
                Completar Venta
              </button>
            </>
          ) : (
            <p className="text-gray-500">No hay productos en esta venta.</p>
          )}
        </div>
      </div>
    </div>
  );
}