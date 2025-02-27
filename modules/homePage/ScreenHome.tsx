"use client"

import { useEffect, useState } from "react"

import MetricCards from "@/modules/homePage/MetricCard"
import HomeBox from "../../components/organisms/HomeBox"
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
    <HomeBox>
      <MetricCards />
      <div className="pt-10">
        <CustomTable 
          title= "Lastest products" 
          headers= {["Bar/Internal", "Product", "Brand", "Stock", "Price"]}
          options={false} 
          products={products} 
        />
      </div>
    </HomeBox>
  )
}
