import { envVariables } from "@/utils/config";

export const getListproducts = async () => {
    console.log(envVariables)

    return fetch(`${envVariables.API_URL}/products`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error));
}