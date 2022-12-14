const { sign, verify } = require("jsonwebtoken");
const {app } = require("./config");

const createToken = (payload) => sign(payload, app.secret);

const verifyToken = (token) => verifyToken(token, app.secret);

module.exports = { createToken, verifyToken};