export interface UserData {
    name: string;
    email: string;
    phone: string;
    password: string;
}

export interface ApiResponse {
    success: boolean;
    message: string;
    user?: UserData; 
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