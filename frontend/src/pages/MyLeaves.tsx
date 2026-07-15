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
        }
        catch (error) {
            console.log(error);
            toast.error("Unable to fetch leave requests");
        }
        finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (
            <div className="text-center mt-20 text-white">
                Loading...
            </div>
        );
    }

    const formatDate = (date: string) => new Date(date).toLocaleDateString("en-IN");

    return (

        <div className="min-h-screen bg-[#1d201c] text-white p-10">
            <h1 className="text-3xl font-bold text-lime-400 mb-8">  My Leave Requests   </h1>

            <div className="rounded-lg border border-[#41533a] overflow-hidden bg-[#1d241b]">
                <table className="w-full table-fixed">

                    <thead>
                      <tr className="bg-[#263322] border-b border-[#41533a]">
                        <th className="w-[18%] py-4 text-center">Leave Type</th>
                        <th className="w-[40%] py-4 text-center">Reason</th>
                        <th className="w-[12%] py-4 text-center">From</th>
                        <th className="w-[12%] py-4 text-center">To</th>
                        <th className="w-[15%] py-4 text-center">Requested On</th>
                        <th className="w-[16%] py-4 text-center">Status</th>
                        <th className="w-[18%] py-4 text-center">Admin Remark</th>
                      </tr>
                    </thead>
                    <tbody>
                        {((!leaves || leaves.length === 0)) ? 
                        (
                            <tr>
                                <td colSpan={5} className="text-center p-8 text-red-400"> No Leave Requests Found </td>
                            </tr>
                        ) 
                        : (
                            leaves.map((leave) => (
                                
                                <tr key={leave._id} className="border-b border-[#3f5038] hover:bg-[#283322]">
                                    <td className="py-4 text-center"> {leave.leaveType} </td>
                                    <td className="px-4 py-4 text-center break-words"> {leave.reason} </td>
                                    <td className="py-4 text-center"> {formatDate(leave.fromDate)} </td>
                                    <td className="py-4 text-center"> {formatDate(leave.toDate)} </td>
                                    <td className="py-4 text-center">  {new Date(leave.createdAt).toLocaleDateString()} </td>

                                    <td className="p-3 text-center">
                                        <span  className={`px-3 py-1 rounded text-sm ${  leave.status === "Approved"
                                                    ? "bg-green-600"
                                                    : leave.status === "Rejected"
                                                    ? "bg-red-600"
                                                    : "bg-yellow-600" }`} >
                                            {leave.status}
                                        </span>
                                    </td>
                                    <td className="px-3 py-4 text-center"> {leave.adminRemark || "-"}  </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyLeaves;