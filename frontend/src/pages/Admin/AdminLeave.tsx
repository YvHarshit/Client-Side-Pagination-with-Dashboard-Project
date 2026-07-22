import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/AppContext";
import {EventNoteOutlined, PendingActionsOutlined, CancelOutlined } from "@mui/icons-material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import type { Leave } from "../../types/user.types";
import { leaveToAdmin, updateLeaveStatus } from "../../services/leaveServices";
import AdminNavbar from "./AdminNavbar";



const AdminLeave = () => {
  const { backendUrl } = useAppContext();
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    try {
      const response = await leaveToAdmin(backendUrl)
      setLeaves(response.leaves);
    }
    catch (error) {
      console.log(error);
      toast.error("Failed to load leave requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const updateStatus = async (leaveId: string, status: "Approved" | "Rejected") => {
  try {
      await updateLeaveStatus(backendUrl, leaveId, status);
      toast.success(`Leave ${status}`);
      fetchLeaves();
    } 
    catch (error) {
      console.log(error);
      toast.error("Failed to update leave");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0F0A] flex justify-center items-center text-gray-300 font-serif text-lg">
        Loading...
      </div>
    );
  }

  const formatDate = (date: string) => new Date(date).toLocaleDateString("en-IN");

  const totalRequests = leaves.length;
  const pendingCount = leaves.filter((l) => l.status === "Pending").length;
  const approvedCount = leaves.filter((l) => l.status === "Approved").length;
  const rejectedCount = leaves.filter((l) => l.status === "Rejected").length;

  return (
   <div>
    <div className="sticky top-0 z-40">   <AdminNavbar/>    </div>
    
    <div className="bg-[#171f11] mx-9 px-10 py-10 font-serif">


      <h1 className="text-3xl font-bold text-white mb-1">  Leave Requests </h1>
      <p className="text-sm text-gray-400 mb-8"> Review and manage employee leave applications </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">

        <div className="bg-[#101F14] border border-[#1f3626] rounded-lg p-5 flex items-start gap-3 transition-all duration-300 hover:border-green-500 hover:shadow-lg hover:shadow-green-900/20">
          <div className="p-2 rounded-md bg-[#86EFAC]/20 text-[#86EFAC] shrink-0">
            <EventNoteOutlined fontSize="large" />
          </div>
          <div>
            <p className="text-4xl font-serif font-bold text-white"> {totalRequests} </p>
            <p className="text-lime-400 text-sm uppercase tracking-wider mt-1"> Total Requests </p>
          </div>
        </div>

        <div className="bg-[#101F14] border border-[#1f3626] rounded-lg p-5 flex items-start gap-3 transition-all duration-300 hover:border-green-500 hover:shadow-lg hover:shadow-green-900/20">
          <div className="p-2 rounded-md bg-yellow-400/20 text-yellow-400 shrink-0">
            <PendingActionsOutlined fontSize="large" />
          </div>
          <div>
            <p className="text-4xl font-serif font-bold text-white"> {pendingCount} </p>
            <p className="text-lime-400 text-sm uppercase tracking-wider mt-1"> Pending </p>
          </div>
        </div>

        <div className="bg-[#101F14] border border-[#1f3626] rounded-lg p-5 flex items-start gap-3 transition-all duration-300 hover:border-green-500 hover:shadow-lg hover:shadow-green-900/20">
          <div className="p-2 rounded-md bg-green-400/20 text-green-400 shrink-0">
            <TaskAltIcon fontSize = "large"  />
          </div>
          <div>
            <p className="text-4xl font-serif font-bold text-white"> {approvedCount} </p>
            <p className="text-lime-400 text-sm uppercase tracking-wider mt-1"> Approved </p>
          </div>
        </div>

        <div className="bg-[#101F14] border border-[#1f3626] rounded-lg p-5 flex items-start gap-3 transition-all duration-300 hover:border-green-500 hover:shadow-lg hover:shadow-green-900/20">
          <div className="p-2 rounded-md bg-red-400/30 text-red-400 shrink-0">
            <CancelOutlined fontSize="large" />
          </div>
          <div>
            <p className="text-4xl font-serif font-bold text-white"> {rejectedCount} </p>
            <p className="text-lime-400 text-sm uppercase tracking-wider mt-1"> Rejected </p>
          </div>
        </div>

      </div>

      { 
        leaves.length === 0 
          && (
            <p className="text-center text-gray-500 bg-[#101F14] border border-[#1f3626] rounded-lg py-10 ">
              No Leave Requests Found.
            </p> )}

      <div className="space-y-5">
        {leaves.map((leave) => (
          <div key={leave._id}
            className="bg-[#232f20] border border-[#3a5035] rounded-lg p-5 transition-all duration-300 hover:border-green-500 hover:shadow-lg hover:shadow-green-900/20 " >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p> <strong className="text-white">Employee ID :</strong>{" "} {leave.employeeId} </p>
                <p> <strong className="text-white">Leave Type :</strong>{" "} {leave.leaveType} </p>
                <p> <strong className="text-white">Reason :</strong>{" "} {leave.reason} </p>
              </div>

              <div>
                <p> <strong className="text-white">From :</strong>{" "} {formatDate(leave.fromDate)} </p>
                <p> <strong className="text-white">To :</strong>{" "} {formatDate(leave.toDate)} </p>
                <p> <strong className="text-white">Total Days :</strong>{" "}  {leave.totalDays} </p>
              </div>
            </div>

            <div className="mt-4">

              <span className={`px-5 py-2 rounded-full text-sm font-semibold border
                ${
                  leave.status === "Pending"
                    ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                    : leave.status === "Approved"
                    ? "bg-green-500/10 text-green-400 border-green-500/30"
                    : "bg-red-500/10 text-red-400 border-red-500/30"
                }`} >
                {leave.status}
              </span>

            </div>

            {leave.status === "Pending" 
              && (
              <div className="flex gap-4 mt-5">

                <button onClick={() => updateStatus(leave._id, "Approved")}
                  className="bg-green-600 hover:bg-green-700 transition-colors px-5 py-2 rounded font-semibold">
                  Approve
                </button>

                <button onClick={() => updateStatus(leave._id, "Rejected")}
                  className="bg-red-600 hover:bg-red-700 transition-colors px-5 py-2 rounded font-semibold">
                  Reject
                </button>

              </div>
            )}
          </div>
        ))}
      </div>
    </div>
   </div> 
  
  );
};

export default AdminLeave;