import { z } from "zod";
import { useTranslations } from "next-intl";

export const employeeSchema =  (t: ReturnType<typeof useTranslations>) => z.object({
    name: z.string()
        .min(3, t("EmployeeForm.errors.nameMin"))
        .max(50, t("EmployeeForm.errors.nameMax")),
    role: z.enum(["USER", "ADMIN"], {
        required_error: t("EmployeeForm.errors.roleRequired"),
    }),
    email: z.string()
        .email(t("EmployeeForm.errors.emailInvalid"))
        .max(100, t("EmployeeForm.errors.emailMax")),
    password: z.string()
            .min(6, t("EmployeeForm.errors.passwordMin"))
            .max(50, t("EmployeeForm.errors.passwordMax")),
});