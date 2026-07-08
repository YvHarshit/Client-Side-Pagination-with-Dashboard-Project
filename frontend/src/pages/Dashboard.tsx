import { LogoutRounded as LogoutRoundedIcon, VerifiedUser as VerifiedUserIcon, AddModerator as AddModeratorIcon, GppMaybe as GppMaybeIcon} from "@mui/icons-material";
import { useEffect, useState } from 'react'
import ZodUserForm from '../components/forms/ZodUserForm.js'
import SearchBar from '../components/users/SearchBar.js'
import { fetchUsers , addUser, deleteEmployee, updateEmployee} from '../services/userService.js'
import type { Employee } from '../types/user.types.js'
import {searchedFilterEmployees, getMostCommonDomain,countByDomain,countPerDepart} from '../utils/filterUsers.js'
import { sortData } from '../utils/sortUsers.js'
import UserCard from '../components/users/UserCard.js'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {useAppContext} from '../context/AppContext'


import FilterBar from "../components/users/FilterBar.js";
import { filterByEmailDomain } from "../utils/filterByDomain.js";
import Pagination from "../components/users/Pagination.js";




const Dashboard = () => {

  const { setIsLoggedin, setUserData, userData, backendUrl, currPage } = useAppContext();

  const [employees, setEmployees] = useState<Employee[]>([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const navigate = useNavigate() ;

  const {selectedDomain} = useAppContext () ;

useEffect(() => {
  const loadData = async () => {
    try {
      setError('')

      const users = await fetchUsers()
      const sorted = sortData(users)
      setEmployees(sorted)
      
    } catch (err) {
      console.error('Failed to fetch users :', err)
      setError('Could not load employees. Check that the backend is running on port 3000.')
    }
  }
  loadData()
},[]) 

const handleAddEmployee = async (newEmployee: Employee) => {
  try {
    const savedEmployee = await addUser(newEmployee)
    setEmployees((prevEmployees) => sortData([...prevEmployees,savedEmployee]))
  } 
  catch (err) {
  console.error( 'Failed to add employee:',err)
  }}

const handleDelete = async (Eid: string) => {
  try {
    await deleteEmployee(Eid)
    setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.Eid !== Eid));
    toast.success("Employee deleted successfully");

  } catch (error) {
    console.error(error);
    toast.error("Failed to delete employee");
  }
};

const handleUpdate = async (employee: Employee) => {
  if (!employee.Eid) {
    alert("Missing Employee ID");
    toast.error("Missing Employee ID");
    return;
  }
  try {
    const updatedEmployee = await updateEmployee(employee);

    setEmployees(prev =>
      prev.map(emp => (emp.Eid === updatedEmployee.Eid ) ? updatedEmployee : emp)
    );
    setEditingEmployee(null); 
  } 
  catch (error) {
  console.error(error);
  alert("Failed to update employee, Email already exists");
  toast.error("Failed to update employee, Email already exists");
  }
};

const handleEditClick = (employee: Employee) => {
  setEditingEmployee(employee);
  

  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
};




const handleLogout = async () => {
  try {
    axios.defaults.withCredentials = true;
    await axios.post(`${backendUrl}/auth/logout`);
    setIsLoggedin(false);
    setUserData(null);
    toast.success("Logout successful");
  } 
  catch (error) {
    console.error(error);
    toast.error("Logout failed");
  }
};


  const topDomain = getMostCommonDomain(employees)

  const topDomainCount = countByDomain(employees,topDomain)

  const departmentCounts = countPerDepart(employees)

  const sortedCompanies = Object.entries(departmentCounts)
    .sort((a, b) => b[1] - a[1])

  const filteredEmployees = searchedFilterEmployees(employees, search)  

  // const applyFilteredData = filterByEmailDomain(employees, selectedDomain)    //  this is for filter functionality

  const searchEmployees = searchedFilterEmployees(employees,search) ;
  const finalEmployees = filterByEmailDomain(searchEmployees, selectedDomain)
  
  const n = Math.ceil( (finalEmployees.length)/3 )
  

  // console.log("SelectedDomain in Dashboard.tsx: ",selectedDomain )
  // console.log("applyFilteredData in Dashboard.tsx: ",applyFilteredData )

  return (

<div className="max-w-[1100px] mx-auto py-10 px-6 font-serif">

  <div className="flex items-center justify-between">
    <span className='text-xl'>Welcome, {" "} 
      <span className='text-2xl font-semibold text-[#a8d96c] my-5'>  {userData?.name} {" "}
        {userData?.isAuthenticated ? 
          <VerifiedUserIcon fontSize="large" className="text-lime-400 text-3xl"/> :
          <span className = "cursor-pointer" onClick={() => navigate('/auth-account')}>
          <GppMaybeIcon  fontSize="large" className="text-red-500 text-3xl "/>
          </span>
          } 
      </span>
    </span>

 
    <div className='inline px-3 py-2 border border-3 text-4xl font-semibold rounded-full bg-[#171f11] text-[#a8d96c] relative group'>
     {userData?.name[0].toUpperCase()}
 
     <div className='absolute hidden group-hover:block right-0 top-0 pt-15 z-10 text-[#a8d96c] text-sm '>
       <ul className='p-2 list-none m-0 bg-[#232f20] border rounded-md w-max'>
         <li onClick={handleLogout} 
         className="cursor-pointer py-1 px-2 hover:text-red-400 hover:bg-[#3a5035] text-sm"><LogoutRoundedIcon/> Logout</li>
         <li onClick={() => (userData?.isAuthenticated ? toast("User Already Authenticated") : navigate('/auth-account'))}
         className="cursor-pointer py-1 px-2 hover:text-green-400 hover:bg-[#3a5035] text-sm"> <AddModeratorIcon/> Auth-Email </li>
       </ul>
     </div>
    </div>
  </div>

  <div className='my-7'>
    <h1 className='text-4xl font-semibold text-center'> Company Dashboard  </h1>
  </div>



    <div className="grid grid-cols-2 gap-4 text-[#a8d96c]">
      <div className='bg-[#232f20] border border-[#3a5035] rounded-lg p-5' >
        <p className='text-3xl'>  {employees.length}   </p>
        <p className='text-lg mt-2'>   Total Employees  </p>
      </div>
     <div className='bg-[#232f20] border border-[#3a5035] rounded-lg p-5'>
        <p className='text-3xl'>   {finalEmployees.length}   </p> 
        <p className='text-lg mt-2'> Filtered Employees </p>
      </div>
    </div>

    <h2 className="text-2xl mt-6"> Company Analytics </h2>

      <div className='mt-3 bg-[#232f20] rounded-lg px-3 py-5 mb-6'>
        <p className='text-md'> 
          Most common email domain:{' '}
          <strong className="text-[#a8d96c]">  @ {topDomain} </strong>
          {' '}—{' '}
          <span className='text-[#7a9970]'>  {topDomainCount} employees </span>
        </p>
      </div>     

      <div className='bg-[#232f20] border border-[#3a5035] rounded-md p-4'>
        <h2 className='text-lg mb-3' >  Employees per Department </h2>


        <div  className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-2 ">

          {sortedCompanies.map(([depart, count]) => (

            <div key={depart}
            className='flex text-center justify-between p-2 bg-[] border border-[#3a5035] rounded-lg bg-[#171f11]'>
              <span className='text-sm'> {depart.toUpperCase()}  </span>
              <span className='text-lime-300 text-md font-semibold'>
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

<h2 className="text-2xl mt-6"> Employees List </h2>
      
 

    <div className="flex gap-3 mt-2 mb-1">
      <div className="flex-grow"> <SearchBar search={search} setSearch={setSearch} /> </div>
      <div> <FilterBar/> </div>
   </div>
    
 

{error ? 
( <p className='text-[#ffb4a8] text-center text-sm p-12'> {error} </p> ) 
: 
(<div className="max-h-[500px] overflow-y-auto no-scrollbar"> 
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
    { (filteredEmployees.length === 0 )
    ? 
    (
      <p className="text-center text-sm">No employees found.</p>) 
      : 
      (
      finalEmployees.slice((currPage-1)*3 , (currPage-1)*3 + 3).map(emp => (
        <UserCard
          key={emp.Eid}
          employee={emp}
          isHighlighted={emp.email.endsWith('@' + topDomain)}
          onDelete={handleDelete}
          onEditClick={handleEditClick}  />
      ))
    )}
  </div>
</div>
)}


{ <Pagination toatlPages={n}/>}



<h2 className="text-2xl mt-12"> Registration </h2>

  { !userData?.isAuthenticated 
  && 
    <h2 className="text-2xl text-center text-red-500 rounded-sm my-2 p-10 bg-[#232f20]"> 
    First Authenticate yourself to add employee </h2>
  }  
  { userData?.isAuthenticated 
   &&
   (
   <div className="mt-1">
        <ZodUserForm
          onAdd={handleAddEmployee}
          onUpdate={handleUpdate}
          editingEmployee={editingEmployee}  />
    </div>)
  }
  </div>
  )
}

export default Dashboard
