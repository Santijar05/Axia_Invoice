'use client';

import { useState } from 'react';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([
    'Alice Johnson',
    'Bob Smith',
    'Carlos Rodriguez'
  ]);
  
  const [newEmployee, setNewEmployee] = useState('');

  const handleAddEmployee = () => {
    if (newEmployee.trim()) {
      setEmployees([...employees, newEmployee]);
      setNewEmployee('');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newEmployee}
            onChange={(e) => setNewEmployee(e.target.value)}
            className="flex-1 px-3 py-2 border rounded"
            placeholder="New employee name"
          />
          <button
            onClick={handleAddEmployee}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="font-medium mb-2">Employee List</h2>
        <ul className="divide-y">
          {employees.map((employee, index) => (
            <li key={index} className="py-2">
              {employee}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}