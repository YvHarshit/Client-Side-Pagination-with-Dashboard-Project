import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import type { UserData } from "../types/user.types";
import type { AppContextType } from "../types/user.types";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api';
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const [selectedDomain, setSelectedDomain] = useState("all") ;
  const [currPage, setCurrPage] = useState(1) ;
  
  
  const getUserData = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/auth/getme`);

      if (data.success) {
        setUserData(data.userData);
        setIsLoggedin(true);
      } 
      else {
        setIsLoggedin(false);
        setUserData(null);
      }
    } catch(error) {
      console.error("getUserData failed:", error);
      setIsLoggedin(false);
      setUserData(null);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const value: AppContextType = {
    backendUrl,
    isLoggedin, setIsLoggedin,
    userData, setUserData,
    getUserData,

    selectedDomain, setSelectedDomain ,
    currPage, setCurrPage
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppContextProvider");
  return ctx;
};