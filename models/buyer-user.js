const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const buyerUserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  accountType: { type: String, required: true, default: "Buyer"},
  bookmarks: { type: Array, required: true, default: [] },
  cart: { type: Array, required: true, default: []}
});

module.exports = mongoose.model("Buyer", buyerUserSchema);
