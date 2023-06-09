import useLoans from "@/hooks/usePrestamos";
import { clientInterface } from "@/interface/client";
import Loading from "@/components/loading";

import { Button, Dropdown, Modal } from "@nextui-org/react";
import { useRouter } from "next/router";

import { useState } from "react";
import { ClientFrom } from "./ClientFrom";
import { LoanFrom } from "./LoanFrom";
import { TransactionFrom } from "./TransactionFrom";

type Props = {
  clients: clientInterface[];
};

export const ModalAdd = ({ clients }: Props) => {
  const router = useRouter();
  const { loading } = useLoans();
  const [type, setType] = useState("Client");
  const [visible, setVisible] = useState(true);
  const [client, setClient] = useState<number | undefined>();

  const closeHandler = () => {
    setVisible(false);
    router.push("/clients");
  };
  const getName = () => {
    const filtro = clients.filter((clientd) => clientd.id == client);
    if (filtro.length <= 0) {
      return "Clientes";
    }

    return filtro[0].name;
  };
  if (loading) return <Loading />;

  return (
    <div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header justify="space-between">
          <Dropdown>
            <Dropdown.Button flat>{type ? type : "Tipo"}</Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              onSelectionChange={(key: any) => setType(key.currentKey)}
            >
              <Dropdown.Item key="Client">Cliente</Dropdown.Item>
              <Dropdown.Item key="Prestamo">Prestamo</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {type == "Prestamo" && (
            <Dropdown>
              <Dropdown.Button flat>{getName()}</Dropdown.Button>
              <Dropdown.Menu
                aria-label="Single selection actions"
                color="secondary"
                disallowEmptySelection
                selectionMode="single"
                onSelectionChange={(key: any) => setClient(key.currentKey)}
              >
                {clients &&
                  clients.map((client: clientInterface) => (
                    <Dropdown.Item key={client.id}>{client.name}</Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Modal.Header>

        {/* Client Form */}
        {type === "Client" && <ClientFrom closeHandler={closeHandler} />}

        {/* Prestamo  From*/}
        {type === "Prestamo" && (
          <LoanFrom client={client} closeHandler={closeHandler} />
        )}
      </Modal>
    </div>
  );
};
