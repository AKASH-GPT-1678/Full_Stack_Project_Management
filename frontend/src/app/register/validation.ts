import {  z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(2, 'Length Cannot be of One word'),
    lastname: z.string().nullable(),
    email: z.string().email().min(5, "Length Cannot be more than"),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/
    ),
    cpassword: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/
    )
}).superRefine((data , ctx) =>{
    if(data.password != data.cpassword){
        ctx.addIssue({
            code : z.ZodIssueCode.custom,
            message : "Password and Confirm Password should Match",
            path : ["cpassword"],
        })
    }
})

export type registerSchemaType = z.infer<typeof registerSchema>;

