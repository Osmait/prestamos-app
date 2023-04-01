import useAuth from "@/hooks/useAuth";
import useLoans from "@/hooks/usePrestamos";
import { Text, Button, Container } from "@nextui-org/react";
import { Input, Spacer } from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useRef } from "react";
import { loginApi } from "./api/login";

export default function Login() {
  const router = useRouter();
  const email = useRef<HTMLInputElement>(null);

  const password = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.current || !password.current) {
      return "Error";
    }
    const data = {
      email: email.current.value,
      password: password.current.value,
    };

    const tokenSEt = Cookies.get("token");

    if (tokenSEt) {
      Cookies.remove("token");
    }
    const token = await loginApi(data);
    if (!token) {
      return;
    }
    Cookies.set("token", token, { expires: 5 });

    router.push("/");
  };

  return (
    <>
      <Container
        display="grid"
        justify="center"
        alignContent="center"
        alignItems="center"
      >
        <Spacer y={3.5} />
        <Text h2>Login</Text>
        <form onSubmit={handleSubmit}>
          <Spacer y={1.6} />
          <Input width="300px" labelPlaceholder="Email" ref={email} />
          <Spacer y={1.6} />
          <Input.Password
            width="300px"
            labelPlaceholder="Password"
            ref={password}
          />
          <Spacer y={1.6} />

          <Button type="submit">Login</Button>
        </form>
      </Container>
    </>
  );
}
