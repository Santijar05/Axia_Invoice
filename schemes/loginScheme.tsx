import { z } from "zod";

export const loginScheme = z.object({
	email: z.string()
			.nonempty({ message: "Email is required" })
			.email("Please enter a valid email")
        	.max(40),
		
	password: z.string()
				.nonempty({ message: "Password is required" })
				.min(8, "Password must be at least 8 characters long")
				.max(20)
				.refine((value) => /^[a-zA-Z0-9]+/.test(value ?? "")),
});