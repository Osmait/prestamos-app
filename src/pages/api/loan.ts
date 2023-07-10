import axios from "axios";
import { loanIPostnterface, loanInterface } from "@/interface/loan";
import { Dayjs } from "dayjs";

const API = process.env.NEXT_PUBLIC_API;

export const getLoan = async (
  token: String,
  id: String
): Promise<loanInterface> => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  const { data } = await axios.get(`${API}/loan/${id}`);
 

  return data;
};

export const deleteLoan = async (token: String, id: number) => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  return await axios.delete(`${API}/loan/${id}`);
};

export const postLoan = async (token: String, body: loanIPostnterface) => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  const { data: clients } = await axios.post(`${API}/loan`, body);

  return clients;
};
