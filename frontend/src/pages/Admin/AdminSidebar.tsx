import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext.js";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
  onAddEmployeeClick?: () => void;
}

const Sidebar = ({ open, onClose, onLogout, onAddEmployeeClick }: SidebarProps) => {
  const { userData } = useAppContext();
  const navigate = useNavigate();

  const go = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <>
      <div onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ease-in-out ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none" }`} />

      <div className={`fixed top-0 left-0 h-full w-72 bg-[#232f20] border-r border-[#3a5035] p-6 z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full" }`}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-[#a8d96c]">Menu</h2>
          <button onClick={onClose}>
            <CloseIcon className="text-white" />
          </button>
        </div>

        <div className="mt-8">
          <div className="w-16 h-16 rounded-full bg-[#171f11] flex items-center justify-center text-[#a8d96c] text-2xl font-bold">
            {userData?.name?.[0]?.toUpperCase()}
          </div>
          <h2 className="mt-3 text-xl text-white">{userData?.name}</h2>
          <p className="text-sm text-gray-400">Administrator</p>
        </div>

        <div className="mt-10 space-y-2 overflow-y-auto flex-1">
          <button onClick={() => go("/dashboard")} className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]">
            Dashboard
          </button>

          <button
            className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]"
            onClick={() => {
              onClose();
              onAddEmployeeClick?.();
            }}
          >
            Add Employee
          </button>

          <button className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]" onClick={() => go("/admin/leaves")}>
            Leave Requests
          </button>

          <button className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]" onClick={() => go("/company/analytics")}>
            Analytics
          </button>

          <button className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]" onClick={() => go("/admin/today/attendance")}>
            Today's Emp Attendance
          </button>

          <button
            className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]"
            onClick={() => {
              onClose();
              if (userData?.isAuthenticated) toast("User Already Authenticated");
              else navigate("/auth-account");
            }}
          >
            Authenticate Email
          </button>

          <button className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]" onClick={() => go("/testimonials")}>
            Testimonials
          </button>

          <button className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]" onClick={() => go("/about")}>
            About Company
          </button>
        </div>

        <button onClick={onLogout} className="mt-4 bg-red-500 rounded-md py-3 font-semibold">
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;