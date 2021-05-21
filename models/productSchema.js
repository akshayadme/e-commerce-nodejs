const mongoose = require("mongoose");
const Review = require("./reviewSchema");

const productSchema = mongoose.Schema({
  name: {
    type: String,
  },
  img: {
    type: String,
  },
  price: {
    type: Number,
  },
  subheading: {
    type: String,
  },
  desc: {
    type: String,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const product = mongoose.model("Prouct", productSchema);

module.exports = product;
