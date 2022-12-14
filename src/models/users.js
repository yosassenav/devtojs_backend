const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, unique: true, trim: true },
});

const model = mongoose.model("User", schema);

module.exports = { schema, model };
