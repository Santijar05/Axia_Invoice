"use client"

import { useEffect, useState } from "react"
import MetricCards from "@/src/components/molecules/MetricCard"
import CustomTable from "@/src/components/organisms/CustomTable"

export default function DashboardPage() {
  const [tableData, setTableData] = useState<{ [key: string]: string }[]>([]);

  useEffect(() => {
    const mockData = Array(8).fill(null).map((_, index) => ({
      id: `prod-${index + 1}`,
      distributor: `Distribuidor ${index + 1}`,
      product: `Producto ${String.fromCharCode(65 + index)}`,
      brand: ["Nike", "Adidas", "Puma", "Reebok"][index % 4],
      stock: `${Math.floor(Math.random() * 100)}`,
      price: `$${(Math.random() * 100 + 10).toFixed(2)}`
    }));
    
    setTableData(mockData);
  }, []);

  return (
    <div className="p-4">
      <MetricCards />
      <div className="pt-10">
        <CustomTable 
          title="Últimos Productos" 
          headers={["Distribuidor", "Producto", "Marca", "Stock", "Precio"]}
          options={false} 
          data={tableData}
          contextType="products"
        />
      </div>
    </div>
  )
}