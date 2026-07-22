import { useEffect, useState } from "react";
import type {Attendance} from "../../types/user.types"
import { useAppContext } from "../../context/AppContext";
import { myEmpTodayAttendance } from "../../services/attendanceServices";
import AdminNavbar from "./AdminNavbar";

const EmpTodayAttendance = () => {
  const {backendUrl} = useAppContext()
  const [attendance, setAttendance] = useState<Attendance[]>([]);

  // eslint-disable-next-line react-hooks/immutability
  useEffect(() => { fetchAttendance() }, []);

  const fetchAttendance = async () => {
    try {
      const data = await myEmpTodayAttendance(backendUrl)
      if (data.success)  setAttendance(data.empTodayAttendence);      
    } 
    catch (error) {
      console.log(error);
    } 
  };

  
return (
  <div>
    <AdminNavbar/> 
  <div className="mx-10 px-6 py-10 font-serif">
    <div className="mb-8">
     <h1 className="text-3xl font-bold text-white"> Today's Employee Attendance </h1>
     <p className="text-[#9fb396] mt-2"> View today's attendance records of all employees. </p>
    </div>

     <div className="bg-[#232f20] border border-[#3a5035] rounded-2xl shadow-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#3a5035]">
       <div>
        <h2 className="text-2xl font-semibold text-white"> Attendance Records </h2>
        <p className="text-[#9fb396] text-sm mt-1"> Total Employees Marked Today:{" "}
         <span className="font-bold text-lime-400"> {attendance.length} </span>
        </p>
        </div>
      </div>

    <div className="overflow-x-auto">
     <table className="w-full">
      <thead className="bg-[#171f11] text-lime-400 uppercase text-sm">
        <tr>
         <th className="px-5 py-4 text-center">Employee ID</th>
         <th className="px-5 py-4 text-center">Email</th>
         <th className="px-5 py-4 text-center">Check In</th>
         <th className="px-5 py-4 text-center">Check Out</th>
         <th className="px-5 py-4 text-center">Status</th>
        </tr>
       </thead>
       <tbody>

   {attendance.length === 0 ? (
     <tr>
      <td colSpan={5} className="py-20 text-center text-gray-400 text-lg">
        No Attendance Found 
      </td>
      </tr>

    ) : (
     attendance.map((item) => (
     <tr key={item._id} className="border-t border-[#3a5035] hover:bg-[#171f11] transition-all duration-300">

         <td className="px-5 py-4 text-center font-semibold"> {item.employeeId}  </td>
         <td className="px-5 py-4 text-center"> {item.email} </td>
         <td className="px-5 py-4 text-center">
            {item.clockIn ? new Date(item.clockIn).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"}) : "--"}
         </td>
         <td className="px-5 py-4 text-center">
            {item.checkOut? new Date(item.checkOut).toLocaleTimeString([], {hour: "2-digit",minute: "2-digit"}): "--"}
         </td>
         <td className="px-5 py-4 text-center">
          <span className={`px-4 py-1 rounded-full text-white ${
               item.status === "Present"
                 ? "bg-green-500"
                 : item.status === "Absent"
                 ? "bg-red-500"
                 : item.status === "Late"
                 ? "bg-yellow-500"
                 : item.status === "Half Day"
                 ? "bg-blue-500"
                 : "bg-indigo-500"
             }`}>
           {item.status || "Updated at checkout"}
         </span>
         </td>
     </tr>
      ))
     )}
    </tbody>
   </table>
   </div>
  </div>
 </div>
 </div>
);
 
};

export default EmpTodayAttendance;