'use client'

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

import CustomTable from "@/components/organisms/CustomTable";
import Toolbar from "@/components/organisms/ToolBar";
import { ClientDAO, EmployeeDAO, ProductDAO, SupplierDAO } from "@/types/Api";
import SearchBarUniversal from "@/components/molecules/SearchBar";
import CustomerForm from "./CustomerForm";
import { getListClients } from "@/lib/api-clients";

export default function ScreenCustomers() {
    const router = useRouter();
    const [clients, setClients] = useState<{ [key: string]: string }[]>([]);
    const [initialClients, setInitialClients] = useState<{ [key: string]: string }[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const initialFetchDone = useRef(false);
    
    useEffect(() => {
        if (!initialFetchDone.current) {
            fetchAllClients();
            initialFetchDone.current = true;
        }
    }, []);

    const fetchAllClients = async () => {
        if (isLoading) return;
        
        setIsLoading(true);
        try {
            const res = await getListClients();
            if (res && Array.isArray(res)) {
                formatAndSetClients(res);
            }
        } catch (err) {
            console.log('Error al obtener clientes', err);
        } finally {
            setIsLoading(false);
        }
    };

    const formatAndSetClients = (clientList: ClientDAO[]) => {
        const formattedClients = clientList.map((client: ClientDAO) => ({
            id: client.id,
            identification: client.identification,
            firstName: client.firstName,
            lastName: client.lastName,
            email: client.email,
            createdAt: new Date(client.createdAt).toLocaleDateString(),
        }));
        setInitialClients(formattedClients);
        setClients(formattedClients);
    };

    const handleClientsFound = (results: EmployeeDAO[] | ProductDAO[] | SupplierDAO[] | ClientDAO[]) => {
        if (results.length > 0 && "identification" in results[0]) {
            formatAndSetClients(results as ClientDAO[]);
        } else if (searchQuery) {
            setClients([]);
        } else {
            setClients(initialClients);
        }
    };    

    const handleRowClick = (clientId: string) => {
        router.push(`/users/clients/${clientId}`);
    };

    return (
        <div className="container mx-auto">
            <Toolbar
                title="Customers"
                formComponent={<CustomerForm/>}
                formTitle="Enter Customer"
            />
            
            <div className="mb-4 mt-4 w-72">
                <SearchBarUniversal 
                    onResultsFound={handleClientsFound} 
                    showResults={false}
                    placeholder="Search by name..."
                    searchType="clients"
                />
            </div>
            
            {isLoading && <p className="text-gray-500 text-sm mb-2">Loading customers...</p>}
            
            <CustomTable
                title=""
                headers={["ID", "Identification", "First Name", "Last Name", "Email", "Created At"]}
                options={true}
                products={clients}
                onRowClick={handleRowClick}
            />
        </div>
    );
}
