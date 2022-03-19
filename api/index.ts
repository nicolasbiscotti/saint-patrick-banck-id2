import express from "express";
import { cards, loadFakeData, login } from "./src/services/main";

export const server = express();

server.use(express.json());

server.post("/login", (req, res) => {
  const { cardNumber, pin } = req.body;
  const user = login(cardNumber, pin);
  if (!user) {
    res.json({ message: "Oh Oh, you have not an account yeat!!" });
  } else {
    res.json({ message: `Welcome ${user.name}` });
  }
});

server.get("/cards", (req, res) => {
  const response = {
    lenth: cards.length,
    cards,
  };
  res.json(response);
});

server.listen(3000, () => {
  loadFakeData();
  console.log("Server ready at http://localhost:3000");
});
