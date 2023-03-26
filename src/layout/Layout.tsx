"use client";
import React from "react";
import Head from "next/head";
import {
  Container,
  Card,
  Row,
  Text,
  Navbar,
  Spacer,
  Col,
  Button,
  Grid,
} from "@nextui-org/react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

function Layout({ children }: any) {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar variant={"static"}>
        <Navbar.Content>
          <Navbar.Link hideIn={"xs"} href={"/"}>
            {" "}
            Inicio
          </Navbar.Link>
          <Navbar.Link hideIn={"xs"} href={"/clients"}>
            {" "}
            Cliente
          </Navbar.Link>
          <Navbar.Link hideIn={"xs"}> Analiticas</Navbar.Link>
        </Navbar.Content>

        <Navbar.Brand>
          <Row>
            <Text b h3>
              Prestamos{" "}
              <Text span color="#2529d8">
                {" "}
                SB{" "}
              </Text>
            </Text>
          </Row>
        </Navbar.Brand>

        {!user ? (
          <Navbar.Content>
            <Button rounded size={"xs"} shadow>
              <Link href={"/login"}>
                <Text color="#fff">Login</Text>
              </Link>
            </Button>

            <Button rounded size={"xs"} color={"secondary"} shadow>
              <Link href={"/registra"}>
                <Text color="#fff">Sign Up</Text>
              </Link>
            </Button>
          </Navbar.Content>
        ) : (
          <Button size={"xs"}>Logout</Button>
        )}
      </Navbar>

      <Container justify="center" alignItems="center">
        <Spacer y={1.6} />
        <Card css={{ minHeight: "650px" }} variant="shadow">
          {children}
        </Card>
      </Container>
    </>
  );
}

export default Layout;
