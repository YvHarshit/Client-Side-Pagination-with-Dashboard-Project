import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const MainEmpDas = () => {

  const { empDetails } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1d201c] text-white px-8 py-8 font-serif">

      <div className="mb-8">
        
        <h1 className="text-4xl font-bold text-center ">
          Employee Dashboard
        </h1>

        
        <div className="flex mt-9 items-center justify-between md:mt-4">
            <p className="text-lime-400 mt-4 text-3xl">  Welcome, {empDetails?.name} </p>

            <button className="cursor-pointer rounded-lg bg-red-800 py-2 px-6 hover:bg-red-700 transition"
             onClick={() => navigate("/emp-login")} > Logout </button>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

       
        <div onClick={() => navigate("/profile")}
          className="mx-3 text-center cursor-pointer rounded-xl bg-[#2b3528] border-3 border-[#3a5035]  p-6 hover:bg-[#394636] transition">
          <h2 className="text-xl font-semibold mb-3 text-lime-600">  My Profile </h2>
          <p className="text-indigo-300"> View and edit your profile. </p>

        </div>

     
        <div  onClick={() => navigate("/emp/apply-leave")}
          className="mx-3 text-center cursor-pointer rounded-xl bg-[#2b3528] border-3 border-[#3a5035] p-6 hover:bg-[#394636] transition"
        >
          <h2 className="text-xl font-semibold text-lime-600 mb-3"> Apply Leave </h2>
          <p className="text-indigo-300">  Submit a leave request. </p>

        </div>

        
        <div onClick={() => navigate("/emp/my-leaves")}
          className="mx-3 text-center cursor-pointer rounded-xl bg-[#2b3528] border-3 border-[#3a5035] p-6 hover:bg-[#394636] transition">

          <h2 className="text-xl font-semibold mb-3 text-lime-600"> My Leaves </h2>
          <p className="text-indigo-300"> View all your leave requests. </p>

        </div>

        

      </div>

      {/* Recent Activity */}
      <div className="mt-12">

        <h2 className="text-2xl font-semibold mb-5">
          Recent Leave Requests
        </h2>

        <div className="rounded-lg bg-[#2b3528] p-5">

          <table className="w-full">

            <thead>
              <tr className="text-left border-b border-gray-600">
                <th className="py-3">Leave Type</th>
                <th>Status</th>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td className="py-4">No Leave Found</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default MainEmpDas;