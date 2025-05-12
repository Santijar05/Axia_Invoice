"use client";
import React from "react";
import { EmployeeDAO } from "@/types/Api";
import CustomButton from "@/src/components/atoms/CustomButton";

interface EmployeeDetailModalProps {
  employee: EmployeeDAO | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EmployeeDetailModal({ 
  employee, 
  isOpen, 
  onClose 
}: EmployeeDetailModalProps) {
  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative w-full max-w-2xl bg-black bg-opacity-90 rounded-lg shadow-lg p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Detalle del empleado</h2>
          <CustomButton
            text="Cerrar"
            style="bg-tertiary text-white hover:bg-blue-800"
            onClickButton={onClose}
          />
        </div>
        
        <div className="bg-black bg-opacity-30 p-6 rounded-lg border border-gray-800">
          <h3 className="font-bold text-2xl mb-3 text-tertiary text-center">{employee.name}</h3>
          <p className="text-sm text-gray-300 text-center mb-10">ID: {employee.id}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 border border-gray-600 rounded-lg">
              <p className="text-sm font-semibold text-gray-400 mb-2">Email</p>
              <p className="text-white">{employee.email}</p>
            </div>
            <div className="p-4 border border-gray-600 rounded-lg">
              <p className="text-sm font-semibold text-gray-400 mb-2">Cargo</p>
              <p className="text-white">{employee.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}