import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ArrowBack, FactCheck } from "@mui/icons-material";
import { useAppContext } from "../../context/AppContext";
import type {Attendance} from "../../types/user.types"
import { checkIn, checkOut, getAttendanceHistory } from "../../services/attendanceServices";


const EmpAttendance = () => {
  const navigate = useNavigate() ;
  const { backendUrl } = useAppContext() ;

  const [todayAttendance, setTodayAttendance] = useState<Attendance | null>(null);
  const [history, setHistory] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendance();
  }, []);

 const fetchAttendance = async () => {
  try {
    const data = await getAttendanceHistory(backendUrl);

    if (Array.isArray(data.attendance)) {
      setHistory(data.attendance);
      const today = new Date().toISOString().split("T")[0];

      const todayRecord = data.attendance.find((item: Attendance) => item.date === today );
      setTodayAttendance(todayRecord ?? null);
      } 
    else {
      setHistory([]);
      setTodayAttendance(null);
      toast.error("Attendance data is not an array.");
      }
    } catch (error) {
       console.log(error);
        toast.error("Unable to load attendance");
     } 
     finally {
    setLoading(false);
  }
};

  const handleCheckIn = async () => {
    try {
      const data = await checkIn(backendUrl);
      toast(data.message);
      fetchAttendance();
    } 
    catch (error) {
      console.log(error);
      if (axios.isAxiosError(error))
        toast.error(error.response?.data?.message);
      else toast.error("Something went wrong");
    }
  };

  const handleCheckOut = async () => {
    try {
      const data = await checkOut(backendUrl);
      toast.success(data.message);
      fetchAttendance();
    } 
    catch (error) {
      console.log(error);
      if (axios.isAxiosError(error))
        toast.error(error.response?.data?.message);
      else toast.error("Something went wrong");
    }
  };

  if (loading) {
    return ( <div className="text-center mt-20 text-xl">  Loading Attendance... </div>
    );
  }

  const calculateWorkHours = (checkIn: string, checkOut?: string): string => {
    if (!checkIn || !checkOut) return "-";

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return "-";
    }

    const diffMs = end.getTime() - start.getTime();
    const totalMinutes = Math.floor(diffMs / (1000 * 60));

    if (totalMinutes <= 0) {
      return "-";
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 font-serif">

      <button onClick={() => navigate(-1)}
       className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 text-white transition">
        <ArrowBack />
        <span className="font-semibold">Back to Dashboard</span>
     </button>


    <h1 className="mb-8 flex items-center gap-3 text-4xl font-semibold text-white">
      <FactCheck fontSize="large" className="text-lime-500" /> Attendance </h1>

      <div className="bg-[#232f20] rounded-lg border border-[#3a5035] p-8">
        <h2 className="text-2xl mb-6"> Today's Attendance  </h2>

        <div className="mb-8 flex gap-8">
          <div>
           <p className="text-gray-400">  Status </p>
           <p className="text-2xl font-bold text-lime-300"> {todayAttendance?.status ?? "Not Checked In"} </p>
          </div>
        <div>
          <p className="text-gray-400"> Check In </p>
          <p className="text-xl"> 
            {todayAttendance?.clockIn ? new Date(todayAttendance.clockIn).toLocaleTimeString()  : "--"} </p>
        </div>
      </div>


   {todayAttendance?.checkOut 
   ? (
    <div className="text-lime-400 text-xl font-semibold"> Today's Shift Completed </div>
     ) 
    : (
      !todayAttendance || todayAttendance.status === "Absent" ? (
        <button onClick={handleCheckIn} className="bg-green-500 px-6 py-2 rounded">
         Check In
        </button>
     ) : (
        <button onClick={handleCheckOut} className="bg-yellow-500 px-6 py-2 rounded">
          Check Out
        </button>
     )
    )}
      </div>

      <div className="mt-10 bg-[#232f20] rounded-lg border border-[#3a5035] overflow-hidden">

        <div className="p-5 border-b border-[#3a5035]">
          <h2 className="text-2xl">  Attendance History  </h2>
        </div>

        <table className="w-full">
          <thead className="bg-[#1d2919] text-lime-300 uppercase text-sm tracking-wider">
            <tr> 
              <th className="py-4">Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Total Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 
              ? (
             <td colSpan={5} className="py-16 text-center">

            <div className="flex flex-col items-center">            
            <div className="mb-3 text-6xl">📅</div>
            
            <h3 className="text-xl font-semibold text-white">
            No Attendance Yet
            </h3>
            
            <p className="mt-2 text-gray-400">
            Start by checking in today.
            </p>
            
            </div>
            
            </td>)
              : ( history.map((item) => (
              <tr key={item._id}  className="border-t border-[#3a5035] hover:bg-[#171f11]">

                <td className="py-4 text-center"> 
                  {item.date}
                </td>

                <td className="text-center"> 
                  { item.clockIn ? new Date(item.clockIn).toLocaleTimeString() : "-" }
                </td>

                <td className="text-center">
                  {item.checkOut ? new Date(item.checkOut).toLocaleTimeString() : "-"}
                </td>

                <td className="text-center">
                  {calculateWorkHours(item.clockIn, item.checkOut)}
                </td>

                <td className="text-center">
                  {(item.status)}
                </td>

              </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmpAttendance;