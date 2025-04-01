'use client'
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

import CustomTable from "@/components/organisms/CustomTable";
import Toolbar from "@/components/organisms/ToolBar";
import { getListEmployees, deleteEmployees } from "@/request/users";
import { ClientDAO, EmployeeDAO, ProductDAO, SupplierDAO } from "@/types/Api";
import SearchBarUniversal from "@/components/molecules/SearchBar";
import EmployeeForm from "./EmployeeForm";
import CustomModalNoButton from "@/components/organisms/CustomModalNoButton";
import EmployeeFormEdit from "./EmployeeFormEdit";

export default function ScreenEmployees() {
    const router = useRouter();
    const [employees, setEmployees] = useState<{ [key: string]: string }[]>([]);
    const [initialEmployees, setInitialEmployees] = useState<{ [key: string]: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState<EmployeeDAO | null>(null);
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
                formatAndSetEmployees(res);
            }
        } catch (err) {
            console.error('Error fetching employees:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const formatAndSetEmployees = (employeeList: EmployeeDAO[]) => {
        const formattedEmployees = employeeList.map((employee) => ({
            id: employee.id,
            name: employee.name,
            role: employee.role,
            email: employee.email,
        }));
        setInitialEmployees(formattedEmployees);
        setEmployees(formattedEmployees);
    };

    const handleEmployeesFound = (results: ClientDAO[] | EmployeeDAO[] | ProductDAO[] | SupplierDAO[]) => {
        const employeeResults = results.filter((result): result is EmployeeDAO => 
            'name' in result && 'role' in result
        );
        
        if (employeeResults.length > 0) {
            formatAndSetEmployees(employeeResults);
        } else {
            setEmployees(initialEmployees);
        }
    };

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
        router.push(`/users/employees/${employeeId}`);
    };

    const handleDeleteEmployee = (employeeId: string) => {
        deleteEmployees(employeeId)
        .then(() => {
            fetchAllEmployees();
        })
        .catch((err) => {
            console.error("Error deleting employee:", err);
        });
    };

    return (
        <div className="container mx-auto">
            <Toolbar
                title="Employees Management"
                formComponent={<EmployeeForm onSuccess={fetchAllEmployees} onClose={fetchAllEmployees} />}
                formTitle="Add New Employee"
            />
            
            <div className="mb-4 mt-4 w-72">
                <SearchBarUniversal 
                    onResultsFound={handleEmployeesFound} 
                    showResults={false}
                    placeholder="Search employees..."
                    searchType="employees"
                />
            </div>
            
            {isLoading && <p className="text-gray-500 text-sm mb-2">Loading employees...</p>}
            
            <CustomTable
                title="Employees List"
                headers={["ID", "Name", "Role", "Email"]}
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
                title="Edit Employee"
            >
                <EmployeeFormEdit 
                    employee={currentEmployee || undefined}
                    onSuccess={() => {
                        fetchAllEmployees();
                        setIsModalOpen(false);
                    }} 
                />
            </CustomModalNoButton>
        </div>
    );
}