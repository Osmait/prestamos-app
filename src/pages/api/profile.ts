import { userResponse } from "@/interface/user";
import axios from "axios";

export const profileApi = async (token: String) => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  const { data } = await axios.get("http://localhost:8080/profile");
  console.log(data);
  return data as userResponse;
};
