import { UserDataLogin } from "@/types/Api";
import { UserDataRegister } from "@/types/Api";

export const loginUser = async (body: UserDataLogin): Promise<Response> => {
  const url = 'http://localhost:3001/api/v1/users/login';

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
  console.log("registerUser function called with:", body);
  const url = 'http://localhost:3001/api/v1/users/new-user';

  const headersOptions = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json", 
    },
  };

  try {
    const response = await fetch(url, headersOptions);
    console.log("Response received:", response.status);
    return response;
  } catch (error) {
    console.error("Error in registerUser:", error);
    throw error;
  }
};