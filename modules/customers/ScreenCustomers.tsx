'use client'
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

import CustomTable from "@/components/organisms/CustomTable";
import Toolbar from "@/components/organisms/ToolBar";
import { ClientDAO, EmployeeDAO, ProductDAO, SupplierDAO } from "@/types/Api";
import SearchBarUniversal from "@/components/molecules/SearchBar";
import CustomerForm from "./CustomerForm";
import { getListCustomers, deleteCustomers } from "@/request/users";
import { getListClientsByName } from "@/lib/api-clients";
import CustomModalNoButton from "@/components/organisms/CustomModalNoButton";
import CustomerFormEdit from "./CustomerFormEdit";
import TableFilter from "@/components/molecules/TableFilter";
import EmptyState from '@/components/molecules/EmptyState'; // Import EmptyState component

export default function ScreenCustomers() {
    const router = useRouter();
    const initialFetchDone = useRef(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [clients, setClients] = useState<{ [key: string]: string }[]>([]);
    const [currentClient, setCurrentClient] = useState<ClientDAO | null>(null);
    const [initialClients, setInitialClients] = useState<{ [key: string]: string }[]>([]);
    const [currentSort, setCurrentSort] = useState<{field: string, direction: 'asc' | 'desc'} | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    
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
                const formattedData = formatClients(res);
                setInitialClients(formattedData);
                
                if(currentSort) {
                    const sortedData = sortCustomers(formattedData, currentSort.field, currentSort.direction);
                    setClients(sortedData);
                } else {
                    setClients(formattedData);
                }
            }
        } catch (err) {
            console.error('Error al obtener clientes:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const formatClients = (clientList: ClientDAO[]) => {
        const formattedClients = clientList.map((client) => ({
            id: client.id,
            identification: client.identification,
            "first name": client.firstName,
            "last name": client.lastName,
            email: client.email || "",
        }));
        return formattedClients;
    };

    const sortCustomers = (data: { [key: string]: string }[], field: string, direction: 'asc' | 'desc') => {
        return [...data].sort((a, b) => {
            if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
            if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    };

    const handleClientsFound = useCallback((results: ClientDAO[] | EmployeeDAO[] | ProductDAO[] | SupplierDAO[]) => {
        const clientsResults = results.filter((result): result is ClientDAO => 
            'firstName' in result && 'lastName' in result && 'identification' in result
        );
        
        if (clientsResults.length > 0) {
            const formattedData = formatClients(clientsResults);
            
            if (currentSort) {
                const sortedData = sortCustomers(formattedData, currentSort.field, currentSort.direction);
                setClients(sortedData);
            } else {
                setClients(formattedData);
            }
        } else if (searchTerm && searchTerm.length >= 2) {
            // Create a "no results" row when actively searching
            setClients([{
                id: "no-results",
                identification: "",
                "first name": "",
                "last name": `No se encontraron clientes para: "${searchTerm}"`,
                email: "",
            }]);
        } else {
            // Show original data when not searching
            if (currentSort) {
                const sortedData = sortCustomers([...initialClients], currentSort.field, currentSort.direction);
                setClients(sortedData);
            } else {
                setClients([...initialClients]);
            }
        }
    }, [currentSort, initialClients, searchTerm]);

    const handleSort = useCallback((field: string, direction: 'asc' | 'desc') => {
        setCurrentSort({ field, direction });
        const sortedClients = sortCustomers([...clients], field, direction);
        setClients(sortedClients);
    }, [clients]);

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
            router.push(`/users/customers/${clientId}`);
        }
    };

    const handleDeleteClient = (clientId: string) => {
        deleteCustomers(clientId)
            .then(() => {
                fetchAllClients();
            })
            .catch((err) => {
                console.error("Error al eliminar cliente:", err);
             });
    };

    const tableHeaders = ["ID", "Identification", "First Name", "Last Name", "Email"];

    return (
        <div className="container mx-auto">
            <Toolbar
                title="Gestión de Empleados"
                onAddNew={() => setIsAddModalOpen(true)} 
            />
            
            <CustomModalNoButton 
                isOpen={isAddModalOpen} 
                onClose={() => {
                    setIsAddModalOpen(false);
                    fetchAllClients();
                }} 
                title="Agregar Nuevo Empleado"
            >
                <CustomerForm 
                    onSuccess={() => {
                        setIsAddModalOpen(false);
                        fetchAllClients();
                    }} 
                />
            </CustomModalNoButton>
            
            <div className="flex justify-between items-center mb-4 mt-4">
                <div className="w-72">
                    <SearchBarUniversal 
                        onResultsFound={handleClientsFound} 
                        showResults={false}
                        placeholder="Buscar clientes..."
                        searchType="clients"
                        onSearchTermChange={setSearchTerm}
                    />
                </div>
                <TableFilter 
                    headers={tableHeaders} 
                    onSort={handleSort} 
                />
            </div>
            
            {isLoading && <p className="text-gray-500 text-sm mb-2">Cargando clientes...</p>}
            
            {/* Show empty state when search has no results */}
            {searchTerm && searchTerm.length >= 2 && clients.length === 1 && clients[0].id === "no-results" ? (
                <EmptyState 
                    message="No se encontraron clientes" 
                    searchTerm={searchTerm} 
                />
            ) : (
                <CustomTable
                    title="Lista de Clientes"
                    headers={tableHeaders}
                    options={true}
                    data={clients.filter(c => c.id !== "no-results")}
                    contextType="clients"
                    customActions={{
                        edit: handleEditClient,
                        view: handleViewClient,
                        delete: handleDeleteClient,
                    }}
                />
            )}
            
            <CustomModalNoButton 
                isOpen={isModalOpen} 
                onClose={() => {
                    setIsModalOpen(false); 
                    setTimeout(() => fetchAllClients(), 0);
                }}
                title="Editar Cliente"
            >
                <CustomerFormEdit 
                    client={currentClient ? {
                        id: currentClient.id,
                        identification: currentClient.identification,
                        firstName: currentClient.firstName,
                        lastName: currentClient.lastName,
                        email: currentClient.email || ""
                    } : undefined}
                    onSuccess={() => {
                        fetchAllClients();
                        setIsModalOpen(false);
                    }} 
                />
            </CustomModalNoButton>
        </div>
    );
}