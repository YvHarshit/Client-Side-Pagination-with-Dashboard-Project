import axios from "axios";
import { useEffect, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthenticateAccount = () => {
  const { backendUrl, getUserData, isLoggedin, userData} = useAppContext();

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => { axios.defaults.withCredentials = true; }, []);

  const handleInput = ( e: React.FormEvent<HTMLInputElement>,index: number) => {
    if ( e.currentTarget.value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = ( e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && e.currentTarget.value === "" && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };


  const sendOtp = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/auth/send-otp`);
      toast.info("OTP expires in 15 minutes.")

      if (data.success)  toast.success(data.message);
      else  toast.error(data.message);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any 
    catch (error: any) { toast.error(error.response?.data?.message || error.message); }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const otp = inputRef.current.map((input) => input.value).join(""); 
      const { data } = await axios.post( `${backendUrl}/auth/authenticate-account`,{ otp });

      if (data.success) {
        toast.success(data.message);
        await getUserData();

        navigate("/");
      } else {
        toast.error(data.message);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };


  useEffect(() => {
    if (isLoggedin) {
      sendOtp();
    }
  //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if ( isLoggedin && userData && userData.isAuthenticated) 
      { navigate("/"); 
        toast("Already authenticated")
      }
  }, [isLoggedin, userData, navigate]);

  return (
    <div className="flex items-center justify-center h-screen text-center">
      <form onSubmit={submitHandler}>
        <h1 className="text-3xl font-semibold mb-4">
          Authenticate User Account
        </h1>

        <p className="text-sm font-semibold mb-4">
          Enter the 4-digit code sent to your Email
        </p>

        <div>
          {Array(4).fill(0).map((_, index) => (
              <input key={index} type="text" maxLength={1} required
                className="w-12 h-12 bg-[#161715] border border-[#3a5035] rounded-md text-lg mx-1 text-white text-center"
                ref={(el) => { if (el) inputRef.current[index] = el; }}

                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>

        <button type="submit"
          className="bg-[#a8d96c] border border-[#3a5035] rounded-md text-lg text-black px-6 py-2 mt-4 cursor-pointer hover:scale-105 transition">
          Authenticate Account
        </button>
      </form>
    </div>
  );
};

export default AuthenticateAccount;