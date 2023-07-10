import axios from "axios";

const API = process.env.NEXT_PUBLIC_API;

export const loginApi = async (body: any): Promise<string> => {
  const {
    data: { token },
  } = await axios.post(`${API}/public/login`, body);

  return token;
};
