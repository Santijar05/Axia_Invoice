"use client"

import { useEffect, useState } from "react"

import MetricCards from "@/modules/homePage/MetricCard"
import HomeBox from "../../components/organisms/HomeBox"
import CustomTable from "@/components/organisms/CustomTable"
import SalesCharts from "@/components/organisms/SalesCharts"

export default function DashboardPage() {
  const [products, setProducts] = useState<{ [key: string]: string }[]>([]);

  useEffect(() => {
    setProducts(
      Array(8).fill({
        distributor: "Test",
        product: "Test",
        brand: "Test",
        presentation: "Test",
        batch: "Test",
        stock: "Test",
        price: "Test",
      })
    );
  }, []);

  return (
    <HomeBox>
      <MetricCards />
      <CustomTable 
        title= "Lastest products" 
        headers= {["Bar/Internal", "Product", "Brand", "Presentation", "S. Min", "Stock", "Price"]}
        options={false} 
        products={products} 
      />
      <SalesCharts />
    </HomeBox>
  )
}
