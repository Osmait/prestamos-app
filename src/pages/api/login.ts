import axios from "axios";

export const loginApi = async (body: any) => {
  try {
    const {
      data: { token },
    } = await axios.post("http://localhost:8080/login", body);

    return token;
  } catch (error) {
    console.log("hay un fallo");
    console.log(error);
  }
};
