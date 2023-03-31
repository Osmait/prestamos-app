import useLoans from "@/hooks/usePrestamos";
import { loanIPostnterface } from "@/interface/loan";
import { postLoan } from "@/pages/api/loan";
import { Button, Input, Modal } from "@nextui-org/react";
import Cookies from "js-cookie";
import React, { useRef, useState } from "react";

export const LoanFrom = ({ closeHandler, client }: any) => {
  const { setCambio, cambio } = useLoans();

  const [amount, setAmount] = useState<number>();

  const handleSumitLoan = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!amount) return;

    const data: loanIPostnterface = {
      amount,
      clientId: parseInt(client!),
    };
    const token = Cookies.get("token");
    if (!token) {
      return;
    }

    postLoan(token, data);
    setCambio(!cambio);
  };

  return (
    <form onSubmit={handleSumitLoan}>
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
        <Button auto flat color="error" onPress={closeHandler}>
          Close
        </Button>
        <Button auto onPress={closeHandler} type={"submit"}>
          Add
        </Button>
      </Modal.Footer>
    </form>
  );
};
