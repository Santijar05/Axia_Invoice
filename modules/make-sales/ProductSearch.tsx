'use client';

import { getListproducts } from '@/lib/api-products';
import { ProductDAO } from '@/types/Api';
import { useState, useEffect, useRef } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  tax: number;
  stock: number;
}

interface ProductSearchProps {
  onSelect: (product: Product) => void;
  value: string;
  onChange: (value: string) => void;
}

export default function ProductSearch({ onSelect, value, onChange }: ProductSearchProps) {
  const [products, setProducts] = useState<ProductDAO[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductDAO[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const productSelectedRef = useRef(false); 

  const [productId, setProductId] = useState<string | null>(null); // Added state for productId

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getListproducts();
        if (res && Array.isArray(res)) {
          setProducts(res);
        }
      } catch (err) {
        console.error('Error al obtener productos:', err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (value.trim() === '') {
      setFilteredProducts([]);
      setIsDropdownOpen(false);
      return;
    }

    if (productSelectedRef.current) {
      productSelectedRef.current = false; 
      return;
    }

    const filtered = products
      .filter(product => product.name.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 5);
    
    setFilteredProducts(filtered);
    setIsDropdownOpen(filtered.length > 0);
  }, [value, products]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputFocus = () => {
    if (value && filteredProducts.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    productSelectedRef.current = false; 
    onChange(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleProductSelect = (product: ProductDAO, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    productSelectedRef.current = true; 
    onChange(product.name);
    onSelect({
      id: product.id,
      name: product.name,
      price: product.salePrice, 
      tax: product.tax,
      stock: product.stock,
    });

    // Update the onSelect handler to include productId
    setProductId(product.id); // Add productId to the item for API communication

    setIsDropdownOpen(false);
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        autoComplete="off"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Buscar producto..."
      />
      
      {isDropdownOpen && filteredProducts.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onMouseDown={(e) => handleProductSelect(product, e)} 
            >
              <div className="font-medium">{product.name}</div>
              <div className="text-sm text-gray-600">${product.salePrice.toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
