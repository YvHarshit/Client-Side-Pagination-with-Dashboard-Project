import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/AppContext";
import CloseIcon from '@mui/icons-material/Close';
import type {Leave, Attendance} from "../../types/user.types"
import { getAttendanceHistory } from "../../services/attendanceServices";
import { getMyLeaves } from "../../services/leaveServices";
import EmpNavbar from "./EmpNavbar";
import {EventAvailableRounded, FactCheckRounded, Inventory2Rounded, PendingActionsRounded} from "@mui/icons-material";

const TOTAL_LEAVE_ALLOWANCE = 24;
const UPCOMING_HOLIDAYS = [
  { name: "Independence Day", date: "2026-08-15" },
  { name: "Gandhi Jayanti", date: "2026-10-02" },
  { name: "Diwali", date: "2026-11-08" },
];
const ANNOUNCEMENTS = [
  { title: "Office closed for maintenance", message: "The office will be closed on 25th July for AC maintenance.", date: "2026-07-18" },
  { title: "New HR policy", message: "Updated leave policy is now live — check your email for details.", date: "2026-07-10" },
];


const MainEmpDas = () => {
  const { empDetails, backendUrl } = useAppContext();
  const navigate = useNavigate();
  const [openSidebar, setOpenSidebar] = useState(false);

  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchDashboardData = async () => {
    try {
    const attendanceData = await getAttendanceHistory(backendUrl);
    const leaveData = await getMyLeaves(backendUrl);

    setAttendance(attendanceData.attendance || []);
    setLeaves(leaveData.leaves || []);
    } 
    catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error(error.stack)
      } else {
        toast.error("Failed to load dashboard data");
      }
    } finally {
      setLoading(false);
    }
  };

  fetchDashboardData();
}, [backendUrl]);

  const handleLogout = () => {
    setOpenSidebar(false);
    navigate("/emp-login");
  };

  const todayStr = new Date().toISOString().split("T")[0];
  const todayRecord = attendance.find((a) => a.date?.startsWith(todayStr));

  const presentDays = attendance.filter((a) => a.status === "Present").length;
  const attendancePercent = attendance.length ? Math.round((presentDays / attendance.length) * 100) : 0;

  const pendingLeaves = leaves.filter((l) => l.status === "Pending").length;
  const usedLeaveDays = leaves .filter((l) => l.status === "Approved").reduce((sum, l) => sum + (l.totalDays || 0), 0);
  const remainingLeaveDays = Math.max(TOTAL_LEAVE_ALLOWANCE - usedLeaveDays, 0);

  const recentLeaves = [...leaves]
    .sort((a, b) => new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime())
    .slice(0, 4);

  const formatDate = (date: string) => new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  const formatTime = (date?: string | Date | null) => {
  if (!date) return "-";

  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    });
  };

  console.log("Today's Record:", todayRecord);

  return (
    <div>
    <div className="sticky top-0 z-40 "> <EmpNavbar/> </div>

      <div className="max-full py-5 px-9 font-serif">

        <div className="mb-5">
        <p className="text-lg mt-1"> Welcome, <span className="text-lime-500 text-xl mt-1">{empDetails?.name || "Employee"} </span></p>
        <p className="text-gray-400 text-sm mt-1"> Here's what's happening with your account today. </p>
       </div>

        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

          <div className="flex gap-5 bg-[#232f20] border border-[#1f3626] rounded-lg p-5 hover:-translate-y-1 duration-300 hover:border-[#a8d96c] hover:shadow-[0_0_35px_rgba(168,217,108,0.2)]">
            <div className="bg-lime-400/10 p-2 rounded text-center">
              <FactCheckRounded className="text-lime-500" style={{fontSize : 40}}/>
            </div>
            <div>
              <p className="text-3xl font-bold text-white"> {loading ? "-" : `${attendancePercent}%`} </p>
              <p className="text-lime-500 text-md uppercase tracking-wider mt-1"> Attendance </p>
            </div>
          </div>

          <div className="flex gap-5 bg-[#232f20] border border-[#1f3626] rounded-lg p-5 hover:-translate-y-1 duration-300 hover:border-[#a8d96c] hover:shadow-[0_0_35px_rgba(168,217,108,0.12)]">
            <div className="bg-lime-400/10 p-2 rounded text-center">
              <EventAvailableRounded className="text-lime-500" style={{fontSize : 40}}/>
            </div>
            <div>
            <p className="text-3xl font-bold text-white"> {loading ? "-" : leaves.length} </p>
            <p className="text-lime-500 text-md uppercase tracking-wider mt-1"> Leaves </p>
            </div>     
          </div>

          <div className="flex gap-5 bg-[#232f20] border border-[#1f3626] rounded-lg p-5 hover:-translate-y-1 duration-300 hover:border-[#a8d96c] hover:shadow-[0_0_35px_rgba(168,217,108,0.12)]">
            <div className="bg-lime-400/10 p-2 rounded text-center">
              <PendingActionsRounded className="text-lime-500" style={{fontSize : 40}}/>
            </div>
            <div>
            <p className="text-3xl font-bold text-white"> {loading ? "-" : pendingLeaves} </p>
            <p className="text-lime-500 text-md uppercase tracking-wider mt-1"> Pending </p>
            </div>
          </div>

          <div className="flex gap-5 bg-[#232f20] border border-[#1f3626] rounded-lg p-5 hover:-translate-y-1 duration-300 hover:border-[#a8d96c] hover:shadow-[0_0_35px_rgba(168,217,108,0.12)]">
            <div className="bg-lime-400/10 p-2 rounded text-center">
              <Inventory2Rounded className="text-lime-500" style={{fontSize : 40}}/>
            </div>
            <div>            <p className="text-3xl font-bold text-white"> {loading ? "-" : remainingLeaveDays} </p>
            <p className="text-lime-500 text-md uppercase tracking-wider mt-1"> Leave Balance </p>
            </div>

          </div>

        </div>

  <h2 className="text-3xl mt-7 mb-3"> Attendance & Leaves </h2>
        
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <div className="bg-[#232f20] border border-[#1f3626] rounded-lg p-5">
      <h2 className="text-lime-500 text-2xl mb-4 border-b pb-2"> Today's Status </h2>
      {todayRecord ? (
      <div className="space-y-2 text-md">
        <div className="flex justify-between">
          <span className="text-gray-200"> Status </span>
          <span className={`px-3 py-1 rounded-full text-white ${
            todayRecord.status === "Present"
              ? "bg-green-500"
              : todayRecord.status === "Absent"
              ? "bg-red-500"
              : todayRecord.status === "Late"
              ? "bg-yellow-500"
              : todayRecord.status === "Half Day"
              ? "bg-blue-500"
              : "bg-indigo-500"
            }`}>
            {todayRecord.status || "Updated at checkout"}
          </span>
     </div>
     <div className="flex justify-between ">
       <span className="text-gray-200"> Clock In </span>
       <span className="text-white"> {formatTime(todayRecord.clockIn) || "-"} </span>
       </div>
       <div className="flex justify-between">
         <span className="text-gray-200"> Clock Out </span>
         <span className="text-white"> {formatTime(todayRecord.checkOut) || "-"} </span>
       </div>
           </div>
         ) : (
           <p className="text-gray-300 text-md"> No attendance marked for today yet. </p>
         )}
       </div>
       <div className="bg-[#232f20] border border-[#1f3626] rounded-lg p-5">
         <h2 className="text-lime-500 text-2xl mb-4 border-b pb-2"> Leave Balance </h2>
      <div className="space-y-2 text-md">
           <div className="flex justify-between">
             <span className="text-gray-300"> Total Allotted </span>
             <span className="text-white"> {TOTAL_LEAVE_ALLOWANCE} days </span>
           </div>
           <div className="flex justify-between">
             <span className="text-gray-300"> Used </span>
             <span className="text-white"> {usedLeaveDays} days </span>
           </div>
           <div className="flex justify-between">
             <span className="text-gray-300"> Remaining </span>
             <span className="text-white"> {remainingLeaveDays} days </span>
           </div>
         </div>
       </div>
   </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          <div className="bg-[#232f20] border border-[#1f3626] rounded-lg p-5">
            <h2 className="text-lime-500 text-2xl mb-4 border-b pb-2"> Recent Leaves </h2>

            {recentLeaves.length === 0 ? (
              <p className="text-gray-300 text-sm"> No leave requests found. </p>
            ) : (
              <div className="space-y-3">
                {recentLeaves.map((leave) => (
                  <div key={leave._id} className="flex justify-between items-center text-sm pt-3 first:border-t-0 ">
                    <div>
                      <p className="text-white"> {leave.leaveType} </p>
                      <p className="text-gray-500 text-xs"> {formatDate(leave.fromDate)} - {formatDate(leave.toDate)} </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border
                      ${ leave.status === "Pending" ? "text-yellow-400"
                          : leave.status === "Approved" ? "text-lime-400"
                          : "text-red-400" }`}>
                       {leave.status}
                      </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-[#232f20] border border-[#1f3626] rounded-lg p-5">
            <h2 className="text-lime-500 text-2xl mb-4 border-b pb-2"> Upcoming Holidays </h2>
            <div className="space-y-3">
              {UPCOMING_HOLIDAYS.map((holiday) => (
                <div key={holiday.name} className="flex justify-between items-center text-md">
                  <span className="text-gray-300"> {holiday.name} </span>
                  <span className="text-gray-200 text-md"> {formatDate(holiday.date)} </span>
                </div>
              ))}
            </div>
          </div>

        </div>

    <h2 className="text-3xl mt-7 mb-3"> Attendance & Leaves </h2>
        <div className="bg-[#232f20] border border-[#1f3626] rounded-lg p-5 mb-8">
          <h2 className="text-lime-500  text-2xl mb-4"> Company Announcements </h2>
          <div className="space-y-4">
            {ANNOUNCEMENTS.map((note) => (
              <div key={note.title} className="border-t border-gray-500 pt-4 first:border-t-0 first:pt-0">
                <div className="flex justify-between items-baseline">
                  <p className="text-white font-semibold"> {note.title} </p>
                  <p className="text-gray-500 text-xs"> {formatDate(note.date)} </p>
                </div>
                <p className="text-gray-400 text-sm mt-1"> {note.message} </p>
              </div>
            ))}
          </div>
        </div>


        <div className="bg-[#232f20] border border-[#1f3626] rounded-lg p-5">
          <h2 className="text-lime-500 text-2xl mb-4"> Quick Actions </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <button onClick={() => navigate("/emp/apply-leave")}
              className="rounded-lg text-xl border border-[#3a5035] py-3 px-4 hover:border-green-500 hover:bg-[#2b3728] transition-all duration-300">
              Apply Leave
            </button>

            <button onClick={() => navigate("/emp/attendance")}
              className="rounded-lg text-xl  bg-[#232f20] border border-[#3a5035] py-3 px-4 hover:border-green-500 hover:bg-[#2b3728] transition-all duration-30">
                Attendance
            </button>

            <button onClick={() => navigate("/profile")}
              className="rounded-lg text-xl bg-[#232f20] border border-[#3a5035] py-3 px-4 hover:border-green-500 hover:bg-[#2b3728] transition-all duration-300">
              Edit Profile
            </button>

          </div>
        </div>
      </div>

      <div
        onClick={() => setOpenSidebar(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ease-in-out ${
          openSidebar ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div className={`fixed top-0 left-0 h-full w-72 bg-[#232f20] border-r border-[#3a5035] p-6 z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
       openSidebar ? 'translate-x-0' : '-translate-x-full' }`}>

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-[#a8d96c]"> Menu </h2>
          <button onClick={() => setOpenSidebar(false)}>
            <CloseIcon className="text-white"/>
          </button>
        </div>

  <div className="mt-8">
   <div className="w-16 h-16 rounded-full bg-[#171f11] flex items-center justify-center text-[#a8d96c] text-2xl font-bold">
    {empDetails?.name?.[0]?.toUpperCase()}
    </div>
     <h2 className="mt-3 text-xl text-white"> {empDetails?.name || "Employee"} </h2>
     <p className="text-sm text-gray-800"> Employee </p>
   </div> 
   <div className="mt-10 space-y-2 overflow-y-auto flex-1">
    <button onClick={() => setOpenSidebar(false)} className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]">
     Dashboard  </button>
    <button onClick={() => {
      setOpenSidebar(false);
      navigate("/profile");  }}
      className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]">
       My Profile </button>
      <button onClick={() => {
        setOpenSidebar(false);
        navigate("/emp/apply-leave");
        }}
        className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]">
        Apply Leave
      </button>

      <button onClick={() => {
        setOpenSidebar(false);
        navigate("/emp/my-leaves");
        }}
        className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]">
         My Leaves </button>

      <button onClick={() => {
        setOpenSidebar(false);
        navigate("/emp/attendance");
        }}
        className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]">
        Attendance </button>

      {/* <button onClick={() => {
        setOpenSidebar(false);
        navigate("/emp/calender");
        }}
        className="w-full text-left px-4 py-3 rounded-md hover:bg-[#3a5035]">
        Attendance Calendar </button> */}

    </div>

      <button onClick={handleLogout}
        className="mt-4 bg-red-500 rounded-md py-3 font-semibold">
        Logout  </button>

      </div>
    </div>
  );
};

export default MainEmpDas;