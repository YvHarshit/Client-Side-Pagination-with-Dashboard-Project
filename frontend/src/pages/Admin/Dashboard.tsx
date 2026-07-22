import { useEffect, useState } from 'react'
import ZodUserForm from '../../components/forms/ZodUserForm.js'
import SearchBar from '../../components/users/SearchBar.js'
import { fetchUsers, addUser, deleteEmployee, updateEmployee } from '../../services/userService.js'
import type { Employee } from '../../types/user.types.js'
import { getMostCommonDomain, countByDomain } from '../../utils/filterEmp.js'
import { sortData } from '../../utils/sortUsers.js'
import UserCard from '../../components/users/UserCard.js'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext.js'
import FilterBar from "../../components/users/FilterBar.js";
import Pagination from "../../components/users/Pagination.js";
import { AdminDasboardChart } from "./AdminDasboardChart.js";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { filterByEmailDomain } from "../../utils/filterByDomain.js";
import AdminNavbar from './AdminNavbar.js'
 import LockPersonIcon from "@mui/icons-material/LockPerson";
import VerifiedIcon from "@mui/icons-material/Verified";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import Groups2Icon from "@mui/icons-material/Groups2";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

import AnalyticsIcon from "@mui/icons-material/Analytics";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PaymentsIcon from "@mui/icons-material/Payments";
import PsychologyIcon from "@mui/icons-material/Psychology";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import CakeIcon from "@mui/icons-material/Cake";
import EastIcon from "@mui/icons-material/East";


const Dashboard = () => {
  const { userData, currPage, searchStr, setTotalPages, totalEmp, setTotalEmp, trigger, setTrigger, filteredData, setFilteredData, selectedDomain } = useAppContext();
  const [employees, setEmployees] = useState<Employee[]>([])
  const [error, setError] = useState('')
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const navigate = useNavigate();

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
},[searchStr, currPage, trigger, selectedDomain, setTotalPages, setTotalEmp, setFilteredData]) 

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
  const topDomain = getMostCommonDomain(employees)
  //const topDomainCount = countByDomain(employees,topDomain)
