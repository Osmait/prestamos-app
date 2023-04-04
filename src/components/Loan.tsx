import { Balance } from "./Balance";

import { Card, Collapse, Grid, Spacer, Text } from "@nextui-org/react";

import { loanInterface } from "@/interface/loan";

import { TransactionFrom } from "./TransactionFrom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";

import ModalTabla from "./modalTabla";
import ModalTransaction from "./ModalTransaction";

type Props = {
  loans: loanInterface[];
};

export default function Loan({ loans }: Props) {
  return (
    <Grid.Container gap={2} className={"container_clients"}>
      {loans
        ? loans.map((loan: loanInterface) => (
            <>
              <Grid.Container
                direction="row"
                gap={2}
                className="blur-in"
                key={loan.id}
              >
                <Grid xs={11} md={12}>
                  <Card variant="bordered" isPressable isHoverable>
                    <Card.Header css={{ justifyContent: "space-around" }}>
                      <Text h4>
                        <Text span>
                          <FontAwesomeIcon
                            icon={faMoneyBillTransfer}
                            width={"30px"}
                          />
                        </Text>
                        Prestamos: ${loan.amount.toFixed(2)}
                      </Text>
                    </Card.Header>

                    <Text span size={"$xs"} css={{ marginLeft: "$5" }}>
                      {loan.createAt.split("T")[0]}
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
                    </div>
                    {/* <Collapse.Group>
                      <Collapse title={" Transacciones"} contentLeft>
                        <Transaction loanId={loan.id} />
                      </Collapse>
                    </Collapse.Group> */}

                    <Text css={{ textAlign: "center" }}>
                      <Balance loanId={loan.id} />
                    </Text>
                  </Card>
                </Grid>
              </Grid.Container>
            </>
          ))
        : []}
    </Grid.Container>
  );
}
