import useLoans from "@/hooks/usePrestamos";
import { clientInterface } from "@/interface/client";

import { Button, Dropdown, Modal } from "@nextui-org/react";

import { useState } from "react";
import { ClientFrom } from "./ClientFrom";
import { LoanFrom } from "./LoanFrom";
import { TransactionFrom } from "./TransactionFrom";

type Props = {
  clients: clientInterface[];
};

export const ModalAdd = ({ clients }: Props) => {
  const [type, setType] = useState(null);
  const [visible, setVisible] = useState(false);
  const [client, setClient] = useState(null);

  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button auto shadow onPress={handler}>
        Agregar
      </Button>
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
              <Dropdown.Item key="Pagos">Pagos</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {type == "Prestamo" && (
            <Dropdown>
              <Dropdown.Button flat>{client}</Dropdown.Button>
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

        {/* Pagos Form */}
        {type === "Pagos" && <TransactionFrom closeHandler={closeHandler} />}
      </Modal>
    </div>
  );
};
