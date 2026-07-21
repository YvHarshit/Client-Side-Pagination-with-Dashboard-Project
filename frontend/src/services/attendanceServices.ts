import axios from "axios";

export const getAttendanceHistory = async (backendUrl: string) => {
  const { data } = await axios.get(`${backendUrl}/emp/attendace/history`,
    { withCredentials: true }
  );

  return data;
};


export const checkIn = async (backendUrl: string) => {
  const now = new Date();
  const { data } = await axios.post( `${backendUrl}/emp/checkin`,
    {
      date: now.toISOString().split("T")[0],
      clockIn: now.toISOString()
    },
    { withCredentials: true }
  );

  return data;
};

export const checkOut = async (backendUrl: string) => {
  const now = new Date();
  const { data } = await axios.patch( `${backendUrl}/emp/checkout`,
    {
      date: now.toISOString().split("T")[0],
      checkOut: now.toISOString()
    },
    { withCredentials: true }
  );

  return data;
};


export const myEmpTodayAttendance = async(backendUrl: string) => {
  const {data} = await axios.get(`${backendUrl}/auth/myemp/today/attendance`, { withCredentials: true })
  return data ;

}





