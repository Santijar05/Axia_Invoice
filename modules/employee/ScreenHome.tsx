"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl";
import MetricCards from "@/components/molecules/MetricCard"
import CustomTable from "@/components/organisms/CustomTable"

export default function DashboardPage() {
  const [tableData, setTableData] = useState<{ [key: string]: string }[]>([]);
  const t = useTranslations("EmployeeDashboard");

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
          title={t("latestProducts")} 
          headers={[
            { key: "distributor", label: t("distributor") },
            { key: "product", label: t("product") },
            { key: "brand", label: t("brand") },
            { key: "stock", label: t("stock") },
            { key: "price", label: t("price") }
          ]}
          options={false} 
          data={tableData}
          contextType="products"
        />

      </div>
    </div>
  )
}