import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { GetServerSideProps } from "next";
import cookieParser from "cookie-parser";
import { getLoans } from "@/pages/api/loan";

export const ListLoan = ({ clientID }: any) => {
  const [loans, setLoans] = useState([]);
  useEffect(() => {
    getLoans();
  }, [clientID]);

  return <div>{clientID}</div>;
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  // Parse cookies
  cookieParser(context.req, context.res);

  const cookies = context.req.cookies;

  axios.defaults.headers.Authorization = `Bearer ${cookies.token!}`;

  const { data: loan } = await axios.get(`http://localhost:8080/loan/1`);
  console.log(loan);
  return {
    props: {},
  };
};
