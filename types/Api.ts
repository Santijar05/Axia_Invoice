export interface UserDataLogin {
    email: string;
    password: string;
}

export interface EmployeeDAO {
    id: string;
    name: string;
    role: string;
    email: string;
}

export interface ClientDAO {
    id: string;
    tenantId: string;
    identification: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface SupplierDAO {
    id: string;
    tenantId: string;
    nit: string;
    name: string;
    phone: string;
    address: string;
    createdAt: string; 
    updatedAt: string; 
}  

export interface UserDataRegister {
    name: string;
    email: string;
    role: string;
    password: string;
}

export interface Supplier {
    name:string
}
export interface ProductDAO {
    supplier: Supplier;
    name: string;
    id: string;
    salePrice: number;
    purchasePrice: number;
    tax: number;
    stock: number;
}

export interface StandarDAO {
    status: number;
    message: string;
    data: ProductDAO[];
}

export interface ApiResponse {
    success: boolean;
    message: string;
    user?: UserDataRegister; 
    token?: string;
    errors?: ErrorInterface [];
}

export interface ErrorInterface {
    location: string
    msg: string
    path: string
    type: string
    value: string
}

export interface ApiError {
    msg: string;
}