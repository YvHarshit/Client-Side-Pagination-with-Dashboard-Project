import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";
import type {Leave} from "../types/user.types"

// interface Leave {
//   _id: string;
//   employeeId: string;
//   leaveType: string;
//   reason: string;
//   fromDate: string;
//   toDate: string;
//   totalDays: number;
//   status: string;
//   adminRemark?: string;
//   createdAt: string;
// }

const AdminLeave = () => {
  const { backendUrl } = useAppContext();

  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/auth/admin/get/leave`,
        { withCredentials: true, }
      );

      setLeaves(data.leaves);
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

  const updateStatus = async (leaveId: string, status: "Approved" | "Rejected" ) => {
    try {
      await axios.patch( `${backendUrl}/auth/admin/update/leave/${leaveId}`, {
          status, 
          adminRemark:  status === "Approved"
              ? "Approved by Admin"
              : "Rejected by Admin",
        },
        {
          withCredentials: true,
        }
      );
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
      <div className="text-center mt-10 text-lg">
        Loading...
      </div>
    );
  }

  const formatDate = (date: string) => new Date(date).toLocaleDateString("en-IN");

  return (
    <div className="bg-gray-800 min-h-screen flex justify-center items-center">
    <div className="max-w-6xl mx-auto px-10 py-8 bg-gray-900">
      <h1 className="text-3xl font-bold mb-8">  Leave Requests </h1>

      { 
        leaves.length === 0 
          && (
            <p> No Leave Requests Found. </p> )}

      <div className="space-y-5">
        {leaves.map((leave) => (
          <div key={leave._id}
            className="bg-[#232f20] border border-[#3a5035] rounded-lg p-5" >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p> <strong>Employee ID :</strong>{" "} {leave.employeeId} </p>
                <p> <strong>Leave Type :</strong>{" "} {leave.leaveType} </p>
                <p> <strong>Reason :</strong>{" "} {leave.reason} </p>
              </div>

              <div>
                <p> <strong>From :</strong>{" "} {formatDate(leave.fromDate)} </p>
                <p> <strong>To :</strong>{" "} {formatDate(leave.toDate)} </p>
                <p> <strong>Total Days :</strong>{" "}  {leave.totalDays} </p>
              </div>
            </div>

            <div className="mt-4">

              <span className={`px-3 py-1 rounded-full text-sm
                ${
                  leave.status === "Pending"
                    ? "bg-yellow-600"
                    : leave.status === "Approved"
                    ? "bg-green-600"
                    : "bg-red-600"
                }`} >
                {leave.status}
              </span>

            </div>

            {leave.status === "Pending" 
              && (
              <div className="flex gap-4 mt-5">

                <button onClick={() => updateStatus(leave._id, "Approved")}
                  className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded">
                  Approve
                </button>

                <button onClick={() => updateStatus(leave._id, "Rejected")}
                  className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded">
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