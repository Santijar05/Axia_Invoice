import { envVariables } from "@/utils/config";
import { ClientDAO } from "@/types/Api";

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

export const getListClients = async (): Promise<ClientDAO[]> => {
  const url = `${envVariables.API_URL}/clients`;
  console.log('Obteniendo clientes desde:', url);

  return fetchWithCredentials<ClientDAO[]>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getListClientsByName = async (name: string): Promise<ClientDAO[]> => {
  const url = `${envVariables.API_URL}/clients/search?name=${encodeURIComponent(name)}`;
  console.log('Buscando clientes por nombre:', name);

  return fetchWithCredentials<ClientDAO[]>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
