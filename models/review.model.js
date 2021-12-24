const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  email: { type: String, required: true },
  productname: { type: String, required: false },
  description: { type: String, required: false },
  rating: { type: Number, required: true },
  marked: {type: String, default: 'false'},
}, {
  timestamps: true,
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;