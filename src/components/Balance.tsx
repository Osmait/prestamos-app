import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";

import { Text } from "@nextui-org/react";
import { balanceInterface } from "@/interface/balance";

type Props = {
  loanId: number;
};

export const Balance = ({ loanId }: Props) => {
  const [balances, setBalaces] = useState<balanceInterface[]>([]);

  useEffect(() => {
    const getLoan = async () => {
      const token = Cookie.get("token");
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: balance } = await axios.get(
        `http://localhost:8080/loan/balance/${loanId}`
      );

      setBalaces(balance);
    };
    getLoan();
  }, [loanId]);

  return (
    <div>
      {balances.map((balance: balanceInterface) => (
        <>
          <Text h3>Balance: ${balance.amount.toFixed(2)}</Text>
        </>
      ))}
    </div>
  );
};