const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const buyerUserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  accountType: { type: String, required: true, default: "Buyer"},
  bookmarks: { type: Array, required: true, default: [] },
  cart: { type: Array, required: true, default: []}
});

buyerUserSchema.plugin(uniqueValidator); // get Mongoose validation error in JSON rather than MongDO E11000 error code

module.exports = mongoose.model("Buyer", buyerUserSchema);
