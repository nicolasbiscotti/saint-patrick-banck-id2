import { CardObject } from "./card";

export interface TransactionSpec {
  origin: CardObject;
  receiver: CardObject;
  amount: number;
  type: "credit" | "debit";
}
export interface TransactionObject extends TransactionSpec {
  getDate: () => string;
  getTransactionCode: () => string;
}

export const transaction = function ({
  origin,
  receiver,
  amount,
  type,
}: TransactionSpec) {
  const date = Date();
  const transactionCode = Math.floor(Math.random() * 10000).toString();

  const getDate = () => date;
  const getTransactionCode = () => transactionCode;

  const that: TransactionObject = {
    origin,
    receiver,
    amount,
    type,
    getDate,
    getTransactionCode,
  };

  return that;
};
