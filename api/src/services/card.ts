import { TransactionObject } from "./transaction";
import { UserObject } from "./user";

export interface CardSpec {
  cardNumber: string;
  pin: number;
  initialBalance: number;
  cardHolder: UserObject;
}

export interface CardObject extends CardSpec {
  getTransactions: () => TransactionObject[];
  addTransaction: (transaction: TransactionObject) => number;
  getBalance: () => number;
}

export const card = function ({
  cardNumber,
  pin,
  initialBalance = 0,
  cardHolder,
}: CardSpec) {
  const transactions: TransactionObject[] = [];

  const getTransactions = () => transactions;
  const addTransaction = (transaction: TransactionObject) =>
    transactions.push(transaction);

  const getBalance = () => {
    let result = initialBalance;
    const reducer = (result: number, transaction: TransactionObject) => {
      if (transaction.type === "credit") {
        return result + transaction.amount;
      } else {
        return result - transaction.amount;
      }
    };
    return transactions.reduce(reducer, result);
  };

  const that: CardObject = {
    cardNumber,
    pin,
    initialBalance,
    cardHolder,
    getTransactions,
    addTransaction,
    getBalance,
  };

  cardHolder.addCard(that);

  return that;
};
