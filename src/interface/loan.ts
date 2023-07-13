export enum Frecquency {
  MONTHLY,
  BIWEEKLY,
}

export interface loanInterface {
  id: number;
  amount: number;
  paymentDate: string;
  secondPaymentDate: string;
  interest: number;
  frequency: Frecquency;
  isPaid: boolean;
  amountOfPayments: number;
  client: string;
  CreateAt: String;
  UpdateAt: String;
}

export interface loanIPostnterface {
  amount: number;
  paymentDate: string;
  interest: number;
  amountOfPayments: number;
  secondPaymentDate: string;
  frequency: Frecquency;
  clientId: number;
}
