import { useState } from "react"
import axios from "axios";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { getEmpDetails } from "../../services/empService";


const EmpLogin = () => {

    const {backendUrl, setEmpDetails} = useAppContext() ;

    const navigate = useNavigate() ;

    const [email, setEmail] = useState("") ;
    const [password, setPassword] = useState("") ;

  
const formSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const { data } = await axios.post(`${backendUrl}/user/emplogin`, { email, password },
      { withCredentials: true }
    );

    if (data.success) {
      toast.success("Employee Successfully Logged In");

      const empData = await getEmpDetails(backendUrl);

      if (empData.success) {
        setEmpDetails(empData.emp);
      }

      navigate("/emp-dashboard");
    }
  } catch (error) {
    console.error(error);
    toast.error("Employee Login failed");
  }
};
   

  return (
  <div className="flex items-center justify-center min-h-screen px-6 ">

      <div className="absolute top-8 right-8 flex rounded-lg overflow-hidden border border-slate-500">

     <button onClick={() => navigate("/login")}
       className={`px-6 py-3 transition-colors ${location.pathname === "/login"
           ? "bg-lime-400 text-black font-semibold"
           : "bg-slate-700 text-white hover:bg-slate-600" }`} >
       As Admin
     </button>
   
     <button onClick={() => navigate("/emp-login")}
       className={`px-6 py-3 transition-colors ${location.pathname === "/emp-login"
           ? "bg-lime-400 text-black font-semibold"
           : "bg-slate-700 text-white hover:bg-slate-600"}`}>
       As Employee
     </button>

</div>


      <div className="border border-white p-12 rounded-lg w-full max-w-md bg-[#232f20]">
        
            <h2 className="text-4xl  font-semibold mb-3 text-center text-lime-300"> Login to Emloyee Dashboard </h2>
            <p className="text-sm font-semibold mb-8 text-center text-lime-500"> Login to your account</p>

           <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"> 
            <form onSubmit={formSubmit}>
                <label className="block text-md font-medium text-gray-100">Email :</label> 
                <input type="email" placeholder="Enter your email"  onChange={(e) => setEmail(e.target.value)} value={email}
                className="mt-3 w-full rounded-md px-3 py-3 text-base text-white bg-[#2c3d28]  outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-500 sm:text-sm" />

                <label className="mt-3 block text-md font-medium text-gray-100">Password :</label> 
                <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} value={password}
                className="mt-3 block w-full rounded-md px-3 py-3 text-base text-white bg-[#2c3d28]  outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-500 sm:text-sm" />

                 <button type="submit" className="mt-6 flex w-full justify-center rounded-md bg-lime-600  px-3 py-1.5 text-md font-semibold text-white hover:bg-lime-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500">Sign in</button>
      
            </form>
        </div>
    </div>
  </div>
  )
}

export default EmpLogin ;