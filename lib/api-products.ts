import { envVariables } from "@/utils/config";

const fetchWithCredentials = async (url: string, options: RequestInit): Promise<any> => {
  const response = await fetch(url, {
    ...options,
    credentials: 'include', 
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error en la solicitud');
  }

  return response.json();
};

export const getListproducts = async () => {
  const url = `${envVariables.API_URL}/products`;
  console.log('Fetching products from:', url);

  return fetchWithCredentials(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getListproductsByName = async (name: string) => {
  const url = `${envVariables.API_URL}/products/search?name=${encodeURIComponent(name)}`;
  console.log('Searching products by name:', url);

  return fetchWithCredentials(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getProductById = async (id: string) => {
  const url = `${envVariables.API_URL}/products/${id}`;
  console.log('Fetching product by ID:', url);

  return fetchWithCredentials(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};