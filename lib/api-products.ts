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

export const getProductById = async (productId: string) => {
  const url = `${envVariables.API_URL}/products/${productId}`;
  console.log('Fetching product by ID:', url);

  return fetchWithCredentials(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Función para obtener productos sin autenticación (para SSG)
export const getPublicProducts = async () => {
  const url = `${envVariables.API_URL}/products/public/list`;
  console.log('Fetching public products from:', url);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // Sin credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Error al obtener productos públicos');
  }

  return response.json();
};

// Función para obtener un producto por ID sin autenticación (para SSG)
export const getPublicProductById = async (productId: string) => {
  const url = `${envVariables.API_URL}/products/public/${productId}`;
  console.log('Fetching public product by ID:', url);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // Sin credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Error al obtener producto público');
  }

  return response.json();
};

