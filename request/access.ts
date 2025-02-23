import { UserDataLogin } from "@/types/Api";
import { UserDataRegister } from "@/types/Api";

export const loginUser = async (body: UserDataLogin): Promise<Response> => {
  const url = '';

  const headersOptions = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json", 
    },
  };

  const response = await fetch(url, headersOptions);

  return response;
};

export const registerUser = async (body: UserDataRegister): Promise<Response> => {
  const url = '';

  const headersOptions = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json", 
    },
  };

  const response = await fetch(url, headersOptions);

  return response;
};