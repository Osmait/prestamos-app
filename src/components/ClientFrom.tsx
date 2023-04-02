import useLoans from "@/hooks/usePrestamos";
import { clientInterface } from "@/interface/client";
import { postClients } from "@/pages/api/client";
import { Button, Input, Modal, Spacer } from "@nextui-org/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useRef } from "react";

export const ClientFrom = ({ closeHandler }: any) => {
  const router = useRouter();

  const clienFrom = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!clienFrom.current) {
      return "Error";
    }
    const formData = new FormData(clienFrom.current);

    const data: clientInterface = {
      name: formData.get("name") as String,
      lastName: formData.get("lastName") as String,
    };

    if (formData.get("email")) {
      data.email = formData.get("email") as String;
    }
    if (formData.get("phoneNumber")) {
      data.phoneNumber = formData.get("phoneNumber") as String;
    }

    const token = Cookies.get("token");
    if (!token) {
      return;
    }
    await postClients(token, data);

    router.push("/clients");
  };

  return (
    <form ref={clienFrom} onSubmit={handleSubmit}>
      <Modal.Body>
        <Input
          label="Nombre"
          name="name"
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Nombre"
        />
        <Spacer y={1} />
        <Input
          label="Apellido"
          name="lastName"
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Apellido"
        />
        <Spacer y={1} />

        <Input
          label="Email"
          name="email"
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="email"
        />
        <Spacer y={1} />
        <Input
          label="Telefono"
          name="phoneNumber"
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Telefono"
        />
        <Spacer y={1} />
      </Modal.Body>

      <Modal.Footer>
        <Button auto flat color="error" onPress={closeHandler}>
          Close
        </Button>
        <Button auto type={"submit"}>
          Add
        </Button>
      </Modal.Footer>
    </form>
  );
};
