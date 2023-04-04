import React from "react";
import { Modal, Button, Text } from "@nextui-org/react";
import { InterestTable } from "./InterestTable";
import { loanInterface } from "@/interface/loan";
type Props = {
  loan: loanInterface;
};

export default function ModalTabla({ loan }: Props) {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button auto onPress={handler} rounded size={"sm"} ghost animated>
        Tabla De Pagos
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Tabla De Pagos
          </Text>
        </Modal.Header>

        <Modal.Body>
          <InterestTable
            amount={loan.amount}
            interest={loan.interest}
            date={loan.paymentDate}
            tiempo={loan.amountOfPayments}
          />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
