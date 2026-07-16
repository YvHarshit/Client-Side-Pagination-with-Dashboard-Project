import axios from "axios"
import type { Employee } from "../types/user.types";

interface GetAllEmployeeResponse {
  success: boolean;
  message: string;
  totalEmployee: number;
  employees: Employee[];
}

export const allEmployee = async () : Promise<Employee[]>=> {
    const {data} = await axios.get<GetAllEmployeeResponse>(`http://localhost:3000/api/auth/admin/getallemp`)

    console.log(data) ;
    console.log("allEmployee Function is calling" )
    return data.employees
}