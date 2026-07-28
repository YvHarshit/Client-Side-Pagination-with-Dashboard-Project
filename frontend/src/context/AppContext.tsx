import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import { type Employee, type UserData } from "../types/user.types";
import type { AppContextType } from "../types/user.types";
import {getEmpDetails} from "../services/empService.js"

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api';
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const [selectedDomain, setSelectedDomain] = useState("all") ;
  const [currPage, setCurrPage] = useState(1) ;

  const [searchStr, setSearchStr] = useState("") ;
  const [totalPages, setTotalPages] = useState(1) ;
  const [totalEmp, setTotalEmp] = useState(1) ;
  const [trigger, setTrigger] = useState(true) ;

  const [filteredData, setFilteredData] = useState(0) ;
  const [empDetails, setEmpDetails] = useState<Employee | null>(null) ;
  
  
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

  const fetchEmployeeDetails = async () => {
  try {
    const employee = await getEmpDetails(backendUrl);
    setEmpDetails(employee.emp);

    // console.log("Setting employee:", employee);
    // console.log("employee.emp:", employee.emp);
  } 
  catch (error) {
    console.log(error);
    setEmpDetails(null);
  }
};

useEffect(() => {
  getUserData()
  fetchEmployeeDetails() 
}, []);

  

  const value: AppContextType = {
    backendUrl,
    isLoggedin, setIsLoggedin,
    userData, setUserData,
    getUserData,

    selectedDomain, setSelectedDomain ,
    currPage, setCurrPage,
    searchStr, setSearchStr,
    totalPages, setTotalPages,
    totalEmp, setTotalEmp ,
    trigger, setTrigger ,

    filteredData, setFilteredData ,
    empDetails, setEmpDetails ,
    getEmpDetails,
    fetchEmployeeDetails ,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppContextProvider");
  return ctx;
};