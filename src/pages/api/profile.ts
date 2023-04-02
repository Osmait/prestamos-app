import { userResponse } from "@/interface/user";
import axios from "axios";
const API = process.env.NEXT_PUBLIC_API;

export const profileApi = async (token: String) => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  const { data } = await axios.get(`${API}/profile`);
  console.log(data);
  return data as userResponse;
};
