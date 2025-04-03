import { z } from "zod";

export const employeeSchema = z.object({
    name: z.string()
        .min(3, "El nombre debe tener al menos 2 caracteres")
        .max(50, "El nombre no puede exceder 50 caracteres"),
    role: z.enum(["USER", "ADMIN"], {
        required_error: "Debes seleccionar un rol",
    }),
    email: z.string()
        .email("Debe ser un email válido")
        .max(100, "El email no puede exceder 100 caracteres"),
    password: z.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .max(50, "La contraseña no puede exceder 50 caracteres"),
});