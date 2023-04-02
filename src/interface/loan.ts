import { Dayjs } from "dayjs";

export interface loanInterface {
  id: number;
  amount: number;
  createAt: string;
}

export interface loanIPostnterface {
  amount: number;
  paymentDate: string;
  clientId: number;
}
