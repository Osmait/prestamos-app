import { Charts } from "@/components/charts";
import useAuth from "@/hooks/useAuth";
import useLoans from "@/hooks/usePrestamos";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Container, Grid, Row, Spacer, Text } from "@nextui-org/react";
import axios from "axios";
import cookieParser from "cookie-parser";
import { GetServerSideProps } from "next";

import Loading from "../components/loading";

export default function Home({ user }: any) {
  const { setUser } = useAuth();
  const { loading } = useLoans();

  setUser(user);
  if (user == null) {
    return;
  }

  return (
    <>
      <Text h1 transform="capitalize" css={{ textAlign: "center" }}>
        Inicio
      </Text>

      {loading ? (
        <Loading />
      ) : (
        <Container className="blur-in ">
          <Spacer y={1.6} />
          <div className="home-chart">
            <Charts />
          </div>

          <Spacer y={1.6} />
          <Row>
            <Container xs>
              <Text h2>Prestamos Por Cobrar a La Fecha</Text>

              <Grid.Container gap={2} className={"container_clients"}>
                <Grid.Container direction="row" gap={2} className="blur-in">
                  <Grid xs={12} md>
                    <Card variant="bordered" isPressable isHoverable>
                      <Card.Header>
                        <FontAwesomeIcon icon={faUser} width={"20px"} />
                      </Card.Header>

                      <Card.Body css={{ justifyItems: "center" }}>
                        <Text
                          h3
                          transform="capitalize"
                          css={{ textAlign: "center" }}
                        >
                          Clien1
                        </Text>
                        <Text
                          h3
                          transform="capitalize"
                          css={{ textAlign: "center" }}
                        ></Text>
                      </Card.Body>
                    </Card>
                  </Grid>
                </Grid.Container>

                {/* client2 */}

                <Grid.Container direction="row" gap={2} className="blur-in">
                  <Grid xs={12} md>
                    <Card variant="bordered" isPressable isHoverable>
                      <Card.Header>
                        <FontAwesomeIcon icon={faUser} width={"20px"} />
                      </Card.Header>

                      <Card.Body css={{ justifyItems: "center" }}>
                        <Text
                          h3
                          transform="capitalize"
                          css={{ textAlign: "center" }}
                        >
                          Clien1
                        </Text>
                        <Text
                          h3
                          transform="capitalize"
                          css={{ textAlign: "center" }}
                        ></Text>
                      </Card.Body>
                    </Card>
                  </Grid>
                </Grid.Container>

                {/* Client 3 */}

                <Grid.Container direction="row" gap={2} className="blur-in">
                  <Grid xs={12} md>
                    <Card variant="bordered" isPressable isHoverable>
                      <Card.Header>
                        <FontAwesomeIcon icon={faUser} width={"20px"} />
                      </Card.Header>

                      <Card.Body css={{ justifyItems: "center" }}>
                        <Text
                          h3
                          transform="capitalize"
                          css={{ textAlign: "center" }}
                        >
                          Clien1
                        </Text>
                        <Text
                          h3
                          transform="capitalize"
                          css={{ textAlign: "center" }}
                        ></Text>
                      </Card.Body>
                    </Card>
                  </Grid>
                </Grid.Container>
                {/* Client 4 */}

                <Grid.Container direction="row" gap={2} className="blur-in">
                  <Grid xs={12} md>
                    <Card variant="bordered" isPressable isHoverable>
                      <Card.Header>
                        <FontAwesomeIcon icon={faUser} width={"20px"} />
                      </Card.Header>

                      <Card.Body css={{ justifyItems: "center" }}>
                        <Text
                          h3
                          transform="capitalize"
                          css={{ textAlign: "center" }}
                        >
                          Clien1
                        </Text>
                        <Text
                          h3
                          transform="capitalize"
                          css={{ textAlign: "center" }}
                        ></Text>
                      </Card.Body>
                    </Card>
                  </Grid>
                </Grid.Container>
              </Grid.Container>
            </Container>
          </Row>
        </Container>
      )}
    </>
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
    const { data: user } = await axios.get(
      "http://localhost:8080/user/profile",
      config
    );
    return {
      props: { user },
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
