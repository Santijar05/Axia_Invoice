import React, { useState } from "react";
import { FilePenLine, Eye, QrCode, Menu } from "lucide-react";

import Dropdown from "../molecules/Dropdown";
import CustomButton from "../atoms/CustomButton";

interface CustomTableProps {
  title: string;
  headers: string[];
  options?: boolean;
  products: { [key: string]: string }[];
}

export default function CustomTable({ title, headers, options, products }: CustomTableProps) {
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
    <div className="bg-white rounded-lg shadow-sm mb-8 pl-4 pr-4">
      <h2 className="text-2xl font-semibold p-4 border-b text-black top-0 bg-white z-10">{title}</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-fixed">

          <thead className="bg-gray-100 border-b ">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="p-3 text-left text-medium text-black break-words">{header}</th>
              ))}
              {options && <th className="p-3 text-left text-medium text-black">Options</th>}
            </tr>
          </thead>

          <tbody>
            {paginatedProducts.map((product, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">

                {Object.values(product).map((value, idx) => (
                  <td key={idx} className="p-3 text-black break-words">{value}</td>
                ))}

                {options && (
                  <td className="p-3 text-black relative">
                    <Dropdown
                      icon={<Menu color="black" size={25} />}
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
          style="bg-tertiary rounded disabled:opacity-50 hover:bg-blue-800"
          typeButton="button"
        />

        <div>
          <span className="text-black"> Page </span>
          <span className="text-tertiary"> {currentPage} </span>
          <span className="text-black"> of </span>
          <span className="text-tertiary"> {totalPages} </span>
        </div>

        <CustomButton
          text="Next"
          onClickButton={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          style="bg-tertiary rounded disabled:opacity-50 hover:bg-blue-800"
          typeButton="button"
        />
      </div>

    </div>
  );
}
