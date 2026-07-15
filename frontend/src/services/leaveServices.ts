import axios from "axios";
import type { LeaveFormData } from "../utils/zodValidation";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const createLeave = async (data: LeaveFormData) => {
    const response = await axios.post(`${backendUrl}/api/emp/create/leave`, 
        data,
        { withCredentials: true }
    );
    return response.data;
};

export const getMyLeaves = async () => {
    const { data } = await axios.get( `${backendUrl}/api/emp/get/leave`,
        { withCredentials: true, }
    );
    return data;
};




