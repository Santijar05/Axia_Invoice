'use client';

import { useState } from 'react';

export default function EmployeeCategoriesPage() {
  // Predefined list of categories
  const [categories] = useState([
    'Electronics',
    'Furniture',
    'Office Supplies',
    'Books',
    'Food'
  ]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Categorías</h1>
      
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="font-medium mb-2">Lista de Categorías</h2>
        
        {categories.length > 0 ? (
          <ul className="divide-y">
            {categories.map((category, index) => (
              <li key={index} className="py-2">
                {category}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No hay categorías disponibles.</p>
        )}
      </div>
    </div>
  );
}