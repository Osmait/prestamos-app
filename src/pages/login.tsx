import useAuth from "@/hooks/useAuth";
import { Text, Button, Container } from "@nextui-org/react";
import { Input, Spacer } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function Login() {
  const { singIn } = useAuth();
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
    singIn(data);

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
