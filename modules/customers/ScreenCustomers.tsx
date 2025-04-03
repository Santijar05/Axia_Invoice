'use client'
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

import CustomTable from "@/components/organisms/CustomTable";
import Toolbar from "@/components/organisms/ToolBar";
import { ClientDAO, EmployeeDAO, ProductDAO, SupplierDAO } from "@/types/Api";
import SearchBarUniversal from "@/components/molecules/SearchBar";
import CustomerForm from "./CustomerForm";
import { getListCustomers, deleteCustomers } from "@/request/users";
import CustomModalNoButton from "@/components/organisms/CustomModalNoButton";
import CustomerFormEdit from "./CustomerFormEdit";
import CustomerFormView from "./CustomerFormView";

export default function ScreenCustomers() {
    const router = useRouter();
    const initialFetchDone = useRef(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const [clients, setClients] = useState<{ [key: string]: string }[]>([]);
    const [currentClient, setCurrentClient] = useState<ClientDAO | null>(null);
    const [initialClients, setInitialClients] = useState<{ [key: string]: string }[]>([]);
    
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
            const res = await getListCustomers();
            if (res && Array.isArray(res)) {
                formatAndSetClients(res);
            }
        } catch (err) {
            console.error('Error fetching clients:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const formatAndSetClients = (clientList: ClientDAO[]) => {
        const formattedClients = clientList.map((client) => ({
            id: client.id,
            identification: client.identification,
            "first name": client.firstName,
            "last name": client.lastName,
            email: client.email,
        }));
        setInitialClients(formattedClients);
        setClients(formattedClients);
    };

    const handleClientsFound = (results: ClientDAO[] | ProductDAO[] | EmployeeDAO[] | SupplierDAO[]) => {
        const clientResults = results.filter((result): result is ClientDAO => 
            'identification' in result && 'firstName' in result
        );
        
        if (clientResults.length > 0) {
            formatAndSetClients(clientResults);
        } else {
            setClients(initialClients);
        }
    };

    const handleEditClient = (clientId: string) => {
        const clientToEdit = initialClients.find(client => client.id === clientId);
        if (clientToEdit) {
            setCurrentClient({
                id: clientToEdit.id,
                tenantId: "", 
                identification: clientToEdit.identification,
                firstName: clientToEdit["first name"],
                lastName: clientToEdit["last name"],
                email: clientToEdit.email,
            });
            setIsModalOpen(true);
        }
    };

    const handleViewClient = (clientId: string) => {
        const clientToView = initialClients.find(client => client.id === clientId);
        if (clientToView) {
            setCurrentClient({
                id: clientToView.id,
                tenantId: "", 
                identification: clientToView.identification,
                firstName: clientToView["first name"],
                lastName: clientToView["last name"],
                email: clientToView.email,
            });
            setIsModalViewOpen(true);
        }
    };

    const handleDeleteClient = (clientId: string) => {
        deleteCustomers(clientId)
            .then(() => {
                fetchAllClients();
            })
            .catch((err) => {
                console.error("Error deleting customer:", err);
             });
        
    };

    return (
        <div className="container mx-auto">
            <Toolbar
                title="Customers Management"
                formComponent={<CustomerForm onSuccess={fetchAllClients} />}
                formTitle="Add New Customer"
            />
            
            <div className="mb-4 mt-4 w-72">
                <SearchBarUniversal 
                    onResultsFound={handleClientsFound} 
                    showResults={false}
                    placeholder="Search customers..."
                    searchType="clients"
                />
            </div>
            
            {isLoading && <p className="text-gray-500 text-sm mb-2">Loading customers...</p>}
            
            <CustomTable
                title="Customers List"
                headers={["ID", "Identification", "First Name", "Last Name", "Email"]}
                options={true}
                data={clients}
                contextType="clients"
                customActions={{
                    edit: handleEditClient,
                    view: handleViewClient,
                    delete: handleDeleteClient,
                }}
            />
            
            <CustomModalNoButton 
                isOpen={isModalOpen} 
                onClose={() => {
                    fetchAllClients();
                    setIsModalOpen(false);
                }} 
                title="Edit Customer"
            >
                <CustomerFormEdit 
                    client={currentClient || undefined}
                    onSuccess={() => {
                        fetchAllClients();
                        setIsModalOpen(false);
                    }} 
                />
            </CustomModalNoButton>
            <CustomModalNoButton 
                isOpen={isModalViewOpen} 
                onClose={() => {
                    fetchAllClients();
                    setIsModalViewOpen(false);
                }} 
                title="Detalle del Cliente"
            >
                <CustomerFormView
                    client={currentClient || undefined}
                    onClose={() => {
                        setIsModalViewOpen(false);
                    }} 
                />
            </CustomModalNoButton>
        </div>
    );
}