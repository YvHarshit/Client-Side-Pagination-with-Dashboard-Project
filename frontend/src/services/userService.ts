import axios from "axios"
import type { Employee } from "../types/user.types"
import { toast } from "react-toastify";

interface UsersResponse {
  users: Employee[];
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  filteredUsers: number ;
}



// export const fetchUsers = async(page: number, limit: number, search: string):Promise<Employee[]> => {
//   try {
//     const  data : UsersResponse  = await axios.get<Employee[]>(`/api/users?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`, {withCredentials : true}) ;
//     return data.filter(hasDashboardFields) ;
//   } catch (error) {
//     throw new Error("Failed to fetch users")    
//   }
// }

export const fetchUsers = async (page: number,limit: number,search: string): Promise<UsersResponse> => {
  try {
    const { data } = await axios.get<UsersResponse>("/api/users", {
        params: { page,limit, search },
        withCredentials: true 
      }
    );

    return data ;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};


export const addUser = async(user :Employee): Promise<Employee> => {
  try {
    const {data} = await  axios.post<Employee>('api/add-user', user , {withCredentials: true} ) ;
    
    console.log(data)
    toast.success("Employee Added")
    return data ;  
  } catch (error) {
    throw new Error("Failed to Add User in DB") ;   
  }  
}

export const deleteEmployee = async(eid: string): Promise<Employee> => {
  try {
    const {data} = await axios.delete(`api/user/${eid}`, {withCredentials: true}) ;
    return data ;    
  } 
  catch (error) {
    throw new Error("Failed to delete User")    
  }
}

export const updateEmployee = async(employee : Employee) : Promise<Employee> => {
  if(!employee.Eid) throw new Error("Employee Id is required") ;

  try {
    const {data} = await axios.put(`/api/user/${employee.Eid}`, employee,  {withCredentials: true}) ;
    return data ;
  } 
  catch (error) {
    throw new Error("Failed to update User's Details")
  }
}
