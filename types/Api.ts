export interface UserDataLogin {
    email: string;
    password: string;
}

export interface SaleProduct {
    productId: string;
    quantity: number;
}

export interface CreatedInvoice {
    id: string;
    date: string;
    totalPrice: number;
    electronicBill: boolean;
    clientId: string;
    tenantId: string;
    invoiceProducts: SaleProduct[];
}

export interface SaleItem {
    id: number;
    name: string;
    productId: string;
    quantity: number;
    stock: number;
    tax: number;
    price: number;
    basePrice: number;
    tenantId: string; // ← agregar esto
}  
  
export interface Venta {
    clientId: string;
    electronicBill?: boolean;
    products: {
        tenantId: string; 
        productId: string;
        quantity: number;
    }[];
        payment?: {
        amount: number;
        method: string;
    };
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
    tenantId: string;
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

export interface ProductFormProps {
    onSuccess?: () => Promise<void> | void;
}