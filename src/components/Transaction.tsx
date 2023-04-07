import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";

import { Button, Row, Table, Text } from "@nextui-org/react";
import { transactionInterface } from "@/interface/transaction";
import useLoans from "@/hooks/usePrestamos";
import Loading from "@/components/loading";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteTransaction } from "@/pages/api/transactions";
import { toast } from "sonner";

type Props = {
  loanId: number;
};
const API = process.env.NEXT_PUBLIC_API;

export const Transaction = ({ loanId }: Props) => {
  const { cambio, setCambio } = useLoans();
  const [loading, setLoading] = useState<boolean>(false);

  const [transactions, setTransaction] = useState<transactionInterface[]>([]);

  useEffect(() => {
    setLoading(true);
    const getLoan = async () => {
      const token = Cookie.get("token");
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: listTransaction } = await axios.get(
        `${API}/transaction/${loanId}`
      );

      setTransaction(listTransaction);
      setLoading(false);
    };
    getLoan();
  }, [loanId, cambio]);

  const handleDelete = (id: number) => {
    console.log(id);

    const token = Cookies.get("token");
    if (!token) {
      return;
    }
    try {
      deleteTransaction(token, id);
      toast.success("Eliminado Correctamente");
      setCambio(!cambio);
    } catch (error) {
      toast.error("Error al Eliminar");

      console.log(error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <Table
        aria-label="Example table with static content"
        bordered
        shadow={false}
        selectionMode="single"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          <Table.Column>Indice</Table.Column>

          <Table.Column>Pagos</Table.Column>
          <Table.Column>Fecha</Table.Column>
          <Table.Column>{""}</Table.Column>
        </Table.Header>
        <Table.Body>
          {transactions
            ? transactions.map((transaction: transactionInterface, index) => (
                <Table.Row key={transaction.id}>
                  <Table.Cell> {index + 1}</Table.Cell>
                  <Table.Cell>${transaction.amount}</Table.Cell>
                  <Table.Cell css={{ justifyContent: "space-between" }}>
                    {transaction.createAt.split("T")[0]}
                  </Table.Cell>
                  <Table.Cell>
                    <FontAwesomeIcon
                      icon={faXmark}
                      width={"20px"}
                      color={"#ff0000"}
                      onClick={() => handleDelete(transaction.id)}
                    />
                  </Table.Cell>
                </Table.Row>
              ))
            : []}
        </Table.Body>
      </Table>
    </div>
  );
};
