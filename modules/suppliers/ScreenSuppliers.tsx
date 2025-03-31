'use client';

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import CustomTable from "@/components/organisms/CustomTable";
import Toolbar from "@/components/organisms/ToolBar";
import { getListSuppliers } from "@/lib/api-suppliers";
import { ClientDAO, EmployeeDAO, ProductDAO, SupplierDAO } from "@/types/Api";
import SearchBarUniversal from "@/components/molecules/SearchBar";
import SupplierForm from "./SupplierForm";

export default function ScreenSuppliers() {
    const router = useRouter();
    const [suppliers, setSuppliers] = useState<{ [key: string]: string }[]>([]);
    const [initialSuppliers, setInitialSuppliers] = useState<{ [key: string]: string }[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const initialFetchDone = useRef(false);
    
    useEffect(() => {
        if (!initialFetchDone.current) {
            fetchAllSuppliers();
            initialFetchDone.current = true;
        }
    }, []);

    const fetchAllSuppliers = async () => {
        if (isLoading) return;
        
        setIsLoading(true);
        try {
            const res = await getListSuppliers();
            if (res && Array.isArray(res)) {
                formatAndSetSuppliers(res);
            }
        } catch (err) {
            console.log('Error al obtener proveedores', err);
        } finally {
            setIsLoading(false);
        }
    };

    const formatAndSetSuppliers = (supplierList: SupplierDAO[]) => {
        const formattedSuppliers = supplierList.map((supplier: SupplierDAO) => ({
            id: supplier.id,
            nit: supplier.nit,
            name: supplier.name,
            phone: supplier.phone,
            address: supplier.address,
        }));
        setInitialSuppliers(formattedSuppliers);
        setSuppliers(formattedSuppliers);
    };

    const handleSuppliersFound = (results: EmployeeDAO[] | ProductDAO[] | SupplierDAO[] | ClientDAO[]) => {
        if (results.length > 0 && "nit" in results[0]) {
            formatAndSetSuppliers(results as SupplierDAO[]);
        } else if (searchQuery) {
            setSuppliers([]);
        } else {
            setSuppliers(initialSuppliers);
        }
    };    

    const handleRowClick = (supplierId: string) => {
        router.push(`/suppliers/${supplierId}`);
    };

    return (
        <div className="container mx-auto">
            <Toolbar
                title="Suppliers"
                formComponent={<SupplierForm />}
                formTitle="Enter Supplier"
            />
            
            <div className="mb-4 mt-4 w-72">
                <SearchBarUniversal 
                    onResultsFound={handleSuppliersFound} 
                    showResults={false}
                    placeholder="Search by name or NIT..."
                    searchType="suppliers"
                />
            </div>
            
            {isLoading && <p className="text-gray-500 text-sm mb-2">Loading suppliers...</p>}
            
            <CustomTable
                title=""
                headers={["ID", "NIT", "Name", "Phone", "Address"]}
                options={true}
                products={suppliers}
                onRowClick={handleRowClick}
            />
        </div>
    );
}
