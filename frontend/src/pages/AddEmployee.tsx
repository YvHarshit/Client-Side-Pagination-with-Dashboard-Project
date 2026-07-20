// import { useNavigate } from "react-router-dom";
// import { ArrowBack } from "@mui/icons-material";
// import { toast } from "react-toastify";
// import ZodUserForm from "../components/forms/ZodUserForm";
// import { addUser } from "../services/userService";
// import type { Employee } from "../types/user.types";
// import { useAppContext } from "../context/AppContext";
// import LockPersonIcon from "@mui/icons-material/LockPerson";
// import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

// import { useParams } from "react-router-dom";
// import { updateEmployee, getEmployeeById } from "../services/userService";
// import { useEffect, useState } from "react";

// const AddEmployee = () => {
//   const navigate = useNavigate();
//   const { eid } = useParams();
//   const {trigger, setTrigger, userData} = useAppContext();

//   // const handleAddEmployee = async (employee: Employee) => {
//   //   try {
//   //     await addUser(employee);
//   //     toast.success("Employee Added Successfully");
//   //     setTrigger(!trigger);
//   //     navigate("/");
//   //   } 
//   //   catch (err) {
//   //     console.error(err);
//   //     toast.error("Failed to add employee");
//   //   }
//   // }; 

//   const handleSubmit = async (employee: Employee) => {
//   try {

//     if (eid) {

//       await updateEmployee({
//         ...employee,
//         Eid: eid,
//       });

//       toast.success("Employee Updated Successfully");

//     } else {

//       await addUser(employee);

//       toast.success("Employee Added Successfully");
//     }

//     setTrigger(!trigger);
//     navigate("/");

//   } catch (err) {

//     console.error(err);

//     toast.error(
//       eid
//         ? "Failed to update employee"
//         : "Failed to add employee"
//     );
//   }
// };

//   const [editingEmployee, setEditingEmployee] =
//     useState<Employee | null>(null);

// useEffect(() => {
//     if (!eid) return;

//     const fetchEmployee = async () => {
//         const employee = await getEmployeeById(eid);
//         setEditingEmployee(employee);
//     };

//     fetchEmployee();
// }, [eid]);

//   return (
//   <div className="min-h-screen bg-[#171f11] py-10 px-6 font-serif">
//     <div className="max-w-6xl mx-auto">

//       <button onClick={() => navigate(-1)}
//         className="flex items-center gap-2 text-[#a8d96c] hover:text-white transition mb-8">
//         <ArrowBack />
//         <span className="font-semibold"> Back to Dashboard </span>
//       </button>

     
 
//   {!userData?.isAuthenticated ? (

//    <div className="flex items-center justify-center min-h-[70vh]">
//   <div className="max-w-2xl w-full bg-[#232f20] border border-[#3a5035] rounded-3xl shadow-2xl overflow-hidden">

//     <div className="bg-gradient-to-r from-red-400 to-green-900 border-b border-[#3a5035] py-10 flex flex-col items-center">
//         <div className="w-24 h-24 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center">

//            <div className="w-24 h-24 rounded-full bg-red-500/10 border border-red-500 flex items-center justify-center">
//            <LockPersonIcon sx={{ fontSize: 55, color: "#ef4444" }}/>
//            </div>
//         </div>
//         <h1 className="text-4xl font-bold text-white mt-6"> Authentication Required </h1>

//         <p className="text-gray-900 text-center mt-4 max-w-md">
//             Your account must be verified before you can register new employees.
//         </p>
//     </div>

   

//     <div className="p-8">
//         <div className="space-y-5">

//             <div className="flex items-center gap-4">
//                 <div className="w-3 h-3 rounded-full bg-lime-400"></div>
//                 <span>Secure Employee Registration</span>
//             </div>

//             <div className="flex items-center gap-4">
//                 <div className="w-3 h-3 rounded-full bg-lime-400"></div>
//                 <span>Protects Company Data</span>
//             </div>

//             <div className="flex items-center gap-4">
//                 <div className="w-3 h-3 rounded-full bg-lime-400"></div>
//                 <span>Only Verified Administrators can add employees</span>
//             </div>

//         </div>

//         <button onClick={() => navigate("/auth-account")}
//         className="mt-10 w-full bg-[#a8d96c] text-black font-semibold py-4 rounded-xl hover:scale-[1.02] transition-all duration-300">
//             Authenticate Now
//         </button>

//     </div>
//   </div>
// </div>

// ) : (

//     <div className="bg-[#232f20] border border-[#3a5035] rounded-3xl shadow-2xl overflow-hidden">
//       <div className="bg-gradient-to-r from-[#2b3b24] to-[#171f11] px-8 py-8 border-b border-[#3a5035]">
//         <div className="flex items-center gap-5">
//           <div className="w-16 h-16 rounded-full bg-[#a8d96c] flex items-center justify-center shadow-lg">
//            <PersonAddAlt1Icon  sx={{fontSize: 36, color: "#171f11" }}/>
//           </div>
//         <div>
//            <h2 className="text-3xl font-bold text-white"> Employee Registration </h2>
//            <p className="text-gray-400 mt-1"> Enter employee information to create a new account. </p>
//         </div>
//       </div>
//     </div>

//         <div className="p-8">
//            <ZodUserForm
//     onAdd={handleSubmit}
//     onUpdate={handleSubmit}
//     editingEmployee={editingEmployee}
// />
//         </div>
//     </div>
//    )}
//     </div>
//    </div>
//   );
// }

// export default AddEmployee;