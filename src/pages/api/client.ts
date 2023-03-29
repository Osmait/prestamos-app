import { clientInterface } from "@/interface/client";
import axios from "axios";

export const getClients = async (token: String) => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  const { data: clients } = await axios.get("http://localhost:8080/client");

  return clients;
};

export const postClients = async (token: String, body: clientInterface) => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  const { data: clients } = await axios.post(
    "http://localhost:8080/client",
    body
  );

  console.log(clients);
};
