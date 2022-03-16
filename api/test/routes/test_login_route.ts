import { server } from "../..";
import chai from "chai";
import chaiHttp = require("chai-http");
import { loadFakeData } from "../../src/services/main";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Login API Request", () => {
  it("should response that no account match", () => {
    // arrange
    const expected = { message: "Oh Oh, you have not an account yeat!!" };

    // act
    return chai
      .request(server.listen(() => loadFakeData()))
      .post("/login")
      .send({
        cardNumber: "5595-3458-9989-7125",
        pin: 1598,
      })
      .then((res) => {
        console.log(res.body);
        expect(res.body).to.eql(expected);
      });
  });
});
