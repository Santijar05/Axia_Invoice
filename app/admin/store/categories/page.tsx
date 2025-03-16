'use client';

import { useState } from 'react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([
    'Electronics',
    'Furniture',
    'Office Supplies'
  ]);
  
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="flex-1 px-3 py-2 border rounded"
            placeholder="New category name"
          />
          <button
            onClick={handleAddCategory}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="font-medium mb-2">Category List</h2>
        <ul className="divide-y">
          {categories.map((category, index) => (
            <li key={index} className="py-2">
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}