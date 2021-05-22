const mongoose = require('mongoose'),
  Newsletter = require('./Newsletter.js'),
  User = require('./User.js');

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
  newsletterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Newsletter' },
});

module.exports = mongoose.model('Reveiw', reviewSchema);
