'use client';

import { useState } from 'react';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([
    'John Doe',
    'Jane Smith',
    'Robert Johnson'
  ]);
  
  const [newCustomer, setNewCustomer] = useState('');

  const handleAddCustomer = () => {
    if (newCustomer.trim()) {
      setCustomers([...customers, newCustomer]);
      setNewCustomer('');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newCustomer}
            onChange={(e) => setNewCustomer(e.target.value)}
            className="flex-1 px-3 py-2 border rounded"
            placeholder="New customer name"
          />
          <button
            onClick={handleAddCustomer}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="font-medium mb-2">Customer List</h2>
        <ul className="divide-y">
          {customers.map((customer, index) => (
            <li key={index} className="py-2">
              {customer}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}