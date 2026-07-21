import { LogoutRounded as LogoutRoundedIcon,  AddModerator as AddModeratorIcon} from "@mui/icons-material";
import { useEffect, useState } from 'react'
import ZodUserForm from '../../components/forms/ZodUserForm.js'
import SearchBar from '../../components/users/SearchBar.js'
import { fetchUsers , addUser, deleteEmployee, updateEmployee} from '../../services/userService.js'
import type { Employee } from '../../types/user.types.js'
import { getMostCommonDomain,countByDomain} from '../../utils/filterEmp.js'
import { sortData } from '../../utils/sortUsers.js'
import UserCard from '../../components/users/UserCard.js'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {useAppContext} from '../../context/AppContext.js'
import FilterBar from "../../components/users/FilterBar.js";
import EastIcon from '@mui/icons-material/East';
import Pagination from "../../components/users/Pagination.js";
import { AdminDasboardChart } from "./AdminDasboardChart.js";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { filterByEmailDomain } from "../../utils/filterByDomain.js";

const Dashboard = () => {

  const [openSidebar, setOpenSidebar] = useState(false);
  const { setIsLoggedin, setUserData, userData, backendUrl, currPage, searchStr, setTotalPages, totalEmp, setTotalEmp, trigger, setTrigger, filteredData, setFilteredData  , selectedDomain,} = useAppContext();

  const [employees, setEmployees] = useState<Employee[]>([])
  const [error, setError] = useState('')
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const navigate = useNavigate() ;


useEffect(() => {
  const loadData = async () => {
    try {
      setError('')

      const {users, totalUsers, totalPages, currentPage, filteredUsers} = await fetchUsers(currPage, 6, searchStr)

      const sorted = sortData(users);
      const filtered = filterByEmailDomain(sorted, selectedDomain);
      setEmployees(filtered);

      setTotalPages(totalPages)
      setTotalEmp(totalUsers)
      setFilteredData(filteredUsers)

      console.log("Current Pages : ",currentPage)      
    } 
    catch (err) {
      console.error('Failed to fetch users :', err)
      setError('Could not load employees. Check that the backend is running on port 3000.')
    }
  }
  loadData()
},[searchStr, currPage, trigger, selectedDomain]) 

const handleAddEmployee = async (newEmployee: Employee) => {
  try {
     const savedEmployee =  await addUser(newEmployee)
    setTrigger(!trigger)
    setEmployees((prevEmployees) => sortData([...prevEmployees,savedEmployee]))
    toast.success("Employee Added Successfully");
  } 
  catch (err) {
  console.error( 'Failed to add employee:',err)
  toast.error("Failed to add employee");
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
    setEmployees(prev => prev.map(emp => (emp.Eid === updatedEmployee.Eid ) ? updatedEmployee : emp));
    setEditingEmployee(null);
    toast.success("Employee Updated Successfully");
  } 
  catch (error) {
  console.error(error);
  alert("Failed to update employee, Email already exists");
  toast.error("Failed to update employee, Email already exists");
  }
};
const scrollToRegistration = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
};

