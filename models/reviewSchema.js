const mongoose = require("mongoose");
const reviewSchema = mongoose.Schema({
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  title: {
    type: String,
  },
  comment: {
    type: String,
  },
  user: {
    type: String,
    required: true,
  },
  dateCommented: {
    type: String,
    default: new Date().toDateString(),
  },
});

const reviews = mongoose.model("Review", reviewSchema);

module.exports = reviews;
