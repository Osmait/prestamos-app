import axios from "axios";

export const getAllTransaction = async (token: String) => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  const { data: transaction } = await axios.get(
    `http://localhost:8080/transaction/user`
  );

  return transaction;
};
