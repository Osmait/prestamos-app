import useLoans from "@/hooks/usePrestamos";
import { userSingUp } from "@/interface/userSignip";
import { Card, Text, Button, Container } from "@nextui-org/react";
import { Input, Spacer } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { toast } from "sonner";

import { signUp } from "./api/signUp";

export default function Registrar() {
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      address: "santiago",
    };
    try {
      await signUp(data);
      toast.success("Usuario creado correctamente ");
      router.push("/login");
    } catch (error: any) {
      // Object.values(JSON.parse(error.request.responseText)).forEach(
      //   (message: any) => {
      //     toast.error(message);
      //   }
      // );
    }
  };

  return (
    <Container
      display="grid"
      justify="center"
      alignContent="center"
      alignItems="center"
    >
      <Spacer y={3.5} />
      <Text h2 data-testid="title">
        Registrar
      </Text>
      <form onSubmit={handleSubmit} ref={form}>
        <Spacer y={1.6} />
        <Input
          width="300px"
          labelPlaceholder="Name"
          name="name"
          label="Name"
          data-testid="num1"
        />
        <Spacer y={1.6} />
        <Input
          width="300px"
          labelPlaceholder="Last Name"
          name="lastName"
          label="Last Name"
        />
        <Spacer y={1.6} />
        <Input
          width="300px"
          labelPlaceholder="Email"
          name="email"
          label="Email"
        />
        <Spacer y={1.6} />
        <Input.Password
          width="300px"
          labelPlaceholder="Password"
          name="password"
          label="Password"
        />
        <Spacer y={1.6} />

        <Button shadow rounded size={"lg"} type="submit" name="Registrar">
          Registrar
        </Button>
        <Spacer y={1.6} />
      </form>
    </Container>
  );
}
