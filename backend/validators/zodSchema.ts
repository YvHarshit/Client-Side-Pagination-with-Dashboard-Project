import {z} from "zod" ;


export const zodValidSchema = z.object({
    name: z.string().trim().min(1,"Name required").min(2,"Minimum 2 characters required").regex(/^[a-zA-Z\s]+$/,"Only Character is allowed"),

    email: z.string().min(1,"Email required").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ,

    phone: z.string().min(1,"Number required").regex(/^[0-9]{10}$/, "Enter Exactly 10 digits"),

    department: z.string().min(1,"Required Field"),

    skills: z.array(z.string()),

    userId: z.number().optional() ,

    password : z.string().min(1, "Required Field").min(4, "Min. length should be 4")

})

export type zodValidSchemaType = z.infer<typeof zodValidSchema>