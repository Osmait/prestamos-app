import { Charts } from "@/components/charts";
import useAuth from "@/hooks/useAuth";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Container, Grid, Row, Spacer, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { user, cargando } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      if (cargando) {
        router.push("/login");
      }
    }
  }, [router, user, cargando]);

  return (
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
  );
}
