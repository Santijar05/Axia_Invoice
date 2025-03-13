import { envVariables } from "@/utils/config";
import { ProductDAO } from "@/types/Api";

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

export const getListproducts = async (): Promise<ProductDAO[]> => {
  const url = `${envVariables.API_URL}/products`;
  console.log('Fetching products from:', url);

  return fetchWithCredentials<ProductDAO[]>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getListproductsByName = async (name: string): Promise<ProductDAO[]> => {
  const url = `${envVariables.API_URL}/products/search?name=${encodeURIComponent(name)}`;
  console.log('Searching products by name:', url);

  return fetchWithCredentials<ProductDAO[]>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getProductById = async (id: string): Promise<ProductDAO> => {
  const url = `${envVariables.API_URL}/products/${id}`;
  console.log('Fetching product by ID:', url);

  return fetchWithCredentials<ProductDAO>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
