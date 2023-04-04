import React from "react";
import { Modal, Button, Text } from "@nextui-org/react";

import { Transaction } from "./Transaction";
import { loanInterface } from "@/interface/loan";
type Props = {
  loan: loanInterface;
};

export default function ModalTransaction({ loan }: Props) {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button
        auto
        onPress={handler}
        rounded
        size={"sm"}
        ghost
        animated
        // css={{ margin: "auto", marginTop: "$10" }}
      >
        Transacciones
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Tabla de Transacciones
          </Text>
        </Modal.Header>

        <Modal.Body>
          <Transaction loanId={loan.id} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
