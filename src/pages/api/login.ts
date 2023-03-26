import axios from "axios";

export const loginApi = async (body: any) => {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      origin: "x-requested-with",

      "Content-Type": "application/json",
    },
  };

  const {
    data: { token },
  } = await axios.post("http://localhost:8080/login", body, config);

  return token;
};
