import { Dayjs } from "dayjs";

export interface loanInterface {
  id: number;
  amount: number;
  paymentDate: string;
  interest: number;
  amountOfPayments: number;
  createAt: string;
}

export interface loanIPostnterface {
  amount: number;
  paymentDate: string;
  interest: number;
  amountOfPayments: number;

  clientId: number;
}
