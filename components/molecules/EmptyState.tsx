import React from 'react';
import { HiMiniMagnifyingGlassCircle } from 'react-icons/hi2';

interface EmptyStateProps {
  message: string;
  searchTerm?: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message, 
  searchTerm, 
  icon = <HiMiniMagnifyingGlassCircle size={38} className="text-homePrimary-100" />
}) => {
  return (
    <div className="w-full py-12 flex flex-col items-center justify-center bg-transparent border border-homePrimary-400 rounded-md shadow-sm">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-homePrimary-200 mb-2">{message}</h3>
      {searchTerm && (
        <p className="text-homePrimary-100">
          No se encontraron resultados para: <span className="font-medium">"{searchTerm}"</span>
        </p>
      )}
    </div>
  );
};

export default EmptyState;