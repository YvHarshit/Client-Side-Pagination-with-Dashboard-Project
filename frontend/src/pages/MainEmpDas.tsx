import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const MainEmpDas = () => {

  const { empDetails } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1d201c] text-white px-8 py-8 font-serif">

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-center tracking-wide">
          Employee Dashboard
        </h1>

        <div className="flex mt-9 items-center justify-between md:mt-4">
            <div>
              <p className="text-lime-400 mt-4 text-3xl"> Welcome, {empDetails?.name || "Employee"} </p>
              <p className="text-gray-400 text-sm mt-1"> Here's what's happening with your account today. </p>
            </div>

            <button className="cursor-pointer rounded-lg bg-red-800 py-2 px-6 hover:bg-red-700 transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500"
             onClick={() => navigate("/emp-login")} > Logout </button>


              <button className="cursor-pointer rounded-lg bg-red-800 py-2 px-6 hover:bg-red-700 transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500"
             onClick={() => navigate("/emp/attendance")} > Attendance </button>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


        <div onClick={() => navigate("/profile")}
          className="mx-3 text-center cursor-pointer rounded-xl bg-[#2b3528] border-2 border-[#3a5035] p-6 hover:bg-[#394636] hover:border-lime-600 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-1">
          <h2 className="text-xl font-semibold mb-3 text-lime-500"> My Profile </h2>
          <p className="text-gray-300"> View / edit profile. </p>

        </div>


        <div onClick={() => navigate("/emp/apply-leave")}
          className="mx-3 text-center cursor-pointer rounded-xl bg-[#2b3528] border-2 border-[#3a5035] p-6 hover:bg-[#394636] hover:border-lime-600 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-1"
        >
          <h2 className="text-xl font-semibold text-lime-500 mb-3"> Apply Leave / Raise Query </h2>
          <p className="text-gray-300"> Submit a leave request or raise a query. </p>

        </div>


        <div onClick={() => navigate("/emp/my-leaves")}
          className="mx-3 text-center cursor-pointer rounded-xl bg-[#2b3528] border-2 border-[#3a5035] p-6 hover:bg-[#394636] hover:border-lime-600 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-1">

          <h2 className="text-xl font-semibold mb-3 text-lime-500"> My Leaves </h2>
          <p className="text-gray-300"> View all your leave requests. </p>

        </div>


      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-5">
          Recent Leave Requests
        </h2>

        <div className="rounded-lg bg-[#2b3528] p-5 shadow-md border border-[#3a5035]">

          <table className="w-full">

            <thead>
              <tr className="text-left border-b border-gray-600 text-gray-400 text-sm uppercase tracking-wide">
                <th className="py-3">Leave Type</th>
                <th>Status</th>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>

            <tbody>

              <tr className="hover:bg-[#33402f] transition-colors duration-150">
                <td className="py-6 text-center text-gray-400" colSpan={4}>No leave requests found</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MainEmpDas;