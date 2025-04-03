'use client'
import { useEffect, useState, useRef } from "react";
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
import CustomerFormView from "./CustomerFormView";
import TableFilter from "@/components/molecules/TableFilter";

export default function ScreenCustomers() {
    const initialFetchDone = useRef(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const [clients, setClients] = useState<{ [key: string]: string }[]>([]);
    const [currentClient, setCurrentClient] = useState<ClientDAO | null>(null);
    const [initialClients, setInitialClients] = useState<{ [key: string]: string }[]>([]);
    const [currentSort, setCurrentSort] = useState<{field: string, direction: 'asc' | 'desc'} | null>(null);
    
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
                if( currentSort) {
                    const sortedData = sortCustomers(formattedData, currentSort?.field, currentSort?.direction);
                    setInitialClients(formattedData);
                    setClients(sortedData);
                } else {
                    setInitialClients(formattedData);
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
            email: client.email,
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

    const handleClientsFound = (results: ClientDAO[] | EmployeeDAO[] | ProductDAO[] | SupplierDAO[]) => {
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
        } else {
            // Si no hay resultados, mantener el ordenamiento de initialClients
            if (currentSort) {
                const sortedData = sortCustomers(initialClients, currentSort.field, currentSort.direction);
                setClients(sortedData);
            } else {
                setClients(initialClients);
            }
        }
    };

    const handleSort = (field: string, direction: 'asc' | 'desc') => {
        setCurrentSort({ field, direction });
        const sortedClients = sortCustomers(clients, field, direction);
        setClients(sortedClients);
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
                console.error("Error al eliminar cliente:", err);
             });
    };

    const tableHeaders = ["ID", "Identification", "First Name", "Last Name", "Email"];

    return (
        <div className="container mx-auto">
            <Toolbar
                title="Gestión de Clientes"
                formComponent={<CustomerForm onSuccess={fetchAllClients} />}
                formTitle="Agregar Nuevo Cliente"
            />
            
            <div className="flex justify-between items-center mb-4 mt-4">
                <div className="w-72">
                    <SearchBarUniversal 
                        onResultsFound={handleClientsFound} 
                        showResults={false}
                        placeholder="Buscar clientes..."
                        searchType="clients"
                    />
                </div>
                <TableFilter 
                    headers={tableHeaders} 
                    onSort={handleSort} 
                />
            </div>
            
            {isLoading && <p className="text-gray-500 text-sm mb-2">Cargando clientes...</p>}
            
            <CustomTable
                title="Lista de Clientes"
                headers={tableHeaders}
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
                title="Editar Cliente"
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