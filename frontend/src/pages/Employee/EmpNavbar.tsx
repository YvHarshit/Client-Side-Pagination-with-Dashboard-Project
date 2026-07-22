import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const EmpNavbar = () => {

  const [openSidebar, setOpenSidebar] = useState(false);
  const { empDetails } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setOpenSidebar(false);
    navigate("/emp-login");
  };

  return (
 <div className = "font-serif">

    <header className="bg-[#171f11] border-b border-[#3a5035]  w-full">
     <div className="w-full px-6 py-6 flex justify-between items-center">

      <div className="flex items-center gap-4">
       <button onClick={() => setOpenSidebar(true)}
        className="p-2 rounded-md hover:bg-[#232f20] transition">
        <MenuIcon className="text-[#a8d96c]" />
       </button>

       <div>
        <h1 className="text-3xl font-bold text-white"> Employee Dashboard </h1>
       </div>
      </div>

      <div className="flex items-center gap-3">
       <div className="w-10 h-10 rounded-full bg-[#171f11] border border-[#3a5035] flex items-center justify-center text-[#a8d96c] font-bold">
        {empDetails?.name?.[0]?.toUpperCase()}
       </div>

       <div>
        <p className="text-sm font-semibold text-white"> {empDetails?.name || "Employee"} </p>
        <p className="text-xs text-gray-400"> Employee </p>
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
        {empDetails?.name?.[0]?.toUpperCase()}
      </div>
       <h2 className="mt-3 text-xl text-white"> {empDetails?.name || "Employee"} </h2>
       <p className="text-sm text-gray-400"> Employee </p>
    </div>

    <div className="mt-10 space-y-2 overflow-y-auto flex-1">
    <button onClick={() => { setOpenSidebar(false); navigate("/emp-dashboard"); }}
      className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]"> Dashboard </button>

    <button onClick={() => { setOpenSidebar(false); navigate("/profile"); }}
      className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]"> My Profile </button>

    <button onClick={() => { setOpenSidebar(false); navigate("/emp/apply-leave"); }}
      className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]"> Apply Leave </button>

    <button onClick={() => { setOpenSidebar(false); navigate("/emp/my-leaves"); }}
      className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]"> My Leaves </button>

    <button onClick={() => { setOpenSidebar(false); navigate("/emp/attendance"); }}
      className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]"> Attendance </button>

    </div>

      <button onClick={handleLogout}
        className="mt-4 bg-red-500 rounded-md py-3 font-semibold">
        Logout </button>
  </div>
</div>
  )
}

export default EmpNavbar