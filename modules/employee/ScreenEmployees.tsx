'use client'

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

import CustomTable from "@/components/organisms/CustomTable";
import Toolbar from "@/components/organisms/ToolBar";
import { getListEmployees } from "@/lib/api-employees";
import { ClientDAO, EmployeeDAO, ProductDAO, SupplierDAO } from "@/types/Api";
import SearchBarUniversal from "@/components/molecules/SearchBar";
import EmployeeForm from "./EmployeeForm";

export default function ScreenEmployees() {
    const router = useRouter();
    const [employees, setEmployees] = useState<{ [key: string]: string }[]>([]);
    const [initialEmployees, setInitialEmployees] = useState<{ [key: string]: string }[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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
            console.log('Error al obtener empleados', err);
        } finally {
            setIsLoading(false);
        }
    };

    const formatAndSetEmployees = (employeeList: EmployeeDAO[]) => {
        const formattedEmployees = employeeList.map((employee: EmployeeDAO) => ({
            id: employee.id,
            name: employee.name,
            role: employee.role,
            email: employee.email,
        }));
        setInitialEmployees(formattedEmployees);
        setEmployees(formattedEmployees);
    };

    const handleEmployeesFound = (results: EmployeeDAO[] | ProductDAO[] | SupplierDAO[] | ClientDAO[]) => {
        if (results.length > 0 && "email" in results[0]) {
            formatAndSetEmployees(results as EmployeeDAO[]);
        } else if (searchQuery) {
            setEmployees([]);
        } else {
            setEmployees(initialEmployees);
        }
    };    

    const handleRowClick = (employeeId: string) => {
        router.push(`/users/employees/${employeeId}`);
    };

    return (
        <div className="container mx-auto">
            <Toolbar
                title="Employees"
                formComponent={<EmployeeForm/>}
                formTitle="Enter Employee"
            />
            
            <div className="mb-4 mt-4 w-72">
                <SearchBarUniversal 
                    onResultsFound={handleEmployeesFound} 
                    showResults={false}
                    placeholder="Search by name..."
                    searchType="employees"
                />
            </div>
            
            {isLoading && <p className="text-gray-500 text-sm mb-2">Loading employees...</p>}
            
            <CustomTable
                title=""
                headers={["ID", "Name", "Email", "role"]}
                options={true}
                products={employees}
                onRowClick={handleRowClick}
            />
        </div>
    );
}