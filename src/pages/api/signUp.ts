import { userSingUp } from "@/interface/userSignip";

export const signUp = async (body: userSingUp) => {
  const response = await fetch(`http://localhost:8080/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  console.log(process.env.API_URL);
  console.log(response);
};
