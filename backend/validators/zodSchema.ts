import {z} from "zod" ;
import { DEPARTMENT, EXPERIENCE, GENDER } from "../utils/enums.js";



export const zodValidSchema = z.object({
    name: z.string().trim().min(1,"Name required").min(2,"Minimum 2 characters required").regex(/^[a-zA-Z\s]+$/,"Only Character is allowed"),

    email: z.string().min(1,"Email required").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Must follow email regrex"),

    phone: z.string().min(1,"Number required").regex(/^[0-9]{10}$/, "Enter Exactly 10 digits"),

    age:  z.number().int().min(18, "Minimum Age should be 18").max(65, "Maximum Age should be 18").optional(),

    skills: z.array(z.string()).optional(),

    userId: z.number().optional() ,

    password : z.string().min(1, "Required Field").min(4, "Min. length should be 4").optional(),

    department: z.nativeEnum(DEPARTMENT, { message: "Please select a valid department" }),

    gender: z.nativeEnum(GENDER, { message: "Please select a gender" }),

    experience : z.nativeEnum(EXPERIENCE, "Please select the correct Option for experienece" )

})
//export type zodValidSchemaType = z.infer<typeof zodValidSchema>


export const updateEmployeeSchema = z.object({
  name: z.string().trim().min(2).regex(/^[a-zA-Z\s]+$/).optional(),
  phone: z.string().regex(/^[0-9]{10}$/).optional(),
  department: z.nativeEnum(DEPARTMENT).optional(),
  age:  z.number().int().min(18, "Minimum Age should be 18").max(65, "Maximum Age should be 18"),
  gender: z.nativeEnum(GENDER, { message: "Please select a gender" }),
  experience : z.nativeEnum(EXPERIENCE, "Please selecet the correct option for experienece")
});