const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  user: { type: mongoose.ObjectId },
});

const postsModel = mongoose.model("Post", schema);

module.exports = { schema, postsModel };
