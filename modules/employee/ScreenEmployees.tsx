'use client'
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

import CustomTable from "@/components/organisms/CustomTable";
import Toolbar from "@/components/organisms/ToolBar";
import { getListEmployees, deleteEmployees } from "@/request/users";
import { ClientDAO, EmployeeDAO, ProductDAO, SupplierDAO } from "@/types/Api";
import SearchBarUniversal from "@/components/molecules/SearchBar";
import EmployeeForm from "./EmployeeForm";
import CustomModalNoButton from "@/components/organisms/CustomModalNoButton";
import EmployeeFormEdit from "./EmployeeFormEdit";
import EmployeeFormView from "./EmployeeFormView";
import TableFilter from "@/components/molecules/TableFilter";

export default function ScreenEmployees() {
    const router = useRouter();
    const [employees, setEmployees] = useState<{ [key: string]: string }[]>([]);
    const [initialEmployees, setInitialEmployees] = useState<{ [key: string]: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState<EmployeeDAO | null>(null);
    const [currentSort, setCurrentSort] = useState<{field: string, direction: 'asc' | 'desc'} | null>(null);
    const initialFetchDone = useRef(false);
    
    useEffect(() => {
        if (!initialFetchDone.current) {
            fetchAllEmployees();
            initialFetchDone.current = true;
        }
    }, []);

    const fetchAllEmployees = async () => {
        if (isLoading) return;
        
        setIsLoading(true);
        try {
            const res = await getListEmployees();
            if (res && Array.isArray(res)) {
                const formattedData = formatEmployees(res);
                setInitialEmployees(formattedData);
                
                if(currentSort) {
                    const sortedData = sortEmployees(formattedData, currentSort.field, currentSort.direction);
                    setEmployees(sortedData);
                } else {
                    setEmployees(formattedData);
                }
            }
        } catch (err) {
            console.error('Error al obtener empleados:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const formatEmployees = (employeeList: EmployeeDAO[]) => {
        return employeeList.map((employee) => ({
            id: employee.id,
            name: employee.name,
            role: employee.role,
            email: employee.email,
        }));
    };

    const sortEmployees = (data: { [key: string]: string }[], field: string, direction: 'asc' | 'desc') => {
        return [...data].sort((a, b) => {
            if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
            if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    };

    const handleEmployeesFound = useCallback((results: ClientDAO[] | EmployeeDAO[] | ProductDAO[] | SupplierDAO[]) => {
        const employeeResults = results.filter((result): result is EmployeeDAO => 
            'name' in result && 'role' in result
        );
        
        if (employeeResults.length > 0) {
            const formattedData = formatEmployees(employeeResults);
            
            if (currentSort) {
                const sortedData = sortEmployees(formattedData, currentSort.field, currentSort.direction);
                setEmployees(sortedData);
            } else {
                setEmployees(formattedData);
            }
        } else {
            if (currentSort) {
                const sortedData = sortEmployees([...initialEmployees], currentSort.field, currentSort.direction);
                setEmployees(sortedData);
            } else {
                setEmployees([...initialEmployees]);
            }
        }
    }, [currentSort, initialEmployees]);

    const handleSort = useCallback((field: string, direction: 'asc' | 'desc') => {
        setCurrentSort({ field, direction });
        const sortedEmployees = sortEmployees([...employees], field, direction);
        setEmployees(sortedEmployees);
    }, [employees]);

    const handleEditEmployee = (employeeId: string) => {
        const employeeToEdit = initialEmployees.find(emp => emp.id === employeeId);
        if (employeeToEdit) {
            setCurrentEmployee({
                id: employeeToEdit.id,
                name: employeeToEdit.name,
                role: employeeToEdit.role,
                email: employeeToEdit.email,
            });
            setIsModalOpen(true);
        }
    };

    const handleViewEmployee = (employeeId: string) => {
        const employeeToView = initialEmployees.find(emp => emp.id === employeeId);
        if (employeeToView) {
            setCurrentEmployee({
                id: employeeToView.id,
                name: employeeToView.name,
                role: employeeToView.role,
                email: employeeToView.email,
            });
            router.push(`/users/employees/${employeeId}`);
        }
    };

    const handleDeleteEmployee = (employeeId: string) => {
        deleteEmployees(employeeId)
        .then(() => {
            fetchAllEmployees();
        })
        .catch((err) => {
            console.error("Error al eliminar empleado:", err);
        });
    };

    const tableHeaders = ["ID", "Name", "Role", "Email"];

    return (
        <div className="container mx-auto">
            <Toolbar
                title="Gestión de Empleados"
                formComponent={<EmployeeForm onSuccess={fetchAllEmployees} onClose={fetchAllEmployees} />}
                formTitle="Agregar Nuevo Empleado"
            />
            
            <div className="flex justify-between items-center mb-4 mt-4">
                <div className="w-72">
                    <SearchBarUniversal 
                        onResultsFound={handleEmployeesFound} 
                        showResults={false}
                        placeholder="Buscar empleados..."
                        searchType="employees"
                    />
                </div>
                <TableFilter 
                    headers={tableHeaders} 
                    onSort={handleSort} 
                />
            </div>
            
            {isLoading && <p className="text-gray-500 text-sm mb-2">Cargando empleados...</p>}
            
            <CustomTable
                title="Lista de Empleados"
                headers={tableHeaders}
                options={true}
                data={employees}
                contextType="employees"
                customActions={{
                    edit: handleEditEmployee,
                    view: handleViewEmployee,
                    delete: handleDeleteEmployee,
                }}
            />

            <CustomModalNoButton 
                isOpen={isModalOpen} 
                onClose={() => {setIsModalOpen(false); fetchAllEmployees();}} 
                title="Editar Empleado"
            >
                <EmployeeFormEdit 
                    employee={currentEmployee || undefined}
                    onSuccess={() => {
                        fetchAllEmployees();
                        setIsModalOpen(false);
                    }} 
                />
            </CustomModalNoButton>

            <CustomModalNoButton 
                isOpen={isModalViewOpen} 
                onClose={() => {setIsModalViewOpen(false); fetchAllEmployees();}} 
                title="Detalle del Empleado"
            >
                <EmployeeFormView
                    employee={currentEmployee || undefined}
                    onClose={() => {
                        setIsModalViewOpen(false);
                    }} 
                />
            </CustomModalNoButton>
        </div>
    );
}