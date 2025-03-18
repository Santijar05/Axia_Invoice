'use client';

import { useState } from 'react';

interface Supplier {
  id: number;
  name: string;
}

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    { id: 1, name: 'ABC Distributors' },
    { id: 2, name: 'XYZ Supply Co' }
  ]);
  
  const [newSupplierName, setNewSupplierName] = useState('');
  const [nextId, setNextId] = useState(3);

  const handleAddSupplier = () => {
    if (newSupplierName.trim()) {
      setSuppliers([...suppliers, { id: nextId, name: newSupplierName }]);
      setNewSupplierName('');
      setNextId(nextId + 1);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Suppliers</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Add Supplier</h2>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={newSupplierName}
              onChange={(e) => setNewSupplierName(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter supplier name"
            />
            <button
              onClick={handleAddSupplier}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Suppliers List</h2>
          
          {suppliers.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {suppliers.map((supplier) => (
                <li key={supplier.id} className="py-3">
                  {supplier.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No suppliers added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}