import express from "express";
import { loadFakeData, users } from "./src/services/main";

export const server = express();

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
  loadFakeData();
  console.log("Server ready at http://localhost:3000");
});
