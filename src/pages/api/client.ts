import axios from "axios";

export const getClients = async (token: String) => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  const { data: clients } = await axios.get("http://localhost:8080/client");

  return clients;
};
