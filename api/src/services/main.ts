import { card, CardObject, CardSpec } from "./card";
import { transaction } from "./transaction";
import { user, UserObject, UserSpec } from "./user";

export let users: UserObject[] = [];
export let cards: CardObject[] = [];

export const reset = () => {
  users = [];
  cards = [];
}
export const listUsers = () => users;
export const listCards = () => cards;

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

export const loadFakeData = () => {
  const nicolas = createUser({name: "Nicolás Biscotti"});
  const fer = createUser({name: "Fer Fauret"});
  const cardOne = assignCard({
    cardNumber: "4546-8574-1856-5565",
    pin: 4345,
    initialBalance: 40555,
    cardHolder: nicolas,
  });
  const cardTwo = assignCard({
    cardNumber: "5595-3458-9989-7125",
    pin: 1595,
    initialBalance: 3566,
    cardHolder: fer,
  });
  const cardThree = assignCard({
    cardNumber: "4858-6696-5887-1578",
    pin: 1234,
    initialBalance: 23,
    cardHolder: nicolas,
  });
  if (cardOne) {
    makeNewTransaction(cardOne, "5595-3458-9989-7125", 3000);
  }
}
