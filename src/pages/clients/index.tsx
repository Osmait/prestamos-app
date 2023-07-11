import { Button, Card, Grid, Row, Text } from "@nextui-org/react";

import { clientInterface } from "@/interface/client";

import Link from "next/link";
import cookieParser from "cookie-parser";
import { deleteClients, getClients } from "../api/client";
import { GetServerSideProps } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons";

import useLoans from "@/hooks/usePrestamos";
import Loading from "../../components/loading";

import { ModalImage } from "@/components/ModalImage";
import Cookies from "js-cookie";
import { useState } from "react";
import { toast } from "sonner";
import { DropDown } from "@/components/DropDown";

type Props = {
  clients: clientInterface[];
};

export default function Clients({ clients }: Props) {
  const [listClients, setListClients] = useState(clients);

  function handleImage(imagen: any) {
    const link = document.createElement("a");
    link.target = "_blank";
    link.download = "imagen.jpg";
    link.href = imagen;
    link.click();
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Esta Seguro que desea eliminar este Cliente")) return;
    const token = Cookies.get("token");
    if (!token) {
      return;
    }
    try {
      await deleteClients(token, id);
      const newclientList = listClients.filter((client) => client.id != id);
      toast.success("Eliminado Correctamente");
      setListClients(newclientList);
    } catch (error) {
      toast.error("Error al ELiminar");
    }
  };

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

          <Grid.Container gap={2} className="container_clients blur-in">
            {listClients
              ? listClients.map((client: clientInterface) => (
                  <>
                    <Grid xs={11} md={12}>
                      <Card variant="bordered" isPressable isHoverable>
                        <Card.Header css={{ justifyContent: "space-between" }}>
                          <FontAwesomeIcon icon={faUser} width={"20px"} />
                          <DropDown
                            handleDelete={handleDelete}
                            id={client.id}
                          />
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
                          </Card.Body>
                          <Text
                            h3
                            transform="capitalize"
                            css={{ textAlign: "center" }}
                          >
                            <Text>Ver Prestamos</Text>
                          </Text>
                        </Link>
                        <Card.Footer css={{ justifyContent: "space-between" }}>
                          {!client.img ? (
                            <ModalImage Id={client.id} />
                          ) : (
                            <Button
                              animated
                              onPress={() => handleImage(client.img)}
                            >
                              Ver Cedula
                            </Button>
                          )}
                        </Card.Footer>
                      </Card>
                    </Grid>
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
