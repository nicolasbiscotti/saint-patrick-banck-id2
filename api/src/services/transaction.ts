import { CardObject } from "./card";

export interface TransactionSpec {
  origin: CardObject;
  receiver: CardObject;
  amount: number;
  type: "credit" | "debit";
  transactionCode: string;
}
export interface TransactionObject extends TransactionSpec {
  getDate: () => string;
}

export const transaction = function ({
  origin,
  receiver,
  amount,
  type,
  transactionCode,
}: TransactionSpec) {
  const date = Date();

  const getDate = () => date;

  const that: TransactionObject = {
    origin,
    receiver,
    amount,
    type,
    transactionCode,
    getDate,
  };

  return that;
};
