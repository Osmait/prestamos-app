import { ModalAdd } from "@/components/ModalAdd";
import { clientInterface } from "@/interface/client";
import { Button } from "@nextui-org/react";
import cookieParser from "cookie-parser";
import { GetServerSideProps } from "next";
import { getClients } from "../api/client";

type Props = {
  clients: clientInterface[];
};

export default function add({ clients }: Props) {
  return <ModalAdd clients={clients} />;
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  // Parse cookies
  cookieParser(context.req, context.res);

  const cookies = context.req.cookies;

  const clients = await getClients(cookies.token!);

  return {
    props: { clients },
  };
};
