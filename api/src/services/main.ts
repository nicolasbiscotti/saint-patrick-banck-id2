import { card, CardObject, CardSpec } from "./card";
import { transaction } from "./transaction";
import { user, UserObject, UserSpec } from "./user";
import { v4 as uuidv4 } from "uuid";
import fakeUsers from "../mockups/users.json";
import fakeCards from "../mockups/cards.json";

interface newTransactionSpec {
  origin: CardObject;
  receiverNumber: string;
  amount: number;
}

export let users: UserObject[] = [];
export let cards: CardObject[] = [];

export const reset = () => {
  users = [];
  cards = [];
};
export const userList = () => users;
export const cardsList = () => cards;

export const findCardByNumber = (cardNumber: string) => {
  return cards.find((card) => card.cardNumber === cardNumber);
};
export const findUserByName = (userName: string) => {
  return users.find((user) => user.name === userName);
};
const findCardByNumberAndPin = (cardNumber: string, pin: string) => {
  return cards.find(
    (card) => card.cardNumber === cardNumber && card.pin === pin
  );
};
export const login = (cardNumber: string, pin: string) => {
  const validCard = findCardByNumberAndPin(cardNumber, pin);
  if (!validCard) {
    return undefined;
  } else {
    return validCard.cardHolder;
  }
};

export const makeNewTransaction = ({
  origin,
  receiverNumber,
  amount,
}: newTransactionSpec): boolean => {
  const receiver = findCardByNumber(receiverNumber);
  if (!receiver) {
    return false;
  } else {
    if (origin.getBalance() >= amount) {
      const transactionCode = uuidv4();
      origin.addTransaction(
        transaction({
          origin,
          receiver,
          amount,
          type: "debit",
          transactionCode,
        })
      );
      receiver.addTransaction(
        transaction({
          origin,
          receiver,
          amount,
          type: "credit",
          transactionCode,
        })
      );
      return true;
    }
    return false;
  }
};

export const createUser = ({ name }: UserSpec) => {
  const newUser = user({ name });
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
  const holder = findUserByName(cardHolder.name);
  if (!holder) {
    return newCard;
  } else {
    newCard = card({ cardNumber, pin, initialBalance, cardHolder });
    cards.push(newCard);
    return newCard;
  }
};

export const loadFakeData = () => {
  fakeUsers.forEach((user) => createUser(user));

  for (let index = 0; index < fakeCards.length; index++) {
    const card = fakeCards[index];
    assignCard({ ...card, cardHolder: users[index % users.length] });
  }
};
