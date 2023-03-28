"use client";

import { Charts } from "@/components/charts";
import useAuth from "@/hooks/useAuth";
import {
  Button,
  Card,
  Container,
  Grid,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";

export default function Home() {
  const { user } = useAuth();
  if (user == null) {
    return "No autorizado";
  }

  return (
    <Container className="blur-in ">
      <Row
        css={{
          maxSize: "100vh",
          marginInline: "auto",
        }}
        justify="center"
        align="center"
      >
        <Charts />
      </Row>
      <Spacer y={1.6} />
      <Row>
        <Container xs>
          <Text h1>Prestamos de Hoy</Text>
          <Grid.Container justify="center" direction="column" gap={4}>
            <Card>
              <Card.Body>
                <Text>Client1</Text>
              </Card.Body>
            </Card>
            <Spacer y={1.6} />
            <Card>
              <Card.Body>
                <Text>Client1</Text>
              </Card.Body>
            </Card>
            <Spacer y={1.6} />
            <Card>
              <Card.Body>
                <Text>Client1</Text>
              </Card.Body>
            </Card>
            <Spacer y={1.6} />
            <Card>
              <Card.Body>
                <Text>Client1</Text>
              </Card.Body>
            </Card>
            <Spacer y={1} />
          </Grid.Container>
        </Container>
      </Row>
    </Container>
  );
}
