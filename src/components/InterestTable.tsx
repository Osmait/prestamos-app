import { payments, profits } from "@/utils/interresUtils";
import { Button, Table, Text } from "@nextui-org/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import dayjs from "dayjs";
import React from "react";
import { PdfTable } from "./PdfTable";

export const InterestTable = ({ amount, interest, date, tiempo }: any) => {
  let now = dayjs(date);

  const interesFinal = interest / 100 + 1;

  const paymenst = payments(tiempo, amount, interesFinal);

  let amountInterest = amount * interesFinal;

  const profit = profits(amount, interesFinal);

  const total = amount * interesFinal;

  return (
    <>
      <Table
        aria-label="Example static collection table"
        bordered
        shadow={false}
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
          {paymenst &&
            paymenst.map((pago: number, i) => {
              now = now.add(15, "days");
              return (
                <Table.Row key={i}>
                  <Table.Cell>{now.toISOString().split("T")[0]}</Table.Cell>
                  <Table.Cell>{pago.toFixed(2)}</Table.Cell>
                  <Table.Cell>{(amountInterest -= pago).toFixed(2)}</Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
      <Text h3> Total: ${total}</Text>
      <Text h3> Interes Generados: ${profit}</Text>

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
