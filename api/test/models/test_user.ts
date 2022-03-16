import { expect } from "chai";
import assert from "assert";
import { CardObject } from "../../src/services/card";
import {
  assignCard,
  createUser,
  listCards,
  listUsers,
  reset,
} from "../../src/services/main";
import { UserObject } from "../../src/services/user";

beforeEach(() => reset());

describe("user", () => {
  it("should pass", () => {
    assert(true, "reason");
  });

  it("shoul return an empty users list", () => {
    // arrange
    const expected: UserObject[] = [];

    // act
    createUser({ name: "Nicolas" });
    const actual = listUsers();

    // assert
    expect(actual).to.have.length(1);
    expect(actual[0].getCards()).to.have.length(0);
  });

  it("shoul return an user calls Nicolás Biscotti", () => {
    // arrange
    const name = "Nicolás Biscotti";
    const expected = name;

    // act
    const actual = createUser({ name });

    // assert
    expect(actual.name).to.equal(expected);
  });

  it("shoul return card number ", () => {
    // arrange
    const name = "Nicolás Biscotti";
    const expected = {
      cardNumber: "4546-8574-1856-5565",
      pin: 4345,
      initialBalance: 40555,
    };

    // act
    const nicolas = createUser({ name });
    assignCard({
      cardNumber: "4546-8574-1856-5565",
      pin: 4345,
      initialBalance: 40555,
      cardHolder: nicolas,
    });
    const actual = nicolas.getCards()[0].cardNumber;

    // assert
    expect(actual).to.equal(expected.cardNumber);
  });
});
