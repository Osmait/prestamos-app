"use client";
import React, { use } from "react";
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
  Avatar,
  User,
} from "@nextui-org/react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMoneyBillTransfer,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  children: JSX.Element;
};

function Layout({ children }: Props) {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar variant={"floating"} maxWidth={"fluid"} isBordered>
        {user && (
          <>
            <Navbar.Content>
              <User
                src={`https://ui-avatars.com/api/?name=${user.name}+${user.lastName}`}
                name={user?.name}
                bordered
                color="primary"
              />
              <Link href={"/"}>
                <Text>
                  <FontAwesomeIcon icon={faHome} width={"20px"} />
                  <Text span hideIn={"xs"}>
                    {" "}
                    Inicio
                  </Text>
                </Text>
              </Link>
              <Link href={"/clients"}>
                <Text>
                  <FontAwesomeIcon icon={faUsers} width={"20px"} />
                  <Text span hideIn={"xs"}>
                    Cliente
                  </Text>
                </Text>
              </Link>
            </Navbar.Content>
            <Navbar.Brand>
              <Row>
                <Text hideIn={"md"} b h3>
                  Prestamos{" "}
                  <Text span color="#2529d8">
                    {" "}
                    SB{" "}
                  </Text>
                </Text>
              </Row>
            </Navbar.Brand>
          </>
        )}

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
