import { z } from "zod";
import { DEPARTMENT , GENDER, EXPERIENCE} from "./constants";

export const employeeSchema = z.object({
    name: z.string().min(1, "Name is required").min(2, "Name must contain at least 2 characters").regex(/^[a-zA-Z\s]+$/, "Only Alphabets are allowed"),
    email: z.string().min(1, "Email is required").email("Please enter a valid email"),
    phone: z.string().min(1, "Phone is required").regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    skills: z.array(z.string()),

    age: z.number().int().min(18, "Minimum Age should be 18").max(65, "Maximum Age should be 18") ,

    password : z.string().min(1, "Required Field").min(4, "Min. length should be 4").optional() ,

   department: z.nativeEnum(DEPARTMENT, { error: "Department is required",}),

   gender: z.nativeEnum(GENDER, { error: "Gender is required"}),

   experience: z.nativeEnum(EXPERIENCE, { error: "Experience is required"}),
});


export type EmployeeFormData = z.infer<typeof employeeSchema>;

