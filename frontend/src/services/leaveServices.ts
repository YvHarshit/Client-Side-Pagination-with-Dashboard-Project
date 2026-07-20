import axios from "axios";
import type { LeaveFormData } from "../utils/zodValidation";

export const createLeave = async ( backendUrl: string, leaveData: LeaveFormData ) => {
  const { data } = await axios.post( `${backendUrl}/emp/create/leave`, leaveData, { withCredentials: true } );
  return data;
}; 


export const getMyLeaves = async (backendUrl: string) => {
    const { data } = await axios.get( `${backendUrl}/emp/get/leave`, { withCredentials: true });
    return data;
};



export const leaveToAdmin =async (backendUrl: string) => { 
  const {data} = await axios.get(`${backendUrl}/auth/admin/get/leave`, { withCredentials: true, } );
  return data; 
} 


export const updateLeaveStatus = async (backendUrl: string,leaveId: string, status: "Approved" | "Rejected") => {
  const { data } = await axios.patch(`${backendUrl}/auth/admin/update/leave/${leaveId}`,
    {
      status,
      adminRemark: status === "Approved"
        ? "Approved by Admin"
        : "Rejected by Admin",
    },
    { withCredentials: true }
  );

  return data;
};