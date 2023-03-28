import { Collapse, Text } from "@nextui-org/react";

import { GetServerSideProps } from "next/types";
import { getClients } from "./api/client";
import cookieParser from "cookie-parser";

import Loan from "@/components/Loan";
import { clientInterface } from "@/interface/client";

type Props = {
  clients: clientInterface[];
};

export default function clients({ clients }: Props) {
  return (
    <>
      <Text h1 css={{ marginInline: "auto" }}>
        Lista de Clientes
      </Text>
      <Collapse.Group splitted className="blur-in">
        {clients
          ? clients.map((client: clientInterface) => (
              <Collapse key={client.id} title={client.name} shadow bordered>
                <Loan clientId={client.id} />
              </Collapse>
            ))
          : []}
      </Collapse.Group>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  // Parse cookies
  cookieParser(context.req, context.res);

  const cookies = context.req.cookies;

  const clients: clientInterface = await getClients(cookies.token!);

  return {
    props: { clients },
  };
};
