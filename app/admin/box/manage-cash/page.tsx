'use client';

import { useState } from 'react';

export default function ManageCashPage() {
  const [cashAmount, setCashAmount] = useState(1000);
  const [newAmount, setNewAmount] = useState('');

  const handleAddCash = () => {
    const amount = parseFloat(newAmount);
    if (!isNaN(amount)) {
      setCashAmount(cashAmount + amount);
      setNewAmount('');
    }
  };

  const handleRemoveCash = () => {
    const amount = parseFloat(newAmount);
    if (!isNaN(amount) && amount <= cashAmount) {
      setCashAmount(cashAmount - amount);
      setNewAmount('');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Cash Management</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Current Cash</h2>
          <p className="text-3xl font-bold text-green-600">${cashAmount.toFixed(2)}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block mb-2 text-sm font-medium">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter amount"
          />
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleAddCash}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Cash
          </button>
          <button
            onClick={handleRemoveCash}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Remove Cash
          </button>
        </div>
      </div>
    </div>
  );
}