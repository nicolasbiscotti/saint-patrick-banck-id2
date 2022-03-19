import { expect } from "chai";
import assert from "assert";

import {
  assignCard,
  createUser,
  reset,
  userList,
} from "../../src/services/main";
import { UserObject } from "../../src/services/user";

describe("User", () => {
  beforeEach(() => reset());

  it("should pass", () => {
    assert(true, "reason");
  });

  it("shoul return an empty users list", () => {
    // arrange
    const expected: UserObject[] = [];

    // act
    const actual = userList();

    // assert
    expect(actual).to.have.length(expected.length);
  });

  it("shoul return an user calls Nicolás Biscotti with no cards", () => {
    // arrange
    const name = "Nicolás Biscotti";
    const expected = name;

    // act
    const actual = createUser({ name });

    // assert
    expect(actual.name).to.equal(expected);
    expect(userList()).to.have.length(1);
    expect(actual.getCards()).to.have.length(0);
  });

  it("Nicolás Biscotti shoud have a card ", () => {
    // arrange
    const name = "Nicolás Biscotti";
    const expected = {
      cardNumber: "4546-8574-1856-5565",
      pin: "4345",
      initialBalance: 40555,
    };

    // act
    const nicolas = createUser({ name });
    assignCard({
      ...expected,
      cardHolder: nicolas,
    });
    const actual = nicolas;

    // assert
    expect(actual.getCards()[0].cardNumber).to.equal(expected.cardNumber);
    expect(actual.getCards()).to.have.length(1);
  });
});
