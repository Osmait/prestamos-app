import useLoans from "@/hooks/usePrestamos";
import { loanIPostnterface } from "@/interface/loan";
import { postLoan } from "@/pages/api/loan";
import { Button, Input, Modal } from "@nextui-org/react";
import dayjs, { Dayjs } from "dayjs";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

export const LoanFrom = ({ closeHandler, client }: any) => {
  const [amount, setAmount] = useState<number>();
  const [PaymentDate, setPaymentDate] = useState<
    string | number | Date | Dayjs | null | undefined
  >();
  const router = useRouter();
  const handleSumitLoan = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount || !PaymentDate) return;

    const data: loanIPostnterface = {
      amount,
      paymentDate: dayjs(PaymentDate).toISOString(),
      clientId: parseInt(client!),
    };
    const token = Cookies.get("token");
    if (!token) {
      return;
    }
    console.log(data);

    postLoan(token, data);

    router.push("/clients");
  };

  return (
    <form onSubmit={handleSumitLoan}>
      <Modal.Body>
        <Input
          label="Amount"
          name="amount"
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Monto"
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <Input
          label="Fecha"
          type={"date"}
          name="Date"
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Fecha"
          onChange={(e) => setPaymentDate(e.target.value)}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button auto flat color="error" onPress={closeHandler}>
          Close
        </Button>
        <Button auto type="submit">
          Add
        </Button>
      </Modal.Footer>
    </form>
  );
};
