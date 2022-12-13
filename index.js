const express = require("express")
const config = require("./src/lib/config");;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "arriba"});
})

app.listen(config.app.port, async () => {
    console.log('escuchando');
})