import axios from "axios";
import type { LeaveFormData } from "../utils/zodValidation";

// const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const createLeave = async (data: LeaveFormData) => {
    const response = await axios.post(`http://localhost:3000/api/emp/create/leave`, 
        data,
        { withCredentials: true }
    );
    return response.data;
};

export const getMyLeaves = async () => {
    const { data } = await axios.get( `http://localhost:3000/api/emp/get/leave`,
        { withCredentials: true, }
    );
    return data;
};




