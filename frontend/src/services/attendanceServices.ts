import axios from "axios";


export const checkInAttendance = async (data: {date: string; clockIn: string; status: string}) => {
    const response = await axios.post(`http://localhost:3000/api/emp/checkin`, data, { withCredentials: true });
    return response.data;
};


export const checkOutAttendance = async (data: {date: string; checkOut: string;}) => {
    const response = await axios.patch(`http://localhost:3000/api/emp/checkout`, data, { withCredentials: true });
    return response.data;
};


export const attendanceHistory = async () => {
    const response = await axios.get(`http://localhost:3000/api/emp/attendace/history`, { withCredentials: true });
    return response.data;
};