import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";

import { Text } from "@nextui-org/react";
import { balanceInterface } from "@/interface/balance";
import useLoans from "@/hooks/usePrestamos";
import Loading from "./loading";

type Props = {
  loanId: number;
};

export const Balance = ({ loanId }: Props) => {
  const { cambio } = useLoans();
  const [balances, setBalaces] = useState<balanceInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getLoan = async () => {
      setLoading(true);
      const token = Cookie.get("token");
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: balance } = await axios.get(
        `http://localhost:8080/loan/balance/${loanId}`
      );

      setBalaces(balance);
      setLoading(false);
    };
    getLoan();
  }, [loanId, cambio]);

  if (loading) return <Loading />;

  return (
    <div>
      {balances.length !== 0 ? (
        balances.map((balance: balanceInterface) => (
          <>
            <Text h3>Balance: ${balance.amount}</Text>
          </>
        ))
      ) : (
        <Text h3> No hay pagos Realizados..</Text>
      )}
    </div>
  );
};
