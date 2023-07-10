import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";

import { Text } from "@nextui-org/react";
import { balanceInterface } from "@/interface/balance";
import useLoans from "@/hooks/usePrestamos";
import Loading from "./loading";
import { match } from "assert";

type Props = {
  loanId: number;
};
const API = process.env.NEXT_PUBLIC_API;

export const Balance = ({ loanId }: Props) => {
  const { cambio } = useLoans();
  const [balances, setBalaces] = useState<balanceInterface>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getLoan = async () => {
      setLoading(true);
      const token = Cookie.get("token");
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: balance } = await axios.get(
        `${API}/loan/balance/${loanId}`
      );

      setBalaces(balance);
      setLoading(false);
    };
    getLoan();
  }, [loanId, cambio]);

  if (loading) return <Loading />;

  return (
    <>
      {balances ? (
        <Text
          key={Number(balances.id)}
          h3
          color={balances.amount < 0 ? "success" : "error"}
        >
          {balances.amount < 0
            ? `Ganancia:  + $ ${Math.abs(balances.amount)}`
            : ` Balance: $ ${balances.amount}`}
        </Text>
      ) : (
        <Text h3> No hay pagos Realizados..</Text>
      )}
    </>
  );
};
