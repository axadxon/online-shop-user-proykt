const { Schema, model } = require("mongoose");

const ComputerSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  stock: {
    type: String,
    required: true,
  },
  img: {
    type: String
  },
});

module.exports = model("computer", ComputerSchema);
