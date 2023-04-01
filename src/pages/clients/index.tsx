import { Card, Grid, Row, Text } from "@nextui-org/react";

import { clientInterface } from "@/interface/client";

import Link from "next/link";
import cookieParser from "cookie-parser";
import { getClients } from "../api/client";
import { GetServerSideProps } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { redirect } from "next/dist/server/api-utils";
import useLoans from "@/hooks/usePrestamos";
import Loading from "../../components/loading";

type Props = {
  clients: clientInterface[];
};

export default function Clients({ clients }: Props) {
  const { loading } = useLoans();
  return (
    <>
      <Row>
        <Text h1 css={{ marginInline: "auto" }}>
          <FontAwesomeIcon icon={faUsers} width={"50px"} />
          Lista de Clientes
        </Text>
      </Row>

      {loading ? (
        <Loading />
      ) : (
        <>
          <Link href={"clients/add"}>
            <Card variant="bordered" isPressable isHoverable>
              <Text h3 transform="capitalize" css={{ textAlign: "center" }}>
                Agregar
              </Text>
            </Card>
          </Link>

          <Grid.Container gap={2} className={"container_clients"}>
            {clients
              ? clients.map((client: clientInterface) => (
                  <>
                    <Grid.Container direction="row" gap={2} className="blur-in">
                      <Grid xs={12} md>
                        <Card variant="bordered" isPressable isHoverable>
                          <Card.Header>
                            <FontAwesomeIcon icon={faUser} width={"20px"} />
                          </Card.Header>
                          <Link href={`clients/${client.id}`}>
                            <Card.Body css={{ justifyItems: "center" }}>
                              <Text
                                h3
                                transform="capitalize"
                                css={{ textAlign: "center" }}
                              >
                                {client.name} {client.lastName}
                              </Text>
                              <Text
                                h3
                                transform="capitalize"
                                css={{ textAlign: "center" }}
                              >
                                <Text>Ver Prestamos</Text>
                              </Text>
                            </Card.Body>
                          </Link>
                        </Card>
                      </Grid>
                    </Grid.Container>
                  </>
                ))
              : []}
          </Grid.Container>
        </>
      )}
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  // Parse cookies
  cookieParser(context.req, context.res);

  const cookies = context.req.cookies;
  try {
    const clients = await getClients(cookies.token!);
    return {
      props: { clients },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
