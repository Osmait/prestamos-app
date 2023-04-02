import axios from "axios";
import { loanIPostnterface } from "@/interface/loan";

const API = process.env.NEXT_PUBLIC_API;

export const getLoan = async (token: String, id: String) => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  const { data: clients } = await axios.get(`${API}/loan/${id}`);

  return clients;
};

export const postLoan = async (token: String, body: loanIPostnterface) => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  const { data: clients } = await axios.post(`${API}/loan`, body);

  return clients;
};
