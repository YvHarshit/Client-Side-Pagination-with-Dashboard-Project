import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";
import { auth } from "../firebase.js";
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth";

export default function Login() 
{

    const navigate = useNavigate();
    const { backendUrl, setIsLoggedin, getUserData } = useAppContext();

    const [state, setState] = useState < "Sign Up" | "Login" > ("Login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



  const provider = new GoogleAuthProvider();

  const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const firebaseToken = await result.user.getIdToken();

    const { data } = await axios.post(`${backendUrl}/auth/google`, { idToken: firebaseToken }, { withCredentials: true } );

    if (data.success) {

      setIsLoggedin(true);
      await getUserData();
      toast.success(data.message);
      navigate("/");
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Google Login Failed");
  }
};

const validateForm = () => {
  if (state === "Sign Up") {
    const nameRegex = /^[A-Za-z\s]+$/;

    if (name.trim().length < 2) {
      toast.error("Name must be at least 2 characters");
      return false;
    }
    if (!nameRegex.test(name.trim())) {
      toast.error("Name can contain only alphabets");
      return false;
    }
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    toast.error("Please enter a valid email address");
    return false;
  }
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
  if (!passRegex.test(password.trim())) {
    toast.error("Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and minimum length of 6");
    return false;
  }
  return true;
};


    
    
  const onSubmitHandler = async (e: React.FormEvent) => {
  e.preventDefault();
   if (!validateForm()) return;
  try {
      axios.defaults.withCredentials = true;
      if (state === "Sign Up") {
          const { data } = await axios.post(`${backendUrl}/auth/register`, { name, email, password });
          setState("Login"); //Show Login form
          if (data.success) {
              toast.success("Account created successfully! Please login.");
              setEmail(email);
              setName("");
              setPassword("");
          }
          else  toast.error(data.message);
          
      }
      else {
          const { data } = await axios.post(`${backendUrl}/auth/login`, { email, password });
          if (data.success) {
              setIsLoggedin(true);
              await getUserData();
              toast.success(data.message);
              navigate("/");
          } else toast.error(data.message);
      }
  }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catch (error: any) {
          toast.error(error.response?.data?.message || "Something went wrong");
      }
  };

return (
  <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-[#1d201c]">
    <div className="border border-white p-12 rounded-lg w-full max-w-md bg-[#232f20]">
      <h2 className="text-4xl font-semibold mb-8 text-center text-lime-300"> {state === 'Sign Up' ? "Create Your Account" : "Login to Your Account"} </h2>
            
        <form onSubmit={onSubmitHandler}>
            {state === "Sign Up"
          &&
          (
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#2c3d28]">
                  <label className='text-white w-30'>Name :</label>
                  <input type="text" value={name} required placeholder="Full Name"
                      onChange={(e) => setName(e.target.value)}
                      className="rounded-full px-5"
                  />
              </div>
          )}
      <div className="mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#2c3d28] ">
          <label className='text-white w-30'>Email :</label>
          <input type="text" value={email} required placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-full px-5 " />
      </div>
      <div className="mb-4 flex items-center gap-3 w-full px-5 py-3 rounded-full bg-[#2c3d28]">
          <label className='text-white w-30' >Password :</label>
          <input type="password" value={password} required placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-full px-5" />
      </div>
      <button className="w-full px-5 py-3 rounded-full bg-[#a8d96c] text-black font-semibold cursor-pointer hover:scale-102 transition-all"
          type="submit">{state === 'Sign Up' ? "Create Account" : "Login"}</button>
      {state === 'Login'
          &&
          (
              <p className="text-center m-2"> Don't have an account? {' '}
                  <span className="text-[#a8d96c] cursor-pointer" onClick={() => setState('Sign Up')}>Sign Up here</span></p>
          )}
      {state === 'Sign Up'
          &&
          (
              <p className="text-center m-2"> Already have an account?{' '}
                  <span className="text-[#a8d96c] cursor-pointer  " onClick={() => setState('Login')}>Login here</span></p>
                    )}

            <button className="w-full mt-4 px-5 py-3 rounded-full bg-[#a8d96c] text-black font-semibold cursor-pointer hover:scale-102 transition-all"
            type="button" onClick={googleLogin}> Continue with Google </button>        
            </form>
        </div>
    </div>
  )
}




