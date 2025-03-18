import React, { useState } from "react";
import Image from "next/image";
import { FilePenLine, Eye, QrCode, Menu } from "lucide-react";

import Dropdown from "../molecules/Dropdown";
import CustomButton from "../atoms/CustomButton";

interface CustomTableProps {
  title: string;
  headers: string[];
  options?: boolean;
  products: { [key: string]: string }[];
  onRowClick?: (product: string) => void;
}

export default function CustomTable({ title, headers, options, products, onRowClick }: CustomTableProps) {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleToggle = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const dropdownOptions = [
    { text: "Edit", icon: <FilePenLine size={20} /> },
    { text: "Bar code", icon: <QrCode size={20} /> },
    { text: "See", icon: <Eye size={20} /> },
  ];

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="relative w-full h-screen text-white flex justify-center items-center">
      {/* Imagen de fondo */}
      <Image 
        src="/Images/fondoHerooo.png" 
        alt="Background Image" 
        fill 
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

  <div className="relative w-full h-full bg-transparent rounded-lg shadow-lg p-4">
    <h2 className="text-2xl font-semibold p-4 border-b text-white">{title}</h2>

    <div className="overflow-x-auto">
      <table className="w-full border-collapse table-fixed">
        <thead className="bg-transparent border-b">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="p-3 text-left text-medium text-homePrimary-200">{header}</th>
            ))}
            {options && <th className="p-3 text-left text-medium text-homePrimary-200">Options</th>}
          </tr>
        </thead>

        <tbody>
          {paginatedProducts.map((product, index) => (
            <tr key={index} className="border-b hover:bg-homePrimary-300" onClick={() => onRowClick && onRowClick(product.id)}>
              {Object.values(product).map((value, idx) => (
                <td key={idx} className="p-3 text-homePrimary-200">{value}</td>
              ))}
              {options && (
                <td className="p-3 text-homePrimary-200 relative">
                  <Dropdown
                    icon={<Menu color="white" size={25} />}
                    options={dropdownOptions}
                    useIconButton={true}
                    isOpen={openDropdown === index}
                    onToggle={() => handleToggle(index)}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="flex justify-between items-center p-4">
      <CustomButton
        text="Previous"
        onClickButton={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        style="bg-homePrimary rounded disabled:opacity-50 hover:bg-blue-800"
        typeButton="button"
      />
      <div>
        <span className="text-homePrimary-200"> Page </span>
        <span className="text-homePrimary"> {currentPage} </span>
        <span className="text-homePrimary-200"> of </span>
        <span className="text-homePrimary"> {totalPages} </span>
      </div>

      <CustomButton
        text="Next"
        onClickButton={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        style="bg-homePrimary rounded disabled:opacity-50 hover:bg-blue-800"
        typeButton="button"
      />
    </div>
  </div>
</div>

  );
}
