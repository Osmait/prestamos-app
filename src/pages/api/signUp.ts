import { userSingUp } from "@/interface/userSignip";
const API = process.env.NEXT_PUBLIC_API;

export const signUp = async (body: userSingUp) => {
  const response = await fetch(`${API}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  console.log(process.env.API_URL);
  console.log(response);
};
