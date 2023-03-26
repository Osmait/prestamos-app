import Cookies from "js-cookie";
import axios from "axios";

export const getLoans = async () => {
  const token = Cookies.get("token");
  console.log(token);
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  const { data: loan } = await axios.get(`http://localhost:8080/loan/1`);
  console.log(loan);
  return loan;
};
