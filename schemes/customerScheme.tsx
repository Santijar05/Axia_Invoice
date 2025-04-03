import { z } from "zod";

export const customertSchema = z.object({
    firstName: z.string()
            .nonempty({ message: "Name is required" })
            .min(4, {message: "Name must be at least 4 characters long"})
            .max(40)
			.refine(
				(value) => /^[a-zA-Z]+$/.test(value ?? ""),
				{ message: "Name cannot contain special characters or spaces or numbers" }
			),

    lastName: z.string()
                .nonempty({ message: "Lastname is required" })
                .min(4, {message: "Lastname must be at least 4 characters long"})
                .max(40)
                .refine(
                    (value) => /^[a-zA-Z]+$/.test(value ?? ""),
                    { message: "Lastname cannot contain special characters or spaces or numbers" }
                ),

    identification: z.string()
                .nonempty({ message: "Identification is required" })
                .min(6, {message: "Identification must be at least 6 characters long"})
                .max(15, {message: "Identification must be at most 15 characters long"})
                .refine(
                    (value) => /^[0-9]+$/.test(value ?? ""),
                     { message: "La identificacion solo puede contener numeros" }
                ),

    email: z.string()
			.nonempty({ message: "Email is required" })
			.email({message: "Please enter a valid email"})
			.max(40),
});
