import { z } from "zod";


export const employeeSchema = z.object({
    name: z.string().min(1, "Name is required").min(2, "Name must contain at least 2 characters").regex(/^[a-zA-Z\s]+$/, "Only Alphabets are allowed"),
    email: z.string().min(1, "Email is required").email("Please enter a valid email"),
    phone: z.string().min(1, "Phone is required").regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    department: z.string().min(1, "Departemt is required"),
    skills: z.array(z.string()),

    password : z.string().min(1, "Required Field").min(4, "Min. length should be 4")
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;

