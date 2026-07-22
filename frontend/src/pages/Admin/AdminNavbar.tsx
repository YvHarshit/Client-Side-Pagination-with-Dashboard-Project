import { LogoutRounded as LogoutRoundedIcon, AddModerator as AddModeratorIcon } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext.js'

interface NavbarProps {
  onAddEmployeeClick?: () => void;
}

const AdminNavbar = ({ onAddEmployeeClick }: NavbarProps) => {

  const [openSidebar, setOpenSidebar] = useState(false);
  const { setIsLoggedin, setUserData, userData, backendUrl } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      await axios.post(`${backendUrl}/auth/logout`);
      setIsLoggedin(false);
      setUserData(null);
      toast.success("Logout successful");
      navigate("/login");
    }
    catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  return (
<div className="font-serif">

    <header className="sticky top-0 z-40 bg-[#171f11] border-b border-[#3a5035] font-serif w-full">
     <div className="w-full px-10 py-6 flex justify-between items-center">

      <div className="flex items-center gap-4">
       <button onClick={() => setOpenSidebar(true)}
        className="p-2 rounded-md hover:bg-[#232f20] transition">
        <MenuIcon className="text-[#a8d96c]" />
       </button>

       {/* <div>
        <h1 className="text-4xl font-bold text-white"> Admin Dashboard </h1>
        </div> */}
      </div>

     <div className="relative group">
      <div className="flex items-center gap-3 cursor-pointer">
       <div className="w-12 h-12 rounded-full bg-[#232f20] border border-[#3a5035] flex items-center justify-center text-[#a8d96c] font-bold text-xl">
         {userData?.name?.[0]?.toUpperCase()}
       </div>
       <div>
        <p className="text-white font-semibold"> {userData?.name} </p>
        <p className="text-xs text-gray-400"> Administrator </p>
       </div>
      </div>

     <div className="absolute right-0 top-12 hidden group-hover:block bg-[#232f20] border border-[#3a5035] rounded-md shadow-lg w-56 overflow-hidden z-20">
      <button onClick={() => userData?.isAuthenticated ? toast("User Already Authenticated") : navigate("/auth-account")}
       className="w-full flex items-center gap-2 px-4 py-3 hover:bg-[#3a5035] transition">
       <AddModeratorIcon fontSize="small" /> Authenticate Email
      </button>

      <button onClick={handleLogout}
       className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-[#3a5035] transition">
       <LogoutRoundedIcon fontSize="small" /> Logout
      </button>
     </div>
    </div>

   </div>
 </header>

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
       <h2 className="mt-3 text-xl text-white"> {userData?.name} </h2>
       <p className="text-sm text-gray-400"> Administrator </p>
    </div>

    <div className="mt-10 space-y-2 overflow-y-auto flex-1">
    <button onClick={() => { setOpenSidebar(false); navigate("/"); }}
      className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]">Dashboard </button>

    { onAddEmployeeClick &&
    <button className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]"
     onClick={() => { setOpenSidebar(false); onAddEmployeeClick(); }} > Add Employee </button>
    }

    <button className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]"
     onClick={() => { setOpenSidebar(false); navigate("/admin/leaves"); }}> Leave Requests </button>

     <button className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]"
      onClick={() => { setOpenSidebar(false); navigate("/company/analytics"); }}> Analytics </button>

     <button className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]"
      onClick={() => { setOpenSidebar(false); navigate("/admin/today/attendance"); }}> Today's Emp Attendance </button>

     <button  className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]"
      onClick={() => {
      setOpenSidebar(false);
      if (userData?.isAuthenticated) toast("User Already Authenticated");
      else navigate("/auth-account");
      }}> Authenticate Email </button>

     <button className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]"
      onClick={() => { setOpenSidebar(false); navigate("/testimonials"); }}> Testimonials </button>

     <button className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]"
      onClick={() => { setOpenSidebar(false); navigate("/about"); }} > About Company </button>

    </div>

      <button onClick={handleLogout}
        className="mt-4 bg-red-500 rounded-md py-3 font-semibold">
        Logout </button>
  </div>
</div>
  )
}

export default AdminNavbar