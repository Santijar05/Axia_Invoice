'use client'
import React, { useState } from "react";
import Image from "next/image";
import { FilePenLine, Eye, Menu, Trash2 } from "lucide-react"; 

import Dropdown from "../molecules/Dropdown";
import CustomButton from "../atoms/CustomButton";

interface CustomTableProps {
  title: string;
  headers: string[];
  options?: boolean;
  data?: { [key: string]: string }[];
  onRowClick?: (id: string) => void;
  contextType?: 'clients' | 'employees' | 'products' | 'suppliers';
  customActions?: {
    edit?: (id: string) => void;
    view?: (id: string) => void;
    delete?: (id: string) => void; 
  };
  actionLabels?: {
    edit?: string;
    view?: string;
    delete?: string; 
  };
}

export default function CustomTable({ 
  title, 
  headers, 
  options, 
  data = [], 
  onRowClick,
  contextType = 'products',
  customActions,
  actionLabels = {
    edit: contextType === 'clients' ? 'Edit Client' : 
          contextType === 'employees' ? 'Edit Employee' : 'Edit',
    view: contextType === 'clients' ? 'View Client' : 
          contextType === 'employees' ? 'View Employee' : 'View',
    delete: contextType === 'clients' ? 'Delete Client' : 
            contextType === 'employees' ? 'Delete Employee' : 'Delete' 
  }
}: CustomTableProps) {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleToggle = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleEdit = (id: string) => {
    if (customActions?.edit) {
      customActions.edit(id);
    } else {
      console.log(`Editing ${contextType} with ID:`, id);
    }
  };

  const handleView = (id: string) => {
    if (customActions?.view) {
      customActions.view(id);
    } else {
      console.log(`Viewing ${contextType} with ID:`, id);
    }
  };

  const handleDelete = (id: string) => {
    if (customActions?.delete) {
      if (confirm(`Are you sure you want to delete this ${contextType}?`)) {
        customActions.delete(id);
      }
    } else {
      console.log(`Delete action triggered for ${contextType} with ID:`, id);
    }
  };

  const safeData = Array.isArray(data) ? data : [];
  const totalPages = Math.ceil(safeData.length / itemsPerPage);
  const paginatedData = safeData.slice(
    (currentPage - 1) * itemsPerPage, 
    Math.min(currentPage * itemsPerPage, safeData.length)
  );

  return (
    <div className="relative w-full h-screen text-white flex justify-center items-center">
      <Image 
        src="/Images/fondoHerooo.png" 
        alt="Background Image" 
        fill 
        className="absolute top-0 left-0 w-full h-full object-cover"
        priority
      />

      <div className="relative w-full h-full bg-transparent rounded-lg shadow-lg p-4">
        <h2 className="text-2xl font-semibold p-4 border-b text-white">{title}</h2>

        <div className="overflow-x-auto pb-10">
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
              {paginatedData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-homePrimary-300">
                  {headers.map((header, idx) => (
                    <td key={idx} className="p-3 text-homePrimary-200">
                      {item[header.toLowerCase()] || '-'}
                    </td>
                  ))}
                  {options && (
                    <td className="p-3 text-homePrimary-200 relative" onClick={(e) => e.stopPropagation()}>
                      <Dropdown
                        icon={<Menu color="white" size={25} />}
                        options={[
                          { 
                            text: actionLabels.edit || 'Edit', 
                            icon: <FilePenLine size={20} />,
                            action: () => handleEdit(item.id)
                          },
                          { 
                            text: actionLabels.view || 'View', 
                            icon: <Eye size={20} />,
                            action: () => handleView(item.id)
                          },
                          { 
                            text: actionLabels.delete || 'Delete', 
                            icon: <Trash2 size={20} className="text-red-400" />,
                            action: () => handleDelete(item.id),
                          }
                        ]}
                        useIconButton={true}
                        isOpen={openDropdown === index}
                        onToggle={() => handleToggle(index)}
                        isLastItem={index === paginatedData.length - 1}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-between items-center p-4">
            <CustomButton
              text="Previous"
              onClickButton={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              style="bg-homePrimary rounded disabled:opacity-50 hover:bg-blue-800"
              typeButton="button"
              disabled={currentPage === 1}
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
              disabled={currentPage === totalPages}
            />
          </div>
        )}
      </div>
    </div>
  );
}