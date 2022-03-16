export interface Receiver {
  alias: string;
  cardNumber: string;
}

export const receiver = function ({ alias, cardNumber }: Receiver) {
  const that: Receiver = {
    alias,
    cardNumber,
  };

  return that;
};
