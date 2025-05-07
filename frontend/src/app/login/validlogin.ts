import { z } from "zod";


export const loginSchema = z.object({
    email: z.string().email().min(5, "Length Cannot be more than"),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/
),
});


export type loginSchemaType = z.infer<typeof loginSchema>;