import {
    ApiError,
    ApiResponse,
	UserDataLogin,
	UserDataRegister,
} from "../types/Api";

const url = "virtual-pro-y.win";
console.log("Hola23", `https://${url}/api/v1/users/me`);

export const registerUser = async (
    userData: UserDataRegister
): Promise<ApiResponse> => {
	console.log("yo", JSON.stringify(userData));

	try {
		const response = await fetch(`https://${url}/api/v1/users/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		const data: ApiResponse = await response.json();

		if (data.errors && Array.isArray(data.errors)) {
			const errorMessages = data.errors.map((error: ApiError) => error.msg).join("\n");
			console.error("Errors in registration:", errorMessages);
			return { success: false, message: errorMessages };
		}

        /*const token = data.token || "";
        localStorage.setItem("authToken", token);
        console.log("Registration successful and token saved:", data);*/

        console.log("Registration successful:", data);
        return data;
		
	} catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Network error:", error.message);
            throw new Error(error.message);
        }

        throw new Error("An unknown error occurred");
    }
};

export const loginUser = async (userData: UserDataLogin): Promise<ApiResponse> => {
	try {
		const response = await fetch(`https://${url}/api/v1/users/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		const data = await response.json();

		if (data.errors && Array.isArray(data.errors)) {
			const errorMessages = data.errors.map((error: ApiError) => error.msg).join("\n");
			console.error("Errors in login:", errorMessages);
			return { success: false, message: errorMessages };
		} else {
			const token = data.token || "";
			localStorage.setItem("authToken", token);
			console.log("Login successful and token saved:", data);
			return data;
		}
	} catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Network error:", error.message);
            throw new Error(error.message);
        }

        throw new Error("An unknown error occurred");
    }
};

/*
export const infoUser = async () => {
	try {
		const token = localStorage.getItem("authToken");
		console.log("token", token);

		if (!token) {
			console.error("No token found, user is not authenticated");
			throw new Error("No token found, user is not authenticated");
		}

		const response = await fetch(`https://${url}/api/v1/users/me`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();

		if (response.ok) {
			console.log("User info retrieved successfully", data);
			if (!data.user) {
				throw new Error("User data not found in response");
			}
			return data.user;
		}
	} catch (error) {
		console.error("Network error:", error.message);
		throw new Error(error.message);
	}
};

export const logout = async () => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await fetch(`https://${url}/api/v1/users/logout`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		localStorage.removeItem("authToken");

		if (response.ok) {
			const data = await response.json();
			console.log("api", data);
		} else {
			const errorData = await response.text();
			console.error("Error al cerrar sesión", errorData);
		}
	} catch (error) {
		console.error(error);
	}
};

export const update = async (userData) => {
	console.log(JSON.stringify(userData));
	try {
		const token = localStorage.getItem("authToken");

		if (!token) {
			console.error("No token found, user is not authenticated");
			throw new Error("No token found, user is not authenticated");
		}

		const response = await fetch(`https://${url}/api/v1/users/me`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		const data = await response.json();

		if (data.errors && Array.isArray(data.errors)) {
			const errorMessages = data.errors.map((error) => error.msg).join("\n");
			console.error("Errors in update:", errorMessages);
			return { success: false, message: errorMessages };
		} else {
			console.log("Update successful and token saved:", data);
			return data;
		}
	} catch (error) {
		console.error("Network error:", error);
		throw new Error(error.message);
	}
};

export const deleteUser = async () => {
	try {
		const token = localStorage.getItem("authToken");

		const response = await fetch(`https://${url}/api/v1/users/me`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		localStorage.removeItem("authToken");

		if (response.ok) {
			const data = await response.json();
			console.log("api", data);
		} else {
			const errorData = await response.text();
			console.error("Error al eliminar usuario", errorData);
		}
	} catch (error) {
		console.error(error);
	}
};
*/