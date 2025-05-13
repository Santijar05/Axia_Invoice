import { z } from "zod";

export const supplierSchema = z.object({
  nit: z.string()
    .min(5, "El NIT debe tener al menos 5 caracteres")
    .max(20, "El NIT no puede exceder los 20 caracteres")
    .regex(/^[0-9-]+$/, "Solo números y guiones permitidos"),
  
  name: z.string()
    .min(3, "Nombre muy corto (mínimo 3 caracteres)")
    .max(100, "Nombre muy largo (máximo 100 caracteres)"),
  
  phone: z.string()
    .min(7, "Teléfono muy corto (mínimo 7 dígitos)")
    .max(15, "Teléfono muy largo (máximo 15 dígitos)")
    .regex(/^[0-9+]+$/, "Solo números y signo + permitidos"),
  
  address: z.string()
    .min(5, "Dirección muy corta (mínimo 5 caracteres)")
    .max(200, "Dirección muy larga (máximo 200 caracteres)")
});