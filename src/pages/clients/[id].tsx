import Loan from "@/components/Loan";
import cookieParser from "cookie-parser";
import { GetServerSideProps } from "next";
import { Text } from "@nextui-org/react";

import React from "react";
import { getLoan } from "../api/loan";
import { loanInterface } from "@/interface/loan";

type Props = {
  loans: loanInterface[];
};

export default function LoanPage({ loans }: Props) {
  return loans.length > 0 ? (
    <Loan loans={loans} />
  ) : (
    <>
      <Text transform="capitalize" css={{ textAlign: "center" }} h2>
        No hay Prestamos Activos...
      </Text>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  // Parse cookies
  cookieParser(context.req, context.res);
  const {
    query: { id },
  } = context;

  const cookies = context.req.cookies;

  const loans = await getLoan(cookies.token!, id);

  return {
    props: { loans },
  };
};
