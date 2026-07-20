import axios from "axios";
import type { Employee } from "../types/user.types";

export const allEmployee = async (backendUrl: string): Promise<Employee[]> => {
  const { data } = await axios.get( `${backendUrl}/auth/admin/getallemp`);

  console.log(data);
  console.log("allEmployee Function is calling");

  return data.employees;
};