const express = require("express")
const config = require("./src/lib/config");;
const db = require("./src/lib/db")
const { hashPassword, verifyPassword } = require("./src/lib/encrypt")

const userUsecases= require("./src/usecases/user")

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "arriba"});
})

app.listen(config.app.port, async () => {
    console.log('escuchando');
    try {
        await db.connect();
        console.log("DB is connected 🤠");
      } catch (err) {
        console.error("Connection refused:", err);
      }
})

