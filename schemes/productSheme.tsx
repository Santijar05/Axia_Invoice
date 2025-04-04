import { z } from "zod";

export const productSchema = z.object({
  name: z.string()
    .nonempty("El nombre es requerido"),
  
  stock: z.number({
    invalid_type_error: "El stock debe ser un número",
  })
    .min(0, "El stock no puede ser negativo"),
  
  tax: z.number({
    invalid_type_error: "El impuesto debe ser un número",
  })
    .min(0, "El impuesto no puede ser negativo"),
  
  purchasePrice: z.number({
    invalid_type_error: "El precio de compra debe ser un número",
  })
    .min(0, "El precio de compra no puede ser negativo"),
  
  salePrice: z.number({
    invalid_type_error: "El precio de venta debe ser un número",
  })
    .min(0, "El precio de venta no puede ser negativo"),
});