return (
<div>
  <AdminNavbar/>

  <div className='my-3 mx-10 font-serif'>

    <div className="grid grid-cols-1 gap-4 text-[#a8d96c] sm:grid-cols-3">
      

<div className="relative overflow-hidden rounded-2xl border border-[#3a5035] bg-[#232f20] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#a8d96c] hover:shadow-2xl">

  {/* Glow */}
  <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#a8d96c] opacity-20 blur-3xl" />

  <div className="relative flex justify-between items-start">

    <div className="w-14 h-14 rounded-xl bg-[#31422b] flex items-center justify-center">
      <Groups2Icon sx={{ fontSize: 30, color: "#a8d96c" }} />
    </div>

    <span className="px-3 py-1 rounded-full bg-lime-900/40 text-lime-300 text-xs font-semibold">
      Active
    </span>

  </div>

  <div className="relative mt-6">

    <p className="text-gray-400 text-sm">
      Total Employees
    </p>

    <h2 className="text-5xl font-bold text-white mt-2">
      {totalEmp}
    </h2>

    <p className="mt-4 text-sm text-gray-400">
      Total registered employees in the company.
    </p>

  </div>

</div>

      

<div className="relative overflow-hidden rounded-2xl border border-[#3a5035] bg-[#232f20] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400 hover:shadow-2xl">

  {/* Glow */}
  <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-sky-400 opacity-20 blur-3xl" />

  <div className="relative flex justify-between items-start">

    <div className="w-14 h-14 rounded-xl bg-sky-900/20 flex items-center justify-center">
      <PersonSearchIcon sx={{ fontSize: 30, color: "#38bdf8" }} />
    </div>

    <span className="px-3 py-1 rounded-full bg-sky-900/30 text-sky-300 text-xs font-semibold">
      Filtered
    </span>

  </div>

  <div className="relative mt-6">

    <p className="text-gray-400 text-sm">
      Search Results
    </p>

    <h2 className="text-5xl font-bold text-white mt-2">
      {filteredData}
    </h2>

    <p className="mt-4 text-sm text-gray-400">
      Employees matching the current search and filters.
    </p>

  </div>

</div>

     
<div
  className={`relative overflow-hidden rounded-2xl border p-6 transition-all duration-300
  hover:-translate-y-1 hover:shadow-2xl
  ${
    userData?.isAuthenticated
      ? "bg-[#232f20] border-[#3a5035] hover:border-[#a8d96c]"
      : "bg-[#2a1d1d] border-red-700 hover:border-red-500"
  }`}
>

  {/* Background Glow */}
  <div
    className={`absolute -right-8 -top-8 h-28 w-28 rounded-full blur-3xl opacity-20
    ${
      userData?.isAuthenticated
        ? "bg-[#a8d96c]"
        : "bg-red-500"
    }`}
  />

  {/* Top */}
  <div className="relative flex items-start justify-between">

    <div
      className={`w-14 h-14 rounded-xl flex items-center justify-center
      ${
        userData?.isAuthenticated
          ? "bg-[#31422b]"
          : "bg-red-900/40"
      }`}
    >
      <LockPersonIcon
        sx={{
          fontSize: 32,
          color: userData?.isAuthenticated ? "#a8d96c" : "#ef4444",
        }}
      />
    </div>

    <div
      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold
      ${
        userData?.isAuthenticated
          ? "bg-lime-900/40 text-lime-300"
          : "bg-red-900/40 text-red-300"
      }`}
    >
      {userData?.isAuthenticated ? (
        <> <VerifiedIcon sx={{ fontSize: 18 }} /> Verified </>
      ) : (
        <>  <HourglassTopIcon sx={{ fontSize: 18 }} /> Pending </>
      )}
    </div>

  </div>

  {/* Title */}
  <div className="relative mt-6">

    <h3 className="text-2xl font-bold text-white">
      Administrator
    </h3>

    <p className="mt-1 text-[#a8d96c] font-medium">
      Secure Access
    </p>

    <p className="mt-4 text-sm text-gray-400 leading-6">
      {userData?.isAuthenticated
        ? "Your account is verified and can register new employees."
        : "Verify your account to unlock employee registration."}
    </p>



  </div>

</div>
    </div>

   <div className="flex items-center justify-between mt-10 mb-5">
    <div>
     <h2 className="text-3xl font-bold"> Company Analytics </h2>
     <p className="text-gray-500"> Insights from the currently displayed employees. </p>
    </div>
   </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
      <AdminDasboardChart num={filteredData} total={totalEmp} />

      <div className="relative overflow-hidden rounded-2xl border border-[#3a5035] bg-[#232f20] p-7 transition-all duration-300 hover:border-[#a8d96c] hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(168,217,108,0.12)]">

    {/* Background Glow */}
    <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#a8d96c] opacity-10 blur-3xl" />

    <div className="relative">

        {/* Header */}

        <div className="flex items-center gap-4">
           <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#31422b]">

                <AnalyticsIcon
                    sx={{
                        fontSize: 24,
                        color: "#a8d96c",
                    }}
                />

            </div>

            <div>

                <h2 className="mt-2 text-2xl font-bold text-white">
                    Explore Analytics
                </h2>

                
            </div>

           

        </div>

        {/* Divider */}

        <div className="my-3 h-px bg-[#3a5035]" />

        {/* Features */}

        <div className="grid grid-cols-2 gap-y-5 gap-x-8">

            <div className="flex items-center gap-3">
                <ApartmentIcon sx={{ color: "#a8d96c" }} />
                <span className="text-gray-200">
                    Department Analysis
                </span>
            </div>

            <div className="flex items-center gap-3">
                <PaymentsIcon sx={{ color: "#a8d96c" }} />
                <span className="text-gray-200">
                    Salary Statistics
                </span>
            </div>

            <div className="flex items-center gap-3">
                <PsychologyIcon sx={{ color: "#a8d96c" }} />
                <span className="text-gray-200">
                    Skill Distribution
                </span>
            </div>

            <div className="flex items-center gap-3">
                <AlternateEmailIcon sx={{ color: "#a8d96c" }} />
                <span className="text-gray-200">
                    Email Domains
                </span>
            </div>

            <div className="flex items-center gap-3">
                <CakeIcon sx={{ color: "#a8d96c" }} />
                <span className="text-gray-200">
                    Age Analysis
                </span>
            </div>

        </div>

        {/* Footer */}

        <div className="mt-8 rounded-xl border border-[#3a5035] bg-[#1b2418] p-4">

            <p className="text-sm text-gray-400">
                View detailed charts, trends, and company-wide insights based on
                all employee records.
            </p>

        </div>

        <button
            onClick={() => navigate("/company/analytics")}
            className="group mt-7 flex  items-center justify-center gap-3 rounded-xl bg-[#a8d96c] py-2 px-5 text-[#171f11] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
        >
            View Full Analytics

            <EastIcon className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>

    </div>

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
        <p className='text-[#ffb4a8] text-center text-sm p-12'> {error} </p>
      ) : (
        <div className="max-h-[500px] overflow-y-auto no-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            { (employees.length === 0)
            ? (
              <p className="text-center text-sm">No employees found.</p>
            ) : (
              employees.map(emp => (
                <UserCard
                  key={emp.Eid}
                  employee={emp}
                  isHighlighted={emp.email.endsWith('@' + topDomain)}
                  onDelete={handleDelete}
                  onEditClick={handleEditClick} />
              ))
            )}
          </div>
        </div>
      )
    }

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
              Authenticate Now
            </button>
          </div>
        </div>
      </div>

    ) : (

      <div className="mt-1 bg-[#232f20] border border-[#3a5035] rounded-3xl shadow-2xl overflow-hidden">

        <div className="bg-gradient-to-r from-[#2b3b24] to-[#171f11] px-8 py-8 border-b border-[#3a5035]">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-[#a8d96c] flex items-center justify-center shadow-lg">
              <PersonAddAlt1Icon sx={{ fontSize: 36, color: "#171f11" }}/>
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