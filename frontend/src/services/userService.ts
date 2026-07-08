import axios from "axios"
import type { Employee } from "../types/user.types"



const hasDashboardFields = (employee: Employee): boolean => {
  return [employee.name, employee.email, employee.phone, employee.department].every(
    (value) => typeof value === 'string' && value.trim().length > 0
  )
}

export const fetchUsers = async():Promise<Employee[]> => {
  try {
    const { data } = await axios.get<Employee[]>('/api/users', {withCredentials : true}) ;
    return data.filter(hasDashboardFields) ;
  } catch (error) {
    throw new Error("Failed to fetch users")    
  }
}


export const addUser = async(user :Employee): Promise<Employee> => {
  try {
    const {data} = await  axios.post<Employee>('api/add-user', user , {withCredentials: true} ) ;
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
