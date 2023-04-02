import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";

import { Row, Text } from "@nextui-org/react";
import { transactionInterface } from "@/interface/transaction";
import useLoans from "@/hooks/usePrestamos";
import Loading from "@/components/loading";

type Props = {
  loanId: number;
};
const API = process.env.NEXT_PUBLIC_API;

export const Transaction = ({ loanId }: Props) => {
  const { cambio } = useLoans();
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

  if (loading) return <Loading />;

  return (
    <div>
      {transactions
        ? transactions.map((transaction: transactionInterface, index) => (
            <Row key={transaction.id} justify={"space-between"}>
              <Text>
                {" "}
                {index + 1} - ${transaction.amount}
              </Text>
              <Text>{transaction.createAt.split("T")[0]}</Text>
            </Row>
          ))
        : []}
    </div>
  );
};
