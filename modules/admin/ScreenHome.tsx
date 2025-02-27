"use client"

import { useEffect, useState } from "react"

import MetricCards from "@/components/molecules/MetricCard"
import CustomTable from "@/components/organisms/CustomTable"

export default function DashboardPage() {
  const [products, setProducts] = useState<{ [key: string]: string }[]>([]);

  useEffect(() => {
    setProducts(
      Array(8).fill({
        distributor: "Test",
        product: "Test",
        brand: "Test",
        stock: "Test",
        price: "Test",
      })
    );
  }, []);

  return (
    <>
      <MetricCards />
      <div className="pt-10">
        <CustomTable 
          title= "Lastest products" 
          headers= {["Bar/Internal", "Product", "Brand", "Stock", "Price"]}
          options={false} 
          products={products} 
        />
      </div>
      {/*<SalesCharts />*/}
    </>
  )
}
