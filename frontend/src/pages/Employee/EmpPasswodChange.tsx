import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { LockReset } from "@mui/icons-material";

const EmpPasswodChange = () => {
  const navigate = useNavigate();
  const { backendUrl } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in both fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await axios.post(
        `${backendUrl}/api/user/emp-change-password`,
        { newPassword },
        { withCredentials: true },
      );

      toast.success("Password changed successfully.");
      navigate("/emp-login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-serif">
      <div className="border border-white p-3 sm:p-12 rounded-lg w-full max-w-md bg-[#232f20]">
        <div className="flex gap-3 items-center justify-center ">
          <div className="bg-lime-400/10 p-2 h-max rounded-full">
            <LockReset className="text-lime-500" style={{ fontSize: 42 }} />
          </div>
          <div>
            <h2 className="text-4xl font-semibold text-lime-300">
              {" "}
              Emloyee Login{" "}
            </h2>
          </div>
        </div>

        <p className="text-sm  mt-3 mb-8 text-center text-lime-500">
          {" "}
          Change you password to secure your account
        </p>

        <form className="flex flex-col " onSubmit={handleSubmit}>
          <label className="block text-lg font-medium text-gray-100 mx-3">
            {" "}
            New Password :{" "}
          </label>

          <div className="relative mt-3">
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-full px-3 py-3 pr-16 text-base text-white bg-[#2c3d28] outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-500 sm:text-sm"
              placeholder="Enter new password"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-lime-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <label className="block text-lg font-medium text-gray-100 mx-3 sm:mt-9">
            Confirm Password :{" "}
          </label>
          <div className="relative mt-3">
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-full px-3 py-3 text-base text-white bg-[#2c3d28]  outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-lime-500 sm:text-sm"
              placeholder="Enter Confirm password"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-lime-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button className="mt-8 flex w-full justify-center rounded-full bg-lime-600   py-3 text-lg font-semibold text-black hover:bg-lime-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmpPasswodChange;
