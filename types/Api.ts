export interface UserDataLogin {
    email: string;
    password: string;
}

export interface UserDataRegister {
    name: string;
    email: string;
    phone: string;
    password: string;
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