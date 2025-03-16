'use client';

import { useState } from 'react';

interface SaleItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export default function MakeSalesPage() {
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

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  const handleCompleteSale = () => {
    if (items.length > 0) {
      alert(`Sale completed! Total: $${calculateTotal().toFixed(2)}`);
      setItems([]);
    } else {
      alert('Please add items to the sale first.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Make a Sale</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Add Items</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Product Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter product name"
              />
            </div>
            
            <div>
              <label htmlFor="quantity" className="block mb-2 text-sm font-medium">
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label htmlFor="price" className="block mb-2 text-sm font-medium">
                Price
              </label>
              <input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter price"
                step="0.01"
              />
            </div>
            
            <button
              onClick={handleAddItem}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Item
            </button>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Current Sale</h2>
          
          {items.length > 0 ? (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Product</th>
                      <th className="px-4 py-2 text-left">Qty</th>
                      <th className="px-4 py-2 text-left">Price</th>
                      <th className="px-4 py-2 text-left">Total</th>
                      <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">{item.quantity}</td>
                        <td className="px-4 py-2">${item.price.toFixed(2)}</td>
                        <td className="px-4 py-2">${(item.quantity * item.price).toFixed(2)}</td>
                        <td className="px-4 py-2">
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium">Total:</span>
                  <span className="text-lg font-bold">${calculateTotal().toFixed(2)}</span>
                </div>
                
                <button
                  onClick={handleCompleteSale}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Complete Sale
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 italic">No items added to this sale yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}