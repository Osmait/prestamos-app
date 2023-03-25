import { userSingUp } from "@/interface/userSignip";
import { Card, Text, Button, Container } from "@nextui-org/react";
import { Input, Spacer } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { signUp } from "./api/signUp";

export default function Registrar() {
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) {
      return "Error";
    }
    const formData = new FormData(form.current);

    const data: userSingUp = {
      name: formData.get("name") as String,
      lastName: formData.get("lastName") as String,
      email: formData.get("email") as String,
      password: formData.get("password") as String,
    };

    signUp(data);
    router.push("/login");
  };

  return (
    <Container
      display="grid"
      justify="center"
      alignContent="center"
      alignItems="center"
    >
      <Spacer y={3.5} />
      <Text h2>Registrar</Text>
      <form onSubmit={handleSubmit} ref={form}>
        <Spacer y={1.6} />
        <Input width="300px" labelPlaceholder="Name" name="name" />
        <Spacer y={1.6} />
        <Input width="300px" labelPlaceholder="Last Name" name="lastName" />
        <Spacer y={1.6} />
        <Input width="300px" labelPlaceholder="Email" name="email" />
        <Spacer y={1.6} />
        <Input.Password
          width="300px"
          labelPlaceholder="Password"
          name="password"
        />
        <Spacer y={1.6} />

        <Button shadow rounded size={"lg"} type="submit">
          Registar
        </Button>
        <Spacer y={1.6} />
      </form>
    </Container>
  );
}
