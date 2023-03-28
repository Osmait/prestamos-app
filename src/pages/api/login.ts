import axios from "axios";

export const loginApi = async (body: any) => {
  const {
    data: { token },
  } = await axios.post("http://localhost:8080/login", body);

  return token;
};
