import {z} from "zod";

export const loginSchema = z.object({

    name : z.string().min(2 , 'Length Cannot be of One word'),
    lastname :z.string().nullable(),
    email : z.string().email().min( 5 , "Length Cannot be more than"),
    password : z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/),
    cpassword: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)

    

})


export type loginSchemaType = z.infer<typeof loginSchema>
