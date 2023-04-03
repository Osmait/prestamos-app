import { Button, Table, Text } from "@nextui-org/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import dayjs from "dayjs";
import React from "react";
import { PdfTable } from "./PdfTable";

export const InterestTable = ({ amount, interest, date, tiempo }: any) => {
  const pagos = Array(tiempo).fill(0);
  let now = dayjs(date);

  for (let i = 0; i < pagos.length; i++) {
    pagos[i] = (amount * interest) / tiempo;
  }
  let amountInterest = amount * interest;

  return (
    <>
      <Table
        aria-label="Example static collection table"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
        selectionMode="single"
      >
        <Table.Header>
          <Table.Column>Fecha</Table.Column>
          <Table.Column>Pagos</Table.Column>
          <Table.Column>Balance</Table.Column>
        </Table.Header>
        <Table.Body>
          {pagos &&
            pagos.map((pago: number, i) => (
              <Table.Row key={i}>
                <Table.Cell>
                  {
                    now
                      .add(1 + i, "month")
                      .toISOString()
                      .split("T")[0]
                  }
                </Table.Cell>
                <Table.Cell>{pago.toFixed(2)}</Table.Cell>
                <Table.Cell>{(amountInterest -= pago).toFixed(2)}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <Text h3> Total: ${amount * interest}</Text>
      <Text h3> Ganancias: ${amount * interest - amount}</Text>

      <PDFDownloadLink
        document={
          <PdfTable
            amount={amount}
            interest={interest}
            date={date}
            tiempo={tiempo}
          />
        }
        fileName="Tabla-Pagos.pdf"
      >
        <Button auto>Descargar</Button>
      </PDFDownloadLink>
    </>
  );
};
