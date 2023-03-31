import Cookies from "js-cookie";
import axios from "axios";
import { loanIPostnterface } from "@/interface/loan";

// export const getLoan = async (token: String) => {
//   axios.defaults.headers.Authorization = `Bearer ${token}`;
//   const { data: clients } = await axios.get("http://localhost:8080/loan/1");

//   return clients;
// };

export const postLoan = async (token: String, body: loanIPostnterface) => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  const { data: clients } = await axios.post(
    "http://localhost:8080/loan",
    body
  );

  return clients;
};
