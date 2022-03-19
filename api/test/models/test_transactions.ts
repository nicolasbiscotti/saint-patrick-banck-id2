import { expect } from "chai";
import {
  findUserByName,
  loadFakeData,
  makeNewTransaction,
  reset,
} from "../../src/services/main";

describe("Transactions", () => {
  beforeEach(() => {
    reset();
    loadFakeData();
  });

  it("should return false and empty the transactions of the cards involved", () => {
    // arrange
    const result = false;
    const transactionsLength = 0;

    // act
    // i am goin to try curry out a new transaction from a card does not have enough balance to make it.
    const nicolas = findUserByName("Nicolás Biscotti");
    const fer = findUserByName("Fernanda Fauret");
    const poorCard = nicolas?.getCard("5854-6656-2587-1547");
    const ferCard = fer?.getCard("5595-3458-9989-7125");
    let actResult: boolean;
    if (!poorCard) {
      actResult = true;
    } else {
      actResult = makeNewTransaction({
        origin: poorCard,
        receiverNumber: "5595-3458-9989-7125",
        amount: 2000,
      });
    }

    // assert
    expect(actResult).to.eql(result);
    expect(poorCard?.getTransactions()).to.have.length(transactionsLength);
    expect(ferCard?.getTransactions()).to.have.length(transactionsLength);
  });

  it("should return true and one transaction for each cards involved", () => {
    const nicolas = findUserByName("Nicolás Biscotti");
    const fer = findUserByName("Fernanda Fauret");
    const nicolasCard = nicolas?.getCard("4546-8574-1856-5565");
    const ferCard = fer?.getCard("5595-3458-9989-7125");
    const amount = 2000;

    // arrange
    const result = true;
    const transactionsLength = 1;
    const nicolasBalance = nicolasCard?.getBalance()
      ? nicolasCard?.getBalance() - amount
      : 0;
    const ferBalance = ferCard?.getBalance()
      ? ferCard?.getBalance() + amount
      : 0;

    // act
    let actResult: boolean;
    if (!nicolasCard) {
      actResult = true;
    } else {
      actResult = makeNewTransaction({
        origin: nicolasCard,
        receiverNumber: "5595-3458-9989-7125",
        amount,
      });
    }

    // assert
    expect(actResult).to.eql(result);
    expect(nicolasCard?.getTransactions()).to.have.length(transactionsLength);
    expect(ferCard?.getTransactions()).to.have.length(transactionsLength);
    expect(nicolasCard?.getBalance()).to.equal(nicolasBalance);
    expect(ferCard?.getBalance()).to.equal(ferBalance);
    expect(ferCard?.getTransactions()[0].transactionCode).to.equal(
      nicolasCard?.getTransactions()[0].transactionCode
    );
  });
});
