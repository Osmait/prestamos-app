import { Balance } from "./Balance";

import { Card, Grid, Text, Tooltip, Button } from "@nextui-org/react";

import { loanInterface } from "@/interface/loan";

import { TransactionFrom } from "./TransactionFrom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";

import ModalTabla from "./modalTabla";
import ModalTransaction from "./ModalTransaction";
import { deleteLoan } from "@/pages/api/loan";
import Cookies from "js-cookie";

import { useState } from "react";
import { toast } from "sonner";
import { DropDown } from "./DropDown";

type Props = {
  loans: loanInterface[];
};

export default function Loan({ loans }: Props) {
  const [listLoan, setListLoan] = useState(loans);

  // const [filter, setFilter] = useState(true);
  const handleDelete = async (id: number) => {
    const token = Cookies.get("token");
    if (!token) {
      return;
    }
    try {
      await deleteLoan(token, id);
      const newLoanList = listLoan.filter((loan) => loan.id != id);
      toast.success("Eliminado Correctamente");
      setListLoan(newLoanList);
    } catch (error) {
      toast.error("Error al ELiminar");
    }
  };

  return (
    <Grid.Container
      gap={2}
      className="container_clients container_clients"
      direction="row"
    >
      {listLoan
        ? listLoan.map((loan: loanInterface) => (
            <Grid xs={11} md={12} key={loan.id}>
              <Card variant="bordered" isPressable isHoverable>
                <Card.Header css={{ justifyContent: "space-between" }}>
                  <Text h4>
                    <Text span>
                      <FontAwesomeIcon
                        icon={faMoneyBillTransfer}
                        width={"30px"}
                      />
                    </Text>
                    Prestamos: ${loan.amount.toFixed(2)}
                  </Text>

                  <DropDown handleDelete={handleDelete} id={loan.id} />
                </Card.Header>

                <Text span size={"$xs"} css={{ marginLeft: "$5" }}>
                  {loan.CreateAt[2]}-{loan.CreateAt[1]}-{loan.CreateAt[0]}
                </Text>

                <div
                  style={{
                    margin: 10,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 15,
                  }}
                >
                  <TransactionFrom loanId={loan.id} />
                  <ModalTabla loan={loan} />
                  <ModalTransaction loan={loan} />
                  <Tooltip
                    content={
                      loan.isPaid ? "Prestamos Pago " : "Prestamo en proceso"
                    }
                    rounded
                    color="primary"
                  >
                    <Button auto color={loan.isPaid ? "success" : "primary"}>
                      {loan.isPaid ? "Pago" : "Proceso..."}
                    </Button>
                  </Tooltip>
                </div>

                <Text css={{ textAlign: "center" }}>
                  <Balance loanId={loan.id} />
                </Text>
              </Card>
            </Grid>
          ))
        : []}
    </Grid.Container>
  );
}
