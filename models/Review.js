const mongoose = require('mongoose'),
  Newsletter = require('./Newsletter.js'),
  User = require('./User.js'),
  Double = require('@mongoosejs/double');

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  rating: { type: Double, required: true },
  review: { type: String, required: true },
  newsletterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Newsletter' },
});

module.exports = mongoose.model('Review', reviewSchema);
