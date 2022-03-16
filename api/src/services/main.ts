import { card, CardObject, CardSpec } from "./card";
import { transaction } from "./transaction";
import { user, UserObject, UserSpec } from "./user";

export const users: UserObject[] = [];
export const cards: CardObject[] = [];

export const makeNewTransaction = (
  origin: CardObject,
  receiverNumber: string,
  amount: number
): boolean => {
  const receiver = cards.find((card) => card.cardNumber === receiverNumber);
  if (!receiver) {
    return false;
  } else {
    if (origin.getBalance() >= amount) {
      origin.addTransaction(
        transaction({ origin, receiver, amount, type: "debit" })
      );
      receiver.addTransaction(
        transaction({ origin, receiver, amount, type: "credit" })
      );
      return true;
    }
    return false;
  }
};

export const createUser = ({name}: UserSpec) => {
  const newUser = user({name});
  users.push(newUser);
  return newUser;
};

export const assignCard = ({
  cardNumber,
  pin,
  initialBalance,
  cardHolder,
}: CardSpec) => {
  let newCard = null;
  const holder = users.find((user) => user.name === cardHolder.name);
  if (!holder) {
    return newCard;
  } else {
    newCard = card({ cardNumber, pin, initialBalance, cardHolder });
    cards.push(newCard);
    return newCard;
  }
};
