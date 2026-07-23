import axios from "axios";

export const getEmpDetails = async (backendUrl: string) => {
  axios.defaults.withCredentials = true;
  const { data } = await axios.get(`${backendUrl}/user/emp-details`);
  return data;
};

export const myEmp = async(backendUrl : string) => {
  axios.defaults.withCredentials = true ;
  const { data } = await axios(`${backendUrl}/auth/admin/my-emp`) ;
  return data ;
}