const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const sellerUserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  accountType: { type: String, required: true, default: "Seller" },
  items: { type: Array, required: true, default: [] },
});

sellerUserSchema.plugin(uniqueValidator)

module.exports = mongoose.model("Seller", sellerUserSchema);
