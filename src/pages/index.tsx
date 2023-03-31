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
          <Text h2>Prestamos Por Cobrar a La Fecha</Text>
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
