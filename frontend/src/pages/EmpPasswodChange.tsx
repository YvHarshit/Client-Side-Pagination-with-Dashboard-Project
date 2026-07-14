import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";


const EmpPasswodChange = () => {
  const navigate = useNavigate() ;
  const {backendUrl} = useAppContext() ;
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("") ;
  const [confirmPassword, setConfirmPassword] = useState("") ;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!newPassword || !confirmPassword) {
    toast.error("Please fill in both fields.");
    return;
  }

  if (newPassword !== confirmPassword) {
    toast.error("Passwords do not match.");
    return;
  }

  try {
     await axios.post(`${backendUrl}/user/emp-change-password`, { newPassword }, { withCredentials: true } );

    toast.success("Password changed successfully.");
    navigate("/emp-login")
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Something went wrong.");
  }
};


  return (
    <div className="flex items-center justify-center bg-gray-700 min-h-screen">
        <div className="  px-9 py-6 border border-black rounded-md bg-gray-900 items-center">
            <h2 className="text-4xl my-5 font-semibold text-center text-lime-500">Change Password</h2>
            <p className="text-sm mt-3 mb-9 text-indigo-400 w-full"> Change you password on you very first login to secure your account</p>

           <form className="flex flex-col" onSubmit={handleSubmit}>
             
               <label className="block mb-2">New Password : </label>
               <div className="relative">
                  <input type={showPassword ? "text" : "password"} onChange={(e) => setNewPassword(e.target.value)}
                    className="block border border-white my-3 px-3 py-2 w-full rounded pr-16"
                    placeholder="Enter new password"
                  />
                
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-lime-500">
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>


              <label className="block mb-2">Confirm Password : </label>
               <div className="relative">
                  <input type={showPassword ? "text" : "password"} onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block border border-white my-3 px-3 py-2 w-full rounded pr-16"
                    placeholder="Enter Confirm password"
                  />
                
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-lime-500">
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
           
           
             <button className="bg-lime-700 rounded-full w-full py-3 mt-6 hover:scale-105 transition-all">
               Submit
             </button>
           </form>
        </div>
    </div>
  )
}

export default EmpPasswodChange