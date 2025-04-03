import { envVariables } from "@/utils/config";
import { EmployeeDAO } from "@/types/Api";

const fetchWithCredentials = async <T>(url: string, options: RequestInit): Promise<T> => {
  const response = await fetch(url, {
    ...options,
    credentials: 'include', 
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error en la solicitud');
  }

  return response.json() as Promise<T>;
};

export const getListEmployees = async (): Promise<EmployeeDAO[]> => {
  const url = `${envVariables.API_URL}`;
  console.log('Fetching products from:', url);

  return fetchWithCredentials<EmployeeDAO[]>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Función para obtener emppleados sin autenticación (para SSG)
export const getPublicEmployees = async () => {
  const url = `${envVariables.API_URL}/users/public/list`;
  console.log('Fetching public employees from:', url);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // Sin credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Error al obtener empleados públicos');
  }

  return response.json();
};