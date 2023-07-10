import { Error } from "@/components/Error";
import useLoans from "@/hooks/usePrestamos";
import { Text, Button, Container } from "@nextui-org/react";
import { Input, Spacer } from "@nextui-org/react";

import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { loginApi } from "./api/login";

type Error = {
  error: boolean;
  message: String;
};

export default function Login() {
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const email = useRef<HTMLInputElement>(null);

  const password = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.current?.value || !password.current?.value) {
      toast.error("Email y Contraseña Son Requeridos");
      setError({
        error: true,
        message: "Email y Contraseña Son Requeridos",
      });
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }
    const data = {
      email: email.current.value,
      password: password.current.value,
    };

    const tokenSEt = Cookies.get("token");

    if (tokenSEt) {
      Cookies.remove("token");
    }
    try {
    
      const token = await loginApi(data);
      if (!token) {
        setError({
          error: true,
          message: "Error en el  Al Logear",
        });
        setTimeout(() => {
          setError(null);
        }, 2000);
        return;
      }
      toast.success("Login Success");
      Cookies.set("token", token, { expires: 5 });

      router.push("/");
    } catch (error: any) {
      console.log(error);
      // Object.values(JSON.parse(error.request.responseText)).forEach(
      //   (message: any) => {
      //     toast.error(message);
      //   }
      // );
      setError({
        error: true,
        message: "Error en el login",
      });
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
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
        {error && (
          <Error>
            <Text>{error.message}</Text>
          </Error>
        )}
        <Spacer y={3.5} />
        <Text h2 data-testid={"login"}>
          Login
        </Text>
        <form onSubmit={handleSubmit}>
          <Spacer y={1.6} />

          <Input
            width="300px"
            labelPlaceholder="Email"
            ref={email}
            label="Email"
          />
          <Spacer y={1.6} />
          <Input.Password
            label="Password"
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
