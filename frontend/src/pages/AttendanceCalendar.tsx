import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { attendanceHistory } from "../services/attendanceServices";

type Attendance = {
  _id: string;
  date: string;
  clockIn: string;
  clockOut?: string;
  status: "Present" | "Absent" | "Late" | "On Leave";
};

const AttendanceCalendar = () => {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const data = await attendanceHistory();
      setAttendance(data.attendance ?? []);
    } 
    catch (error) {
      console.log(error);
      toast.error("Unable to load attendance history");
    } finally {
      setLoading(false);
    }
  };

  const attendanceMap = useMemo(() => {
    const map: Record<string, Attendance> = {};

    attendance.forEach((item) => {
      map[item.date] = item;
    });

    return map;
  }, [attendance]);

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl">
        Loading Calendar...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">

      <div className="flex justify-between items-center mb-8">

        <button
          onClick={() =>
            setCurrentDate(new Date(year, month - 1, 1))
          }
          className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
        >
          ◀ Prev
        </button>

        <h1 className="text-3xl font-bold">
          {currentDate.toLocaleString("default", {
            month: "long",
          })}{" "}
          {year}
        </h1>

        <button
          onClick={() =>
            setCurrentDate(new Date(year, month + 1, 1))
          }
          className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
        >
          Next ▶
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-3 text-center font-semibold">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">

        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={index}></div>
        ))}

        {Array.from({ length: totalDays }).map((_, index) => {
          const day = index + 1;

          const date = `${year}-${String(month + 1).padStart(
            2,
            "0"
          )}-${String(day).padStart(2, "0")}`;

          const record = attendanceMap[date];

          let color = "bg-gray-700";

          if (record?.status === "Present") color = "bg-green-600";

          if (record?.status === "Late") color = "bg-yellow-500";

          if (record?.status === "Absent") color = "bg-red-600";

          if (record?.status === "On Leave") color = "bg-blue-600";

          const today = new Date();

          const isToday =
            today.getDate() === day &&
            today.getMonth() === month &&
            today.getFullYear() === year;

          return (
            <div
              key={day}
              className={`${color} rounded-lg h-16 flex items-center justify-center cursor-pointer hover:scale-105 transition ${
                isToday ? "ring-4 ring-white" : ""
              }`}
              title={
                record
                  ? `Status : ${record.status}
Clock In : ${new Date(record.clockIn).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
Clock Out : ${
                      record.clockOut
                        ? new Date(record.clockOut).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "-"
                    }`
                  : "No Attendance"
              }
            >
              <span className="font-semibold">{day}</span>
            </div>
          );
        })}
      </div>

      <div className="flex gap-6 mt-8 flex-wrap">

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-600 rounded"></div>
          Present
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-600 rounded"></div>
          Absent
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          Late
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-600 rounded"></div>
          On Leave
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-700 rounded"></div>
          No Record
        </div>

      </div>

    </div>
  );
};

export default AttendanceCalendar;