import { z } from "zod";

export const registerScheme = z.object({
	name: z.string()
			.nonempty({ message: "Name is required" })
            .min(4, {message: "Username must be at least 4 characters long"})
            .max(40)
			.refine(
				(value) => /^[a-zA-Z]+$/.test(value ?? ""),
				{ message: "Username cannot contain special characters or spaces or numbers" }
			  ),
		
	email: z.string()
			.nonempty({ message: "Email is required" })
			.email({message: "Please enter a valid email"})
			.max(40),

	phone: z.string()
			.nonempty({ message: "Phone is required" })
			.max(10, {message: "Phone number 10 numbers"})
			.min(10, {message: "Phone number 10 numbers"})
			.refine(
				(value) => /^[0-9]+$/.test(value ?? ""),
				{ message: "Phone only numbers" }
			  ),

	password: z.string()
				.nonempty({ message: "Password is required" })
				.min(8, {message: "Password must be at least 8 characters long"})
			    .max(20)
				.refine(
					(value) => /^[a-zA-Z0-9]+$/.test(value ?? ""), 
					{ message: "Password must contain at least one letter, one number, and one special character from the allowed list (@, ., -, _, !, #, $, %, &)" }
				),
 
	confirmPassword: z.string()
						.min(8, {message: "Confirm password is required"})
						.max(20),

}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords do not match",
	path: ["confirmPassword"],
});