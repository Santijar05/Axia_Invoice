import { z } from "zod";

export const customertSchema = z.object({
    name: z.string()
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

    phone: z.string().regex(/^\d{7,15}$/, "Número de teléfono inválido"),

    email: z.string()
			.nonempty({ message: "Email is required" })
			.email({message: "Please enter a valid email"})
			.max(40),

    address: z.string().min(1, "La dirección es obligatoria"),

    birthDate: z.string().refine(date => {
        return new Date(date) <= new Date();
    }, {
        message: "Date is required"
    }),
});
