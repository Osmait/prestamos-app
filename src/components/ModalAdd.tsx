import { clientInterface } from "@/interface/client";
import { postClients } from "@/pages/api/client";
import { Button, Dropdown, Input, Modal, Spacer } from "@nextui-org/react";
import Cookies from "js-cookie";
import { useRef, useState } from "react";

type Props = {
  clients: clientInterface[];
};

export const ModalAdd = ({ clients }: Props) => {
  const clienFrom = useRef<HTMLFormElement>(null);
  const [type, setType] = useState(null);
  const [visible, setVisible] = useState(false);
  const [client, setClient] = useState(null);

  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!clienFrom.current) {
      return "Error";
    }
    const formData = new FormData(clienFrom.current);

    const data: clientInterface = {
      name: formData.get("name") as String,
      lastName: formData.get("lastName") as String,
    };

    if (formData.get("email")) {
      data.email = formData.get("email") as String;
    }
    if (formData.get("phoneNumber")) {
      data.phoneNumber = formData.get("phoneNumber") as String;
    }

    const token = Cookies.get("token");
    if (!token) {
      return;
    }
    postClients(token, data);
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
        {type === "Client" && (
          <form ref={clienFrom} onSubmit={handleSubmit}>
            <Modal.Body>
              <Input
                name="name"
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Nombre"
              />
              <Spacer y={1} />
              <Input
                name="lastName"
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Apellido"
              />
              <Spacer y={1} />

              <Input
                name="email"
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="email"
              />
              <Spacer y={1} />
              <Input
                name="phoneNumber"
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Telefono"
              />
              <Spacer y={1} />
            </Modal.Body>

            <Modal.Footer>
              <Button auto flat color="error" onPress={closeHandler}>
                Close
              </Button>
              <Button auto onPress={closeHandler} type={"submit"}>
                Add
              </Button>
            </Modal.Footer>
          </form>
        )}

        {/* Prestamo  From*/}
        {type === "Prestamo" && (
          <Modal.Body>
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Monto"
            />
          </Modal.Body>
        )}

        {/* Pagos Form */}
        {type === "Pagos" && (
          <Modal.Body>
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Monto"
            />
          </Modal.Body>
        )}
      </Modal>
    </div>
  );
};
