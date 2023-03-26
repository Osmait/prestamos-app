import { Collapse, Text } from "@nextui-org/react";

import { GetServerSideProps } from "next/types";
import { getClients } from "./api/client";
import cookieParser from "cookie-parser";
import { ListLoan } from "@/components/ListLoan";
import axios from "axios";

export default function clients({ clients }: any) {
  return (
    <Collapse.Group>
      {clients.map((client: any) => (
        <Collapse key={client.id} title={client.name}>
          <ListLoan clientID={client.id} />
        </Collapse>
      ))}
    </Collapse.Group>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context: any) => {
//   // Parse cookies
//   cookieParser(context.req, context.res);

//   const cookies = context.req.cookies;

//   const clients = await getClients(cookies.token!);

//   return {
//     props: { clients },
//   };
// };
