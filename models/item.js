const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true},
  image: { type: String, required: true},
  price: { type: Number, required: true, default: 0.00 },
  rating: { type: Number, required: true, default: 0}
});

itemSchema.plugin(uniqueValidator); // get Mongoose validation error in JSON rather than MongDO E11000 error code

module.exports = mongoose.model("Item", itemSchema);
