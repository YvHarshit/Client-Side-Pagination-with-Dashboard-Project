import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getMyLeaves } from "../services/leaveServices";
import type { Leave } from "../types/user.types";

const MyLeaves = () => {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    <div className="max-w-[1300px] mx-auto py-10 px-6">
      <h1 className="text-4xl font-semibold mb-8"> My Leave Requests </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        <div className="bg-[#232f20] border border-[#3a5035] rounded-lg p-5">
          <p className="text-3xl font-semibold text-lime-400"> {leaves.length} </p>
          <p className="text-[#7a9970] mt-2"> Total Requests </p>
        </div>

        <div className="bg-[#232f20] border border-[#3a5035] rounded-lg p-5">
          <p className="text-3xl font-semibold text-yellow-400"> {pendingLeaves} </p>
          <p className="text-[#7a9970] mt-2"> Pending </p>
        </div>

        <div className="bg-[#232f20] border border-[#3a5035] rounded-lg p-5">
          <p className="text-3xl font-semibold text-green-400"> {approvedLeaves} </p>
          <p className="text-[#7a9970] mt-2"> Approved </p>
        </div>

        <div className="bg-[#232f20] border border-[#3a5035] rounded-lg p-5">
          <p className="text-3xl font-semibold text-red-400"> {rejectedLeaves} </p>
          <p className="text-[#7a9970] mt-2"> Rejected </p>
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

                    <td className="text-center px-4 break-words max-w-xs">
                      {leave.reason}
                    </td>

                    <td className="text-center">
                      {formatDate(leave.fromDate)}
                    </td>

                    <td className="text-center">
                      {formatDate(leave.toDate)}
                    </td>

                    <td className="text-center">
                      {formatDate(leave.createdAt)}
                    </td>

                    <td className="text-center">
                      <span className={`inline-block min-w-[95px] rounded-full px-4 py-2 text-sm font-semibold                          
                        ${leave.status === "Approved"
                            ? "bg-green-700 text-green-100"
                            : leave.status === "Rejected"
                            ? "bg-red-700 text-red-100"
                            : "bg-yellow-500 text-black"
                        }`}>
                        {leave.status} </span>
                    </td>

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