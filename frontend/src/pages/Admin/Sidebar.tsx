import {DashboardRounded, GroupRounded, PersonAddRounded, EventNoteRounded, AnalyticsRounded, LogoutRounded } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import type {SidebarProps} from "../../types/user.types"

const Sidebar = ({ handleLogout, userName }: SidebarProps) => {
  return (
    <aside className="w-64 min-h-screen bg-[#232f20] border-r border-[#3a5035] text-[#a8d96c] flex flex-col">

      <div className="p-6 border-b border-[#3a5035]">
        <div className="w-16 h-16 rounded-full bg-[#171f11] border border-[#3a5035] flex items-center justify-center text-2xl font-bold">
          {userName[0].toUpperCase()}
        </div>

        <h2 className="mt-4 text-xl font-semibold"> {userName} </h2>
        <p className="text-sm text-gray-400"> Administrator </p>
      </div>


      <nav className="flex-1 mt-6">

        <NavLink to="/dashboard" className="flex items-center gap-3 px-6 py-3 hover:bg-[#3a5035]">
          <DashboardRounded /> Dashboard
        </NavLink>

        <NavLink to="/employees" className="flex items-center gap-3 px-6 py-3 hover:bg-[#3a5035]">
          <GroupRounded /> Employees
        </NavLink>

        <NavLink to="/add-employee" className="flex items-center gap-3 px-6 py-3 hover:bg-[#3a5035]">
          <PersonAddRounded /> Add Employee
        </NavLink>

        <NavLink to="/admin/leaves" className="flex items-center gap-3 px-6 py-3 hover:bg-[#3a5035]">
          <EventNoteRounded /> Leave Requests
        </NavLink>

        <NavLink to="/company/analytics" className="flex items-center gap-3 px-6 py-3 hover:bg-[#3a5035]">
          <AnalyticsRounded /> Analytics
        </NavLink>

      </nav>

      <div className="p-4 border-t border-[#3a5035]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 bg-red-500/10 text-red-400
          hover:bg-red-500/20 rounded-md px-4 py-3"
        >
          <LogoutRounded />

          Logout

        </button>

      </div>

    </aside>
  );
};

export default Sidebar;