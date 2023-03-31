import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { Balance } from "./Balance";

import { Collapse, Text } from "@nextui-org/react";
import { Transaction } from "./Transaction";
import { loanInterface } from "@/interface/loan";
import useLoans from "@/hooks/usePrestamos";
import { ModalAdd } from "./ModalAdd";
import { TransactionFrom } from "./TransactionFrom";

type Props = {
  clientId: number;
};

export default function Loan({ clientId }: Props) {
  const { cambio } = useLoans();
  const [loans, setLoans] = useState<loanInterface[]>();

  useEffect(() => {
    const getLoan = async () => {
      const token = Cookie.get("token");
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: listLoans } = await axios.get(
        `http://localhost:8080/loan/${clientId}`
      );

      setLoans(listLoans);
    };
    getLoan();
  }, [clientId, cambio]);

  return (
    <Collapse.Group>
      {loans
        ? loans.map((loan: loanInterface) => (
            <>
              <Collapse
                title={`Prestamo: ${loan.amount.toFixed(2)}`}
                subtitle={`fecha: ${loan.createAt.split("T")[0]}`}
                shadow
              >
                <TransactionFrom loanId={loan.id} />
                <Transaction loanId={loan.id} />
              </Collapse>

              <Text>
                <Balance loanId={loan.id} />
              </Text>
            </>
          ))
        : []}
    </Collapse.Group>
  );
}
