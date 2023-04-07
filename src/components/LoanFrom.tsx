import useLoans from "@/hooks/usePrestamos";
import { loanIPostnterface } from "@/interface/loan";
import { postLoan } from "@/pages/api/loan";
import { Button, Input, Modal, Text } from "@nextui-org/react";

import dayjs, { Dayjs } from "dayjs";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "sonner";
import { Error } from "./Error";
import { InterestTable } from "./InterestTable";

export const LoanFrom = ({ closeHandler, client }: any) => {
  const { setError, error } = useLoans();

  const [tabla, setTabla] = useState(false);
  const [amount, setAmount] = useState<number>();
  const [interest, setInterest] = useState<number>();
  const [tiempo, setTiempo] = useState<number>();

  const [PaymentDate, setPaymentDate] = useState<
    string | number | Date | Dayjs | null | undefined
  >();
  const router = useRouter();
  const handleSumitLoan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount || !PaymentDate || !client || !interest || !tiempo) {
      toast.error("Monto, Interes, Fecha y cliente son necesarios ");
      setError({
        error: true,
        message: "Monto, Interes, Fecha y cliente son necesarios ",
      });

      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }

    const data: loanIPostnterface = {
      amount,
      paymentDate: dayjs(PaymentDate).toISOString(),
      interest: interest,
      amountOfPayments: tiempo,
      clientId: parseInt(client),
    };
    const token = Cookies.get("token");
    if (!token) {
      return;
    }

    try {
      await postLoan(token, data);
      toast.success(" Prestamo agregado correctamente");
      router.push("/clients");
    } catch (error) {
      setError({
        error: true,
        message: "Error Al Crear el Prestamos",
      });
    }
  };

  return (
    <form onSubmit={handleSumitLoan}>
      <Modal.Body>
        {error && (
          <Error>
            <Text>{error.message}</Text>
          </Error>
        )}

        <Input
          label="Amount"
          name="amount"
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Monto"
          onChange={(e) => {
            setError(null);
            setAmount(parseFloat(e.target.value));
          }}
        />
        <Input
          label="Interes "
          name="interes"
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Interes"
          onChange={(e) => {
            setError(null);
            setInterest(parseFloat(e.target.value));
          }}
        />

        <Input
          label="Tiempo "
          name="tiempo"
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Tiempo"
          onChange={(e) => {
            setError(null);
            setTiempo(parseInt(e.target.value));
          }}
        />

        <Input
          label="Fecha de Pago"
          type={"date"}
          name="Date"
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Fecha"
          onChange={(e) => {
            setError(null);
            setPaymentDate(e.target.value);
          }}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button auto flat color="error" onPress={closeHandler}>
          Cerrar
        </Button>
        <Button auto type="submit">
          Agregar
        </Button>

        <Button auto onPress={() => setTabla(!tabla)}>
          Ver Tabla de Pagos
        </Button>
      </Modal.Footer>
      {tabla && interest && PaymentDate && amount && tiempo && (
        <InterestTable
          amount={amount}
          interest={interest}
          date={PaymentDate}
          tiempo={tiempo}
        />
      )}
    </form>
  );
};
