import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";

import { Row, Text } from "@nextui-org/react";
import { transactionInterface } from "@/interface/transaction";

type Props = {
  loanId: number;
};

export const Transaction = ({ loanId }: Props) => {
  const [transactions, setTransaction] = useState<transactionInterface[]>([]);

  useEffect(() => {
    const getLoan = async () => {
      const token = Cookie.get("token");
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: listTransaction } = await axios.get(
        `http://localhost:8080/transaction/${loanId}`
      );

      setTransaction(listTransaction);
    };
    getLoan();
  }, [loanId]);

  return (
    <div>
      {transactions
        ? transactions.map((transaction: transactionInterface, index) => (
            <Row key={transaction.id} justify={"space-between"}>
              <Text>
                {" "}
                {index + 1} - ${transaction.amount.toFixed(2)}
              </Text>
              <Text>{transaction.createAt.split("T")[0]}</Text>
            </Row>
          ))
        : []}
    </div>
  );
};