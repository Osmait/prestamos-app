import axios from "axios";

const API = process.env.NEXT_PUBLIC_API;

export const getAllTransaction = async (token: String) => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  const { data: transaction } = await axios.get(`${API}/transaction/user`);

  return transaction;
};
