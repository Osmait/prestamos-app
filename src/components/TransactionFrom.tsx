import useLoans from "@/hooks/usePrestamos";
import { Button, Input, Modal } from "@nextui-org/react";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useRef, useState } from "react";

export const TransactionFrom = ({ loanId }: any) => {
  const { cambio, setCambio } = useLoans();

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
    await axios.post(`http://localhost:8080/transaction`, transaction);
    setCambio(!cambio);
    setAmount(0);
  };

  return (
    <form ref={transactionFrom} onSubmit={handleSumittransaction}>
      <Modal.Body>
        <Input
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
        <Button auto type={"submit"}>
          Add
        </Button>
      </Modal.Footer>
    </form>
  );
};
