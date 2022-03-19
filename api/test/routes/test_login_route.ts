import chai from "chai";
import chaiHttp = require("chai-http");
import { server } from "../..";
import { loadFakeData, reset } from "../../src/services/main";

describe("Login API Request", () => {
  chai.use(chaiHttp);
  const expect = chai.expect;

  beforeEach(() => {
    reset();
    loadFakeData();
  });

  it("should response that no account match when the ping is wrong", async () => {
    // arrange
    const expected = { message: "Oh Oh, you have not an account yeat!!" };

    // act
    return chai
      .request(server)
      .post("/login")
      .send({
        cardNumber: "5595-3458-9989-7125",
        pin: 1598,
      })
      .then((res) => {
        expect(res.body).to.eql(expected);
      });
  });

  it("should response that no account match when the cardNumber is wrong", async () => {
    // arrange
    const expected = { message: "Oh Oh, you have not an account yeat!!" };

    // act
    return chai
      .request(server)
      .post("/login")
      .send({
        cardNumber: "5595-3458-9989-7124",
        pin: 1595,
      })
      .then((res) => {
        expect(res.body).to.eql(expected);
      });
  });

  it("should response Welcome Fernanda Fauret when the cardNumber and ping are valids", async () => {
    // arrange
    const expected = { message: "Welcome Fernanda Fauret" };

    // act
    return chai
      .request(server)
      .post("/login")
      .send({
        cardNumber: "5595-3458-9989-7125",
        pin: "1595",
      })
      .then((res) => {
        expect(res.body).to.eql(expected);
      });
  });
});
