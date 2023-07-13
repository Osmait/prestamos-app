import { userSingUp } from "@/interface/userSignip";
import axios from "axios";
const API = process.env.NEXT_PUBLIC_API;

export const signUp = async (body: userSingUp) => {
  return await axios.post(`${API}/public/user`, body);
};
