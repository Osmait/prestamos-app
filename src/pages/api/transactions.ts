import axios from "axios";

const API = process.env.NEXT_PUBLIC_API;

export const getAllTransaction = async (token: String) => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  const { data: transaction } = await axios.get(`${API}/transaction`);

  return transaction;
};

export const deleteTransaction = async (token: String, id: number) => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  return await axios.delete(`${API}/transaction/${id}`);
};
