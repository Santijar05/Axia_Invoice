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

	password: z.string()
				.nonempty({ message: "Password is required" })
				.min(8, {message: "Password must be at least 8 characters long"})
			    .max(20)
				.refine(
					(value) => /^[a-zA-Z0-9]+$/.test(value ?? ""), 
					{ message: "Password must contain at least one letter, one number, and one special character from the allowed list (@, ., -, _, !, #, $, %, &)" }
				),
 
/* 	confirmPassword: z.string()
						.min(8, {message: "Confirm password is required"})
						.max(20), */

})