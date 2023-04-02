import axios from "axios";
const API = process.env.NEXT_PUBLIC_API;

export const loginApi = async (body: any) => {
  try {
    const {
      data: { token },
    } = await axios.post(`${API}/login`, body);

    return token;
  } catch (error) {
    console.log("hay un fallo");
    console.log(error);
  }
};
