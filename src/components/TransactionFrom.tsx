import useLoans from "@/hooks/usePrestamos";
import { Button, Input, Modal, Spacer, Text } from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

const API = process.env.NEXT_PUBLIC_API;

export const TransactionFrom = ({ loanId }: any) => {
  const { cambio, setCambio } = useLoans();
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState<number>();
  const transactionFrom = useRef<HTMLFormElement>(null);

  const handleSumittransaction = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const transaction = {
      amount,
      loanId,
    };

    const token = Cookies.get("token");
    if (!token) {
      return;
    }

    axios.defaults.headers.Authorization = `Bearer ${token}`;
    await axios.post(`${API}/transaction`, transaction);
    toast.success(" Pago agregado correctamente");
    setCambio(!cambio);
    setAmount(0);
  };
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button rounded auto onPress={handler} size={"sm"} ghost animated>
        Agregar Pago
      </Button>

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header justify="space-between">
          <Text h2>Cuota</Text>
        </Modal.Header>
        <form ref={transactionFrom} onSubmit={handleSumittransaction}>
          <Modal.Body>
            <Input
              label="monto"
              name="amount"
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Monto"
              onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button auto onPress={closeHandler} type={"submit"}>
              Add
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};
