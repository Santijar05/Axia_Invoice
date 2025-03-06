import { envVariables } from "@/utils/config";

export const getListproducts = async () => {
    const token = localStorage.getItem("authToken");
    const url = `${envVariables.API_URL}/products`;
    console.log('Fetching products from:', url);

    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => data)
    .then(data => {
        console.log('Products fetched:', data);
        return data;
    })
    .catch(error => {
        console.error('Error fetching products:', error);
        return { data: [] };
    });
}