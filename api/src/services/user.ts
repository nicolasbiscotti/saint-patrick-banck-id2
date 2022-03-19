import { CardObject } from "./card";
import { Receiver } from "./receiver";
import { v4 as uuidv4 } from "uuid";

export interface UserSpec {
  name: string;
}

export interface UserObject extends UserSpec {
  id: string;
  setName: (name: string) => string;
  getCards: () => CardObject[];
  getCard: (cardNumber: string) => CardObject | undefined;
  addCard: (card: CardObject) => number;
  removeCard: (cardNumber: string) => boolean;
  getRecentReceivers: () => Receiver[];
  addRecentReceiver: (receiver: Receiver) => number;
}

export const user = function ({ name }: UserSpec) {
  const id = uuidv4();
  let cards: CardObject[] = [];
  let recentsReceivers: Receiver[] = [];

  const setName = (newName: string) => (name = newName);
  const getCards = () => cards;
  const getCard = (cardNumber: string) => {
    return getCards().find((card) => card.cardNumber === cardNumber);
  };
  const addCard = (newCard: CardObject) => cards.push(newCard);

  const removeCard = (cardNumber: string) => {
    let cardWasRemoved = false;
    const reducer = (result: CardObject[], card: CardObject) => {
      if (card.cardNumber !== cardNumber) {
        result.push(card);
        return result;
      } else {
        cardWasRemoved = true;
        return result;
      }
    };
    cards = cards.reduce(reducer, []);
    return cardWasRemoved;
  };

  const getRecentReceivers = () => recentsReceivers;
  const addRecentReceiver = (newReceived: Receiver) =>
    recentsReceivers.push(newReceived);

  const that: UserObject = {
    id,
    name,
    setName,
    getCards,
    getCard,
    addCard,
    removeCard,
    getRecentReceivers,
    addRecentReceiver,
  };

  return that;
};
