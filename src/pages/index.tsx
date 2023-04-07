import { Charts } from "@/components/charts";
import useAuth from "@/hooks/useAuth";
import useLoans from "@/hooks/usePrestamos";
import { clientInterface } from "@/interface/client";

import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Container, Grid, Row, Spacer, Text } from "@nextui-org/react";
import axios from "axios";
import cookieParser from "cookie-parser";
import { GetServerSideProps } from "next";

import Loading from "../components/loading";

type Props = {
  user: any;
  clients: clientInterface[];
};
const API = process.env.NEXT_PUBLIC_API;

export default function Home({ user, clients }: Props) {
  const { setUser } = useAuth();
  const { loading } = useLoans();

  setUser(user);
  if (user == null) {
    return;
  }

  return (
    <div className="blur-in ">
      <Text h1 transform="capitalize" css={{ textAlign: "center" }}>
        <Text span css={{ margin: "$10" }}>
          <FontAwesomeIcon icon={faHome} width={"30px"} />
        </Text>
        Inicio
      </Text>

      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="home-chart">
            <Charts />
          </div>

          <Container>
            <Spacer y={1.6} />

            <Spacer y={1.6} />
            <Row>
              <Container xs>
                <Text h2>Proximos Cobros</Text>

                <Grid.Container gap={2} className={"container_clients"}>
                  {clients ? (
                    clients.map((clients: any) => (
                      <Grid.Container
                        direction="row"
                        gap={2}
                        className="blur-in"
                        key={clients.id}
                      >
                        <Grid xs={12} md>
                          <Card variant="bordered" isPressable isHoverable>
                            <Card.Header
                              css={{ justifyContent: "space-between" }}
                            >
                              <FontAwesomeIcon icon={faUser} width={"20px"} />
                              <Text span>
                                {clients.paymentDate.split("T")[0]}
                              </Text>
                            </Card.Header>

                            <Card.Body css={{ justifyItems: "center" }}>
                              <Text
                                h3
                                transform="capitalize"
                                css={{ textAlign: "center" }}
                              >
                                {clients.client.name}
                              </Text>

                              <Text
                                h3
                                transform="capitalize"
                                css={{ textAlign: "center" }}
                              >
                                $ {clients.amount}
                              </Text>
                            </Card.Body>
                          </Card>
                        </Grid>
                      </Grid.Container>
                    ))
                  ) : (
                    <Text>No Hay Cobros Para Hoy</Text>
                  )}
                </Grid.Container>
              </Container>
            </Row>
          </Container>
        </>
      )}
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  // Parse cookies
  cookieParser(context.req, context.res);

  const { token } = context.req.cookies;

  const config = {
    headers: {
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const [userResponse, clientsResponse] = await Promise.all([
      axios.get(`${API}/user/profile`, config),
      axios.get(`${API}/loan/payment`, config),
    ]);

    const { data: user } = userResponse;
    const { data: clients } = clientsResponse;

    return {
      props: { user, clients },
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
