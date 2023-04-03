import { Button } from "@nextui-org/react";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export const Logout = () => {
  const router = useRouter();
  const hableLogout = () => {
    if (!confirm("Estas Seguro que Deseas Salir ")) {
      return;
    }
    const token = Cookies.get("token");
    if (token) {
      Cookies.remove("token");
    }
    router.reload();
  };

  return (
    <Button onPress={hableLogout} size={"xs"}>
      Logout
    </Button>
  );
};
