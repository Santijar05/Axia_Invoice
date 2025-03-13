import { envVariables } from "@/utils/config";
import { ProductDAO } from "@/types/Api";

type ApiResponse<T = unknown> = {
  data?: T;
  message?: string;
  status?: number;
};

const getFetchOptions = (method: string, headers: Record<string, string> = {}): RequestInit => ({
  method,
  headers: {
    'Content-Type': 'application/json',
    ...headers,
  },
});

const fetchWithCredentials = async <T = unknown>(url: string, options: RequestInit): Promise<ApiResponse<T>> => {
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData: ApiResponse = await response.json();
    throw new Error(errorData.message || 'Error en la solicitud');
  }

  return response.json();
};

export const getListproducts = async (): Promise<ApiResponse<ProductDAO[]>> => {
  const url = `${envVariables.API_URL}/products`;
  console.log('Fetching products from:', url);

  return fetchWithCredentials<ProductDAO[]>(url, getFetchOptions('GET'));
};

export const getListproductsByName = async (name: string): Promise<ApiResponse<ProductDAO[]>> => {
  const url = `${envVariables.API_URL}/products/search?name=${encodeURIComponent(name)}`;
  console.log('Searching products by name:', url);

  return fetchWithCredentials<ProductDAO[]>(url, getFetchOptions('GET'));
};

export const getProductById = async (productId: string): Promise<ApiResponse<ProductDAO>> => {
  const url = `${envVariables.API_URL}/products/${productId}`;
  console.log('Fetching product by ID:', url);

  return fetchWithCredentials<ProductDAO>(url, getFetchOptions('GET'));
};

export const getPublicProducts = async (): Promise<ApiResponse<ProductDAO[]>> => {
  const url = `${envVariables.API_URL}/products/public/list`;
  console.log('Fetching public products from:', url);

  const response = await fetch(url, getFetchOptions('GET'));

  if (!response.ok) {
    throw new Error('Error al obtener productos públicos');
  }

  return response.json();
};

export const getPublicProductById = async (productId: string): Promise<ApiResponse<ProductDAO>> => {
  const url = `${envVariables.API_URL}/products/public/${productId}`;
  console.log('Fetching public product by ID:', url);

  const response = await fetch(url, getFetchOptions('GET'));

  if (!response.ok) {
    throw new Error('Error al obtener producto público');
  }

  return response.json();
};