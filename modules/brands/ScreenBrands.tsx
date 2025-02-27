"use client"

import React, { useEffect, useState } from 'react'

import CustomTable from '@/components/organisms/CustomTable';
import HomeBox from '@/components/organisms/HomeBox';
import Toolbar from '@/components/organisms/ToolBar';
import BrandForm from './BrandForm';

export default function ScreenBrands() {
    const [products, setProducts] = useState<{ [key: string]: string }[]>([]);
      
    useEffect(() => {
        setProducts(
            Array(8).fill({
                no: "Test",
                brand: "Test",
                state: "Test"
            })
        );
    }, []);
  
    return (
        <HomeBox>
            <Toolbar
                title="Poduct Brands"
                formComponent={<BrandForm/>}
                formTitle="Enter Poduct Brand"
            />
            <CustomTable 
                title= "" 
                headers= {["No", "Brand", "State"]}
                options={true} 
                products={products}
            />
        </HomeBox>
    )
  
}
