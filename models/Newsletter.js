const mongoose = require('mongoose'),
  Category = require('./Category.js'),
  Review = require('./Review.js'),
  User = require('./User.js'),
  Double = require('@mongoosejs/double');

const newsletterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  imageUrl: { type: String, required: true },
  rating: { type: Double, default: 0 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Newsletter', newsletterSchema);
