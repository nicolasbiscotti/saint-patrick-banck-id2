import express from "express";
import {
  assignCard,
  createUser,
  makeNewTransaction,
  users,
} from "./src/services/main";

const server = express();

server.use(express.json());

server.post("/login", (req, res) => {
  const { cardNumber, pin } = req.body;
  const user = users.find((user) =>
    user
      .getCards()
      .find((card) => card.cardNumber === cardNumber && card.pin === pin)
  );
  if (!user) {
    res.json({ message: "Oh Oh, you have not an account yeat!!" });
  } else {
    res.json({ message: `Welcome ${user.name}` });
  }
});

server.listen(3000, () => {
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
  console.log("Server ready at http://localhost:3000");
});
