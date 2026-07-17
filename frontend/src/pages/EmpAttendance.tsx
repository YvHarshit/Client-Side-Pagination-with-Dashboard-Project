import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

type Attendance = {
  _id: string;
  date: string;
  clockIn: string;
  checkOut?: string;
  totalHours?: string;
  status: string;
};

const Attendance = () => {
    const navigate = useNavigate() ;
  const { backendUrl } = useAppContext();

  const [todayAttendance, setTodayAttendance] = useState<Attendance | null>(null);
  const [history, setHistory] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendance();
  }, []);

 const fetchAttendance = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/emp/attendace/history`,
      {
        withCredentials: true,
      }
    );

    console.log("API Response:", data);
    console.log("attendance:", data.attendance);
    console.log("Is Array:", Array.isArray(data.attendance));

    if (Array.isArray(data.attendance)) {
      setHistory(data.attendance);

      const today = new Date().toISOString().split("T")[0];

      const todayRecord = data.attendance.find(
        (item: Attendance) => item.date === today
      );

      setTodayAttendance(todayRecord ?? null);
    } else {
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
       const now = new Date();

      const { data } = await axios.post(`http://localhost:3000/api/emp/checkin`, 
        {
            date: now.toISOString().split("T")[0], 
            clockIn: now.toISOString(),           
            status: "Present",
        }, 
        { withCredentials: true });

      toast(data.message);
      fetchAttendance();
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error))
        toast.error(error.response?.data?.message);

      else toast.error("Something went wrong");
    }
  };

  const handleCheckOut = async () => {
    try {
        const now = new Date();

      const { data } = await axios.patch(`http://localhost:3000/api/emp/checkout`,  
        {
            date: now.toISOString().split("T")[0], 
            checkOut: now.toISOString(),           
        }, 
        { withCredentials: true });

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
    return (
      <div className="text-center mt-20 text-lg">
        Loading Attendance...
      </div>
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
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-semibold mb-8">  Attendance  </h1>
      <div className="bg-[#232f20] rounded-lg border border-[#3a5035] p-8">
        <h2 className="text-2xl mb-6"> Today's Attendance  </h2>


        {!todayAttendance
         ? (
          <button  onClick={handleCheckIn}
            className="bg-lime-600 hover:bg-lime-500 text-black font-semibold px-8 py-3 rounded-md transition" >
            Check In
          </button>

        ) : !todayAttendance.checkOut ? (

          <button onClick={handleCheckOut}
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded-md transition">
            Check Out
          </button>

        ) : (

          <div className="text-lime-400 text-xl font-semibold">
            Today's Shift Completed 
          

          
           <button className="float-right cursor-pointer rounded-lg bg-red-800 py-2 px-6 hover:bg-red-700 transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500"
             onClick={() => navigate("/emp/calender")} > Attendance </button>
          </div>
        )}

      </div>

      <div className="mt-10 bg-[#232f20] rounded-lg border border-[#3a5035] overflow-hidden">

        <div className="p-5 border-b border-[#3a5035]">
          <h2 className="text-2xl">  Attendance History  </h2>
        </div>

        <table className="w-full">
          <thead className="bg-[#171f11]">
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
              <tr>
                <td colSpan={5} className="text-center py-10">
                  No Attendance Found
                </td>
              </tr>)
              : ( history.map((item) => (
                <tr key={item._id}  className="border-t border-[#3a5035] hover:bg-[#171f11]">

                  <td className="py-4 text-center"> 
                    {item.date}
                  </td>

                  <td className="text-center">
                    {new Date(item.clockIn).toLocaleTimeString()}
                  </td>

                  <td className="text-center">
                    {item.checkOut ? new Date(item.checkOut).toLocaleTimeString() : "-"}
                  </td>

                  <td className="text-center">
                    {calculateWorkHours(item.clockIn, item.checkOut)}
                  </td>

                  <td
                    className={`text-center font-semibold ${item.status === "Present"  ? "text-lime-400" : "text-red-400"}`}>
                    {item.status}
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

export default Attendance;