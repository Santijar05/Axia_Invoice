import { ClientDAO, EmployeeDAO } from "@/types/Api";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const fetchWithCredentials = async (url: string, options: RequestInit): Promise<Response> => {
  const response = await fetch(url, {
    ...options,
    credentials: 'include', 
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
    throw new Error(errorData.message || 'Error en la solicitud');
  }

  return response;
};

export const createCustomer = async (body: ClientDAO, authToken: string): Promise<Response> => {
  const url = `${API_BASE_URL}/clients`;

  const headersOptions: RequestInit = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}`, 
    },
  };

  return fetchWithCredentials(url, headersOptions);
};

export const createEmployee = async (body: EmployeeDAO, authToken: string): Promise<Response> => {
    const url = `${API_BASE_URL}/users`;
  
    const headersOptions: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`, 
      },
    };
  
    return fetchWithCredentials(url, headersOptions);
  };
  
