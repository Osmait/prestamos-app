import { Balance } from "./Balance";

import { Card, Collapse, Grid, Spacer, Text } from "@nextui-org/react";
import { Transaction } from "./Transaction";
import { loanInterface } from "@/interface/loan";

import { TransactionFrom } from "./TransactionFrom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";

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
                <Grid xs={12} md>
                  <Card variant="bordered" isPressable isHoverable>
                    <Card.Header css={{ justifyContent: "space-between" }}>
                      <Text h3>
                        <Text span css={{ margin: "$5" }}>
                          <FontAwesomeIcon
                            icon={faMoneyBillTransfer}
                            width={"30px"}
                          />
                        </Text>
                        Prestamos: ${loan.amount.toFixed(2)}
                      </Text>
                      <Text span>{loan.createAt.split("T")[0]}</Text>
                    </Card.Header>
                    <Spacer y={0.5} />
                    <TransactionFrom loanId={loan.id} />
                    <Collapse.Group>
                      <Collapse title={" Transacciones"} contentLeft>
                        <Transaction loanId={loan.id} />
                      </Collapse>
                    </Collapse.Group>
                    <Spacer y={1.6} />
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
