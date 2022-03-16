import { CardObject } from "./card";
import { Receiver } from "./receiver";

export interface UserSpec {
  name: string;
}

export interface UserObject extends UserSpec {
  setName: (name: string) => string;
  getCards: () => CardObject[];
  getRecentReceivers: () => Receiver[];
  addRecentReceiver: (receiver: Receiver) => number;
  addCard: (card: CardObject) => number;
  removeCard: (cardNumber: string) => boolean;
}

export const user = function ({name}: UserSpec) {
  let cards: CardObject[] = [];
  let recentsReceivers: Receiver[] = [];

  const setName = (newName: string) => (name = newName);
  const getCards = () => cards;
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
    name,
    setName,
    getCards,
    getRecentReceivers,
    addRecentReceiver,
    addCard,
    removeCard,
  };

  return that;
};
