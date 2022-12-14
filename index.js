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

        //const findUser = await userUsecases.findByEmail('yy')
        //onst findUserId = findUser._id
        //password = "kkkkkkk"
        //console.log('hashed', password)

        const tokenUser = await userUsecases.authenticate({email:"yy", password:"asdf"})
        console.log('encontrado', tokenUser)
      } catch (err) {
        console.error("Connection refused:", err);
      }
})

