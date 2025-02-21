import React, { useState } from "react";
import {FilePenLine, Eye, QrCode } from "lucide-react";

import DropdownMenu from "../molecules/DropdownMenu";

interface CustomTableProps {
  title: string;
  headers: string[];
  options?: boolean;
  products: { [key: string]: string }[];
}

export default function CustomTable({ title, headers, options, products }: CustomTableProps) {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const dropdownOptions = [
    { text: "Edit", icon: <FilePenLine size={20}/> },
    { text: "Bar code", icon: <QrCode size={20} /> },
    { text: "See", icon: <Eye size={20}/> },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm mb-8">
      <h2 className="text-2xl font-semibold p-4 border-b text-black">{title}</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">

          <thead className="bg-gray-100 border-b">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="p-3 text-left text-medium text-black">{header}</th>
              ))}
              {options && <th className="p-3 text-left text-medium text-black">Options</th>}
            </tr>
          </thead>

          <tbody>

            {products.map((product, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">

                {Object.values(product).map((value, idx) => (
                  <td key={idx} className="p-3 text-black">{value}</td>
                ))}

                {options && (
                  <td className="p-3 text-black relative">
                    <DropdownMenu
                      options={dropdownOptions}
                      isOpen={openDropdown === index}
                      onToggle={() => setOpenDropdown(openDropdown === index ? null : index)}
                    />
                  </td>
                )}

              </tr>
            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
}
