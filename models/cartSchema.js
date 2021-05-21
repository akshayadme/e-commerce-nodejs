const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  qty: {
    type: Number,
    default: 1,
  },
  user: {
    type: String,
  },
  details: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Prouct",
  },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
