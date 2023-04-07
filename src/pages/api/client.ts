import { clientInterface } from "@/interface/client";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API;

export const getClients = async (token: String) => {
  const config = {
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data: clients } = await axios.get(`${API}/client`, config);

  return clients;
};

export const postClients = async (token: String, body: clientInterface) => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  const { data: clients } = await axios.post(`${API}/client`, body);
};

export const deleteClients = async (token: String, id: number) => {
  const config = {
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios.delete(`${API}/client/${id}`, config);
};