const handleEditClick = (employee: Employee) => {
  setEditingEmployee(employee);  
  scrollToRegistration()
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

return (
<div>

    <header className="sticky top-0 z-40 bg-[#171f11] border-b border-[#3a5035] font-serif">
     <div className="max-w-[1300px] mx-auto px-6 py-4 flex justify-between items-center">           
      <div>
       <h1 className="text-3xl font-bold text-white">  Admin Dashboard </h1>
         <p className="text-sm text-gray-400 mt-1">
         Welcome back, <span className="text-lg text-[#a8d96c]">{userData?.name}</span>
         </p>
         <p className="text-gray-400 text-xs mt-1"> Manage employees, attendance and analytics. </p>
      </div>
     </div>
    </header>

  <div className="max-w-[1300px] mx-auto py-5 px-6 font-serif">

   <div className="flex justify-between items-center mb-4">
    <div className="flex items-center gap-4">
     <button onClick={() => setOpenSidebar(true)}
      className="p-2 rounded-md hover:bg-[#232f20] transition">
      <MenuIcon className="text-[#a8d96c]" />
     </button>
    </div>

  <div className="relative group">

   <div className="flex items-center gap-3 cursor-pointer">
    <div className=" w-12 h-12 rounded-full bg-[#232f20] border border-[#3a5035] flex items-center justify-center text-[#a8d96c] font-bold text-xl">
      {userData?.name?.[0]?.toUpperCase()}
    </div>
    <div>
     <p className="text-white font-semibold"> {userData?.name} </p>
     <p className="text-xs text-gray-400"> Administrator  </p>
    </div>
   </div>


  <div className=" absolute right-0 top-12 hidden group-hover:block bg-[#232f20] border border-[#3a5035] rounded-md shadow-lg w-56 overflow-hidden z-20">
    <button onClick={() => userData?.isAuthenticated ? toast("User Already Authenticated") : navigate("/auth-account")}
     className="w-full flex items-center gap-2 px-4 py-3 hover:bg-[#3a5035] transition">
     <AddModeratorIcon fontSize="small" />  Authenticate Email
    </button>

    <button onClick={handleLogout}
     className=" w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-[#3a5035] transition">
     <LogoutRoundedIcon fontSize="small" /> Logout
    </button>
    </div>
  </div>

  <div onClick={() => setOpenSidebar(false)}
    className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ease-in-out ${
    openSidebar ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    }`}/>

  <div
    className={`fixed top-0 left-0 h-full w-72 bg-[#232f20] border-r border-[#3a5035] p-6 z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
     openSidebar ? 'translate-x-0' : '-translate-x-full'}`}>

     <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold text-[#a8d96c]"> Menu </h2>
      <button onClick={() => setOpenSidebar(false)}> <CloseIcon className="text-white"/> </button>
     </div>

    <div className="mt-8">
      <div className="w-16 h-16 rounded-full bg-[#171f11] flex items-center justify-center text-[#a8d96c] text-2xl font-bold">
        {userData?.name?.[0]?.toUpperCase()}
      </div>
       <h2 className="mt-3 text-xl text-white">  {userData?.name} </h2>
       <p className="text-sm text-gray-400"> Administrator </p>
    </div>

    <div className="mt-10 space-y-2 overflow-y-auto flex-1">
    <button onClick={() => setOpenSidebar(false)}
      className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]">Dashboard </button>

            

    <button className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]"
     onClick={() => { 
     setOpenSidebar(false); 
     scrollToRegistration();
     }} > Add Employee </button>

    <button className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]"
     onClick={() => {
     setOpenSidebar(false);
     navigate("/admin/leaves");
     }}> Leave Requests </button>

     <button className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]"
      onClick={() => {
      setOpenSidebar(false);
      navigate("/company/analytics"); 
      }}> Analytics </button>

     <button className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]"
      onClick={() => {
      setOpenSidebar(false);
      navigate("/admin/today/attendance"); 
      }}> Today's Emp Attendance </button>

     <button  className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]"
      onClick={() => {
      setOpenSidebar(false);
      if (userData?.isAuthenticated)   toast("User Already Authenticated");
      else    navigate("/auth-account");
      }}>  
      Authenticate Email </button>

     <button className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]"
      onClick={() => {
      setOpenSidebar(false);
      navigate("/testimonials"); 
      }}> Testimonials </button>

     <button className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]"
      onClick={() => {  setOpenSidebar(false);
      navigate("/about"); }} >
      About Company  </button>
          
    </div>

      <button onClick={handleLogout}
        className=" mt-4 bg-red-500 rounded-md py-3 font-semibold">
        Logout </button>
  </div>
</div>

    <div className="grid grid-cols-1 gap-4 text-[#a8d96c] sm:grid-cols-2">

      <div className='bg-[#232f20] border border-[#3a5035] rounded-lg p-5' >
        <p className='text-3xl'>  {totalEmp}   </p>
        <p className='text-lg mt-2'>   Total Employees  </p>
      </div>
      
      <div className='bg-[#232f20] border border-[#3a5035] rounded-lg p-5'>
        <p className='text-3xl'>   {filteredData}   </p> 
        <p className='text-lg mt-2'> Searched Employees </p>
       </div>
    </div>    

  <h2 className="text-2xl mt-6 mb-2"> Company Analytics </h2>  
    
    <div className="grid grid-cols-1 gap-4 text-[#a8d96c] sm:grid-cols-2">
      <AdminDasboardChart num={filteredData} total={totalEmp} />

      <div className="relative bg-[#232f20] border border-[#3a5035] rounded-lg p-5 min-h-[380px]">
         <p className="text-lg text-[#a8d96c]"> Most common email domain of employee in the currently displayed card  </p>
         <div className="flex items-center justify-between mt-3">  
          <span className="bg-gray-700 rounded-lg px-4 py-2">  @{topDomain} </span>
          <span className="text-white">[ {topDomainCount} employees ] </span>
         </div>
  
        <button onClick={() => navigate("/company/analytics")}
        className="absolute bottom-5 right-5 bg-[#a8d96c] text-black px-4 py-3 rounded-md font-semibold hover:scale-105 transition-all">
         Full Analytics <EastIcon />   </button>
      </div>

    </div>

<h2 className="text-2xl mt-6"> Employees List </h2>

    <div className="flex gap-3 mt-4 mb-1">
      <div className="flex-grow"> <SearchBar/> </div>
      <div> <FilterBar/> </div>
   </div> 
 
  {
    error 
    ? ( 
    <p className='text-[#ffb4a8] text-center text-sm p-12'> {error} </p> ) 
    : (
      <div className="max-h-[500px] overflow-y-auto no-scrollbar"> 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        { (employees.length === 0)
        ?  (
          <p className="text-center text-sm">No employees found.</p>) 
        :  (
          employees.map(emp => (
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

<Pagination/>

<h2 className="text-2xl mt-12 mb-4"> {editingEmployee ? "Edit Employee" : "Registration"} </h2>

  { !userData?.isAuthenticated 
  ? (
    <div className="flex items-center justify-center py-10">
      <div className="max-w-2xl w-full bg-[#232f20] border border-[#3a5035] rounded-3xl shadow-2xl overflow-hidden">

        <div className="bg-gradient-to-r from-red-400 to-green-900 border-b border-[#3a5035] py-10 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-red-500/10 border border-red-500 flex items-center justify-center">
            <LockPersonIcon sx={{ fontSize: 55, color: "#ef4444" }}/>
          </div>
          <h1 className="text-4xl font-bold text-white mt-6 text-center"> Authentication Required </h1>
          <p className="text-gray-900 text-center mt-4 max-w-md"> Your account must be verified before you can register new employees. </p>
        </div>

        <div className="p-8">
          <div className="space-y-5">

            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-lime-400"></div>
              <span>Secure Employee Registration</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-lime-400"></div>
              <span>Protects Company Data</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-lime-400"></div>
              <span>Only Verified Administrators can add employees</span>
            </div>
          </div>

          <button onClick={() => navigate("/auth-account")}
            className="mt-10 w-full bg-[#a8d96c] text-black font-semibold py-4 rounded-xl hover:scale-[1.02] transition-all duration-300">
            Authenticate Now </button>
        </div>
      </div>
    </div>

  ) : (

    <div className="mt-1 bg-[#232f20] border border-[#3a5035] rounded-3xl shadow-2xl overflow-hidden">

      <div className="bg-gradient-to-r from-[#2b3b24] to-[#171f11] px-8 py-8 border-b border-[#3a5035]">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-[#a8d96c] flex items-center justify-center shadow-lg">
            <PersonAddAlt1Icon sx={{fontSize: 36, color: "#171f11" }}/>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white"> {editingEmployee ? "Edit Employee" : "Employee Registration"} </h2>
            <p className="text-gray-400 mt-1">
              {editingEmployee
                ? "Update this employee's information below."
                : "Enter employee information to create a new account."}
            </p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <ZodUserForm
          onAdd={handleAddEmployee}
          onUpdate={handleUpdate}
          editingEmployee={editingEmployee}/>
      </div>
    </div>
  )}  
  </div>  
 </div>
  )
}

export default Dashboard