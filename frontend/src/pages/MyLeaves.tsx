import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getMyLeaves } from "../services/leaveServices";
import type { Leave } from "../types/user.types";
import { Description, EventNote, PendingActions, CheckCircle, Cancel, ArrowBack, } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const MyLeaves = () => {
  const navigate = useNavigate()
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await getMyLeaves();
      setLeaves(response.leaves);
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch leave requests");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-white text-xl">
        Loading...
      </div>
    );
  }

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN");

  const pendingLeaves = leaves.filter(
    (leave) => leave.status === "Pending"
  ).length;

  const approvedLeaves = leaves.filter(
    (leave) => leave.status === "Approved"
  ).length;

  const rejectedLeaves = leaves.filter(
    (leave) => leave.status === "Rejected"
  ).length;

return (
    <div className="max-w-[1300px] mx-auto py-10 px-6 font-serif">

      <button onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-[#a8d96c] hover:text-white transition mb-8">
      <ArrowBack />  Back to Dashboard </button>


      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-4xl font-bold text-white">
            <EventNote fontSize="large" className="text-lime-400" /> My Leave Requests </h1>      
          <p className="mt-2 text-[#9fb396]"> View your leave history and track approvals.  </p>
        </div>
      </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

  <div className="rounded-2xl bg-[#263423] p-6 transition-all duration-300 hover:-translate-y-1">
   <div className="flex items-center justify-between">
    <div>
      <p className="text-4xl font-bold text-lime-400">  {leaves.length}  </p>
      <p className="mt-2 text-[#8fb287] text-sm font-medium"> Total Requests </p>
    </div>
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-lime-500/20">
      <Description className="text-lime-400" fontSize="large" />
    </div>
   </div>
  </div>


  <div className="rounded-2xl bg-[#263423] p-6 transition-all duration-300 hover:-translate-y-1">
   <div className="flex items-center justify-between">
    <div>
      <p className="text-4xl font-bold text-yellow-400"> {pendingLeaves} </p>
      <p className="mt-2 text-[#8fb287] text-sm font-medium"> Pending </p>
    </div>
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-500/20">
      <PendingActions className="text-yellow-400" fontSize="large" />
    </div>
   </div>
  </div>


  <div className="rounded-2xl bg-[#263423] p-6 transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-center justify-between">
    <div>
      <p className="text-4xl font-bold text-green-400"> {approvedLeaves} </p>
      <p className="mt-2 text-[#8fb287] text-sm font-medium">  Approved  </p>
    </div>
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20">
      <CheckCircle className="text-green-400" fontSize="large" />
    </div>
    </div>
  </div>

  <div className="rounded-2xl bg-[#263423] p-6 transition-all duration-300 hover:-translate-y-1">
   <div className="flex items-center justify-between">
    <div>
      <p className="text-4xl font-bold text-red-400"> {rejectedLeaves} </p>
      <p className="mt-2 text-[#8fb287] text-sm font-medium"> Rejected </p>
    </div>
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/20">
      <Cancel className="text-red-400" fontSize="large" />
    </div>
   </div>
  </div>
 </div>


  <div className="bg-[#232f20] border border-[#3a5035] rounded-xl overflow-hidden shadow-lg">

    <div className="px-6 py-4 border-b border-[#3a5035]">
    <h2 className="text-2xl font-semibold"> Leave History </h2>
    </div>

  <div className="overflow-x-auto">
  <table className="w-full table-auto">
    <thead className="bg-[#171f11]">
      <tr className="border-b border-[#3a5035]">
        <th className="py-4 px-4 text-center"> Leave Type  </th>
        <th className="px-4 text-center"> Reason </th>
        <th className="px-4 text-center"> From </th>
        <th className="px-4 text-center"> To </th>
        <th className="px-4 text-center"> Requested On </th>
        <th className="px-4 text-center">  Status  </th>
        <th className="px-4 text-center"> Admin Remark </th>
      </tr>
    </thead>

    <tbody>
    {leaves.length === 0
       ? (
        <tr>
          <td colSpan={7} className="py-16 text-center">
            <div>
              <p className="text-5xl mb-4"> - </p>
              <p className="text-2xl text-lime-400">  No Leave Requests Found  </p>
              <p className="text-[#7a9970] mt-2"> Apply for your first leave request. </p> 
            </div>
          </td>
        </tr>
      ) : (
        leaves.map((leave) => (
         <tr key={leave._id} className="border-b border-[#3a5035] hover:bg-[#171f11] transition-all">
          <td className="text-center py-5 px-3">
              {leave.leaveType}
          </td>
            <td className="text-center px-4 break-words max-w-xs"> {leave.reason} </td>
            <td className="text-center"> {formatDate(leave.fromDate)} </td>
            <td className="text-center"> {formatDate(leave.toDate)} </td>
            <td className="text-center"> {formatDate(leave.createdAt)} </td>
            <td className="text-center">
              <span className={`inline-block min-w-[95px] rounded-full px-4 py-2 text-sm font-semibold                          
                ${leave.status === "Approved"
                    ? "bg-green-700 text-green-100"
                    : leave.status === "Rejected"
                    ? "bg-red-700 text-red-100"
                    : "bg-yellow-500 text-black"
                }`}>
                {leave.status} </span>  </td>
            <td className="text-center px-4">
              { 
              leave.adminRemark 
               ? (<span className="text-lime-300"> {leave.adminRemark} </span> )
               : (<span className="text-gray-400"> - </span>) 
              }
              </td>
            </tr>
          ))
        )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyLeaves;