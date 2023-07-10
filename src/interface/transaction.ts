export enum TransactionType {
  pay,
  renewal,
}

export interface transactionInterface {
  id: number;
  amount: number;
  transactionType: TransactionType;
  CreateAt: string;
  loanId: String;
}
export interface transactionInterfacePost {
  amount: number;
  transactionType: TransactionType;
  loanId: String;
}